---
title: "Inference"
date: 2022-06-05 7:38:07 +0200
comments: false
published: true
description: No, the other inference!
tags: [math, tech]
katex: True
---

I had long felt a slight discomfort with the word 'inference'. Many people seemed to use it with confidence and the expectation that it would refer to a precise notion. And while it is not uncommon for a word to have different meaning in different contexts, it took me a while to figure out what the different meaning and what the different contexts are in the example of 'inference'. [Some other people seem to be a little confused as well](https://stackoverflow.com/questions/55852777/is-training-inference-terminology-in-deep-learning-any-different-than-train-te).


# Inference in statistics

Inference being a common term in statistics[^0], I looked for definitions of the term in the statistics context.

In 'All of Statistics', Larry Wassermann writes the following:

> Statistical inference, or "learning" as it is called in computer science, is the process of using data to infer the distribution that generated the data. The basic statistical inference problem is this:
> We observe \\(X_1, \dots, X_n \sim  F\\). We want to infer (or estimate or learn) \\(F\\) or some feature of \\(F\\) such as its mean.

In a similar vein, the authors of 'Introduction to Statistical Learning with R' elaborate further:

> [...] we wish to estimate f, but our goal is not necessarily to make predictions for \\(Y\\). We instead want to understand the relationship between \\(X\\) and \\(Y\\), or more specifically, to understand how \\(Y\\) changes as a function of \\(X_1, \dots, X_n\\).

In a more applied setting, the [statsmodels documentation](https://www.statsmodels.org/stable/emplike.html?highlight=inference) also uses the term inference in relation to estimating the parameters of a distribution.

# Inference in machine/deep learning

In the at least adjacent, possibly overlapping field of machine learning, there seems to exist a different interpretations of the word.x

Kevin Murphy writes in his recent "Probabilistic Machine Learning: An Introduction":

>  In the deep learning community, the term “inference” refers to what we will call “prediction”, namely computing \\(p(y|x, \theta)\\).

In their [paper](https://arxiv.org/pdf/1907.01989.pdf) on on-device inference, Lee et al. from Google implicitly contrast training and inference:

>  Our work is complementary to these efforts and instead focuses on optimizing the inference engine that runs the neural network rather than the model or training

In a similarly applied setting, [Microsoft's Azure documentation on ONNX](https://docs.microsoft.com/en-us/azure/machine-learning/concept-onnx) states the following:

> Learn how using the Open Neural Network Exchange (ONNX) can help optimize the inference of your machine learning model. Inference, or model scoring, is the phase where the deployed model is used for prediction, most commonly on production data.

This seems quite different from the above statistics interpretations. Granted, this is not to say that all members of the community agree with this meaning - merely that some do.

# Summary

Taking a step back we might look for a more general definition of the term inference. The [Oxford Learner's Dictionary](https://www.oxfordlearnersdictionaries.com/definition/english/inference#:~:text=%2F%CB%88%C9%AAnf%C9%99r%C9%99ns%2F,you%20already%20know%20synonym%20deduction) defines inference as follows:

> something that you can find out indirectly from what you already know

This general definition aligns with both kinds of meanings encountered in the excerpts before. What differs is what one finds outs - new data points or functions/parameters - and what one already knows - observed data or functions/parameters.

The references above paint a more general and all-encompassing picture. Yet, in an attempt to clearly contrast the terminologies, one might assume a supervised learning setup. In this setup, there is observed input data \\(X_{train}\\) with labels \\(y_{train}\\). This data is used to fit parameters \\(\hat{\theta}\\) or more generally a function \\(\hat{f}\\). The latter can then be used to predict labels of other data, \\(X_test\\). Given the interpretations above, the following is _a_ possible landscape of terminologies:

|                       | \\((X_{train}, y_{train})\\) | \\(\rightarrow\\)       | \\(\hat{\theta}\\) or \\(\\hat{f}\\) | \\(\rightarrow\\)       | \\((X_{test},\hat{y}_{test})\\) |
|-----------------------|---------|-------------------------|--------------------------------------|-------------------------|---------------|
| Statistics            |         | Inference or estimation |                                      | Prediction              |               |
| Machine/Deep learning |         | Training                |                                      | Inference or prediction |               |

In conclusion, there are at least _some_ people working on clearly related topics using at best inconsistent, at worst contradicting terminology. In order to facilitate knowledge transfer between fields, communities and teams it might be worth considering to use less ambiguous terminology or to  least qualify the term inference, e.g. by saying 'parameter inference' - unless the meaning is rendered crystal clear by its context, even to the uninitiated reader. Communication remains hard, but a battle worth fighting. :)

# What's more
Bayesian inference typically refers to using observations, \\(x_i\\), in order to update a prior belief[^1], \\(p(\theta_{i-1})\\) to a posterior \\(p(\theta_i | x_i) \\). DeepAi provides an [example](https://deepai.org/machine-learning-glossary-and-terms/bayesian-inference).

Variational inference techniques attempt to find approximate solutions to numerically challenging, conventional inference problems. Stefano Ermon's class provides a [short overview](https://ermongroup.github.io/cs228-notes/inference/variational/).

[^0]: E.g. The [wikipedia article](https://en.wikipedia.org/wiki/Statistics) on statistics uses the word inference 17 times.
[^1]: Note: this is a priori not the same \\(\theta\\) as before.
