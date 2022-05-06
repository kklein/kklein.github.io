---
layout: post
title:  "Sklearn Pipelines"
description: I tried to illustrate the usage of scikit-learn pipelines.
date:   2019-01-08 13:38:07 +0200
comments: false
tags: [tech]
---
> Pipeline of transforms with a final estimator.

## Why
Whether you're using sklearn transformations already or implementing data wrangling from scratch, there are interesting aspects to squeezing those into an sklearn
[pipeline](https://scikit-learn.org/stable/modules/generated/sklearn.pipeline.Pipeline.html).
Most notably, this will:
- Allow for the usage of sklearn's [cross validation](https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.cross_val_score.html).
- Allow for the usage of sklearn's [grid search](https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.GridSearchCV.html).
- Lower the barrier to include sklearn transformations, such as [TfidfVectorizer](https://scikit-learn.org/stable/modules/generated/sklearn.feature_extraction.text.TfidfVectorizer.html), in the future.

It would be possible to do all such processing without a pipeline object: once
on the whole dataset. Yet, this is only legitimate for data-independent [0]
transformations. For data-dependent transformations, such as imputation by mean,
you would cause data leakage [1]. In order to avoid that, we can express how
training and validation set should be processed individually, per cross
validation split.

This distinction is manifested through `fit` and `transform` methods in sklearn. For data-dependent operations, `fit` is supposed to capture said
dependence. `fit` is therefore only applied to training data while `transform` is applied to both training and validation data. Moreover it follows that `fit` for data-dependent operations is stateful.

## Pipeline building blocks

A pipeline of n steps constitutes of n-1 transforms and a final estimator.

# Transform steps

In order to define a transform step, `fit` and `transform` have to be implemented. Conventionally, this is
achieved by inherting from sklearn's [TransformerMixin](https://scikit-learn.org/stable/modules/generated/sklearn.base.TransformerMixin.html).

Given that the pipeline is fed a pandas dataframe, the following are examples
of sequential transform step classes:

1. Data-indepdent imputation.
```python
class DateImputer(TransformerMixin):

    def transform(self, df):
        # Observations don't always exist. Hence impute by lower/upper bound.
        df = df.fillna({'date_first_observation': df['date_creation'],
                        'date_last_observation': df['date_deletion']})
        return df

    def fit(self, df, labels=None):
        return self
```

2. Data-independent creation of feature.
```python
class RelativeWeightCreator(TransformerMixin):

    def transform(self, df):
        for column_name in ['weight_a', 'weight_b', 'weight_c']:
            df.loc[:, "rel" + column_name] = df[column_name] / df['total_weight']
        return df

    def fit(self, df, labels=None):
        return self
```

3. Data-dependent creation of feature.
```python
class AggregateCreator(TransformerMixin):

    def __init__(self):
        self.asset_mean_dict = {}

    def fit(self, df, labels=None):
        outcome = 'profit'
        mask = df[outcome] > 0
        df = df.loc[mask, :]
        asset_aggregates = df.groupby('asset_type')[outcome]
        self.asset_mean_dict = asset_aggregates.mean().to_dict()
        return self

    def transform(self, df):
        asset_types = df['asset_types']
        asset_means = asset_types.map(self.asset_mean_dict)

        # For validation data, some asset_type values might not have been
        # encountered in training data.
        asset_means = asset_means.fillna(-1)

        df.loc[:, 'asset_mean'] = asset_means
        return df
```

4. Data-independent dropping of columns.
```python
class ColumnDropper(TransformerMixin):

    def __init__(self, column_names):
        self.column_names = column_names

    def transform(self, df):
        df = df.drop(self.column_names, axis=1)
        return df

    def fit(self, df, labels=None):
        return self
```

Many more use cases exist.

# Meta information step
Steps in a pipeline don't _have_ to _actually_ process or estimate. See an example of a pipeline step which prints some stats about the data before it's being handed to the regressor. In addition, it stores column name information, which would not be obtainable by default. This is arguably hacky.
```python
class MetaInformer(TransformerMixin):

    def __init__(self):
        self.column_names = []

    def transform(self, df):
        print('#columns: %d' % df.shape[1])
        column_nullity = df.isnull().any()
        if column_nullity.any():
            print('Contain nulls:')
            print(column_nullity[lambda x: x].keys())
        column_redundancy = df.apply(lambda c: c.min() == c.max(), axis=0)
        if column_redundancy.any():
            print('Has redundant columns:')
            print(column_redundancy[lambda x: x].keys())
        return df

    def fit(self, df, labels=None):
        self.column_names = df.columns
        return self

    def get_column_names(self):
        return self.column_names
```

# Estimation step
We can simply use an out-of-the-box estimator from sklearn, such as [RandomForestRegressor](https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestRegressor.html).
If you intend to either eliminate rows (requiring access to the target dataframe) or want to still operate on predictions, it is possible to wrap a conventional estimator inside of a custom one. The latter case might, for instance, be relevant if you have a strong belief on how a target variable is constructed off of intermediate target variables.

Assuming you happen to know that profit/square meters is 'easier' to infer than profits, you could manually build an interaction term multiplying the inferred profits per surface area by surface area.
If you want this type of post-inference-processing to work with
GridSearchCV, you need to implement the `set_params` method.

Applying a logarithm to the predictions is not inherent to the approach of building the interaction term. It is an independent design choice that can be conveniently placed at this stage of the pipeline.

```python
class InteractionRegressor(BaseEstimator):

    def __init__(self, use_lb, use_log_on_savings):
        self.regressor = RandomForestRegressor()
        self.intermediate_target_column = 'profit_per_sqm'
        self.max_depth = None
        self.n_estimators = None

    def fit(self, df_wo_pseudo_target, df_pseudo_target):
        df = df_wo_pseudo_target
        # Split target from samples.
        intermediate_target = df[self.intermediate_target_column]
        df_wo_intermediate_target = df.drop(self.intermediate_target_column,
                                            axis=1)

        intermediate_target_log = np.log(intermediate_target)
        self.regressor.fit(df_wo_intermediate_target, intermediate_target_log)

    def predict(self, df):
        df_wo_intermediate_target = df.drop(self.intermediate_target_column,
                                            axis=1)
        surface_areas = df['surface_area']
        intermediate_target_log = self.regressor.predict(
          df_wo_intermediate_target)
        # log of product is sum of logs.
        return intermediate_target_log + np.log(surface_areas)

    def get_rf_params(self):
        return {'max_depth': self.max_depth,
                'n_estimators': self.n_estimators}

    def set_params(self, **params):
        super().set_params(**params)
        self.regressor.set_params(**self.get_rf_params())

```

## Instantiating a pipeline
```python
# from sklearn.ensemble import RandomForestRegressor
# from sklearn.pipeline import Pipeline
weight_columns = ['weight_a', 'weight_b', 'weight_c']
redundant_columns = ['useless', 'noise', 'garbage']
target_columns = ['revenue', 'profit']

pipeline = Pipeline([
  ('date_imputer', DateImputer()),
  ('relative_weight_creator', RelativeWeightCreator()),
  ('aggregate_creator', AggregateCreator()),
  ('weight_column_dropper', ColumnDropper(weight_columns)),
  ('redundant_column_dropper', ColumnDropper(redundant_columns)),
  ('target_column_dropper', ColumnDropper(target_columns)),
  ('meta_informer', MetaInformer())
  ('rf_regressor', RandomForestRegressor())
])
```
## Using a pipeline

# Process, obtain meta information and predict
Note that in order for the feature importance information to be meaningful, we first need to retrieve the column names, stored in the `'meta_informer'` step of the pipeline.

```python
pipeline.fit(df_wo_target, df_target)
column_names = pipeline.named_steps['meta_informer'].get_column_names()
feature_importances = pipeline.named_steps['rf_regressor'].feature_importances_
name_importance_tuples = sorted(
  [(column_names[i], x) for i, x in enumerate(feature_importances) if x > 0],
  key=lambda p: p[1],
  reverse=True)
print(name_importance_tuples)
predictions = pipeline.predict(df_target)
```

# Cross validation
```python
# from sklearn.model_selection import cross_val_score
cv_scores = cross_val_score(pipeline, df_data, df_target, cv=10,
                            scoring='neg_mean_squared_error')
avg_rmse = np.mean(np.sqrt(-cv_scores))
print(avg_rmse)
```

# Grid search
In order to associate a hyperparameter to a certain step, you need to prefix the hyperparameter attribute by the name of the pipeline
step. The postfix of the hyperparameter attribute is the parameter
said step of the pipeline expects, as used in `set_params`. Both parts are
joined via a double underscore.
```python
# from sklearn.model_selection import GridSearchCV
hyperparameters = [{'rf_regressor__max_depth': [5, 10, 15, 25],
                    'rf_regressor__n_estimators': [100, 200, 300]}]
grid_search = GridSearchCV(pipeline, hyperparameters)
grid_search.fit(df_data, df_target)
print(np.sqrt(-grid_search.best_score_))
print(grid_search.best_params_)
```

[0] Data-dependent: If `f` is applied to sample `xi` out of all n samples, the outcome is independent of all other n-1 samples.

[1] [https://machinelearningmastery.com/data-leakage-machine-learning/](https://machinelearningmastery.com/data-leakage-machine-learning/)
