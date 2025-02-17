 ---
title: Projects
type: page
draft: False
---

# QuantCo
I am fortunate enough that some of the work done at [QuantCo](https://quantco.com/) is open source.

## metalearners

[metalearners](https://github.com/Quantco/metalearners) is a Causal Inference Python library for estimating Conditional Average Treatment Effects with MetaLearners.
For more information, have a look at our [blog post](https://tech.quantco.com/blog/metalearners) or the [documentation](https://metalearners.readthedocs.io/en/latest/).

Francesc and I also gave talks at [PyData Paris](https://www.youtube.com/watch?v=3EXCLYI5_pU) and the [Swiss Python Summit](https://www.youtube.com/watch?v=WN7suk8OA_E).

## datajudge

[datajudge](https://github.com/quantco/datajudge) is a Python data testing library. Datajudge allows for the convenient expression and testing of expectations between different data source in database. It integrates nicely with pytest. For more, read our [blog post](https://tech.quantco.com/2022/06/20/datajudge.html) or have a look at an [example](https://datajudge.readthedocs.io/en/latest/examples/example.html) in the documentation.

## pytsql

[pytsql](https://github.com/Quantco/pytsql) is a Python library enabling the execution and parametrization of raw mssql scripts. Under the hood it parses a script with an [antlr](https://www.antlr.org/) grammar.

# PyData

I try to be active in and foster the [PyData](https://pydata.org/) community.

I gave a talk about [Datajudge](https://github.com/quantco/datajudge) at the PyData Berlin meetup ([slides](https://github.com/kklein/datajudge-presentation/blob/main/slides.pdf)) and a talk about Causal Inference libraries at the PyData Amsterdam conference ([recording](https://youtu.be/cRS4yZt6OU4?si=YP-ETWSfReUcS9rV), [slides](https://github.com/kklein/pydata_ams/blob/main/slides/slides.pdf)).

I am one of the organizers of the [PyData Zurich meetup](https://www.meetup.com/pydata-zurich/). [This](https://youtu.be/1qeMyC1V94A?si=5k0wTdopT801tySa) and [this](https://www.youtube.com/watch?v=31EMTdUlPeo) are recordings of some of our recent events at Google.

# Personal

## Life Monitor
This is project aims to provide me with notifications about aspects of my life which might otherwise go unnoticed. I use google calendar data, sport activity data and daily org mode log data to inform me about recent achievements as well as warn me about recent downturns. Notifications are sent via a telegram chat bot.

I wrote more about it [here](https://kevinkle.in/posts/2022-05-21-life_monitor/) - all code can be found [here](https://github.com/kklein/life-monitor). There was a discussion on [Hacker News](https://news.ycombinator.com/item?id=31477851).

## CycleGAN
Reimplementation of the [CycleGAN](https://arxiv.org/abs/1703.10593) paper and serving of inference on webpage via ONNX. This was collaborative work [Lorenz Kuhn](https://lorenzkuhn.com/) and [Philip Junker](https://ch.linkedin.com/in/philip-junker). Source code can be found [here](https://github.com/lorenzkuhn/CycleGanApp).

# Uni

## Characterizing and Approximating the Optimal Allocation for Top-m Arm Identification

Multi-armed Bandits, Bayesian Optimization, Experiment Design.

We characterize the rate with which the posterior of an optimal allocation converges to the underlying true best arms in the context of multi-armed bandits. Moreover, we propose an algorithm inspired by Thompson sampling to identify the m best arms in a pure exploration scenario. The full report can be found [here](https://github.com/kklein/master-thesis/blob/master/thesis.pdf).

Master thesis in Prof. [Andreas Krause's lab](https://las.inf.ethz.ch/krausea), supervised by [Johannes Kirschner](https://las.inf.ethz.ch/people/johannes-kirschner) and [Mojmír Mutný](https://mojmirmutny.github.io/).

## Collaborative Filtering: Stacking Collaborative Filtering and Neural Networks for Improved Recommendations

Abstract: Online businesses face the challenge of recommending relevant products to users based on users’ previous preferences and similar customers. This work explores the use of classic matrix factorization methods on the one hand and recent neural network-based methods on the other hand. Final predictions were further improved using ensembling methods such as bagging and stacking. We report similar, competitive scores for matrix factorization methods and slightly lower accuracy for neural network-based methods with a final ensemble RMSE of 0.964.

This project was collaborative work with [Benjamin Hahn](https://benjaminha.hn/) and [Lorenz Kuhn](https://www.lorenzkuhn.com/). The full report can be found [here](https://github.com/kklein/CILRecommender2018/blob/master/report/report.pdf).

## Structured Information Retrieval of Natural Language Supporting Clinical Decision-making
We created a topic modelling with [ICD](https://en.wikipedia.org/wiki/International_Classification_of_Diseases#ICD-9) codes - encoding medical diagnoses - to retrieve relevant medical literature based on an electronic health record of a patient.

Bachelor thesis in Prof. [Thomas Hofmann's lab](http://www.da.inf.ethz.ch/people/ThomasHofmann/), supervised by [Prof. Carsten Eickhoff](https://brown.edu/Research/AI/people/carsten.html).
The full report can be found [here](https://github.com/kklein/BachelorThesisReport/blob/master/klein.pdf).
