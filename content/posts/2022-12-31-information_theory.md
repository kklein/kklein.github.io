---
title: "A Cheat Sheet for Information Theory Fundamentals in ML"
date: 2022-12-31 7:38:07 +0200
comments: false
published: true
description: This is a really cool post, please read it.
tags: [math]
katex: True
---

All of the definitions stem from Kevin Murphy's [Probabilistic Machine Learning: An Introduction](https://probml.github.io/pml-book/book1.html).

Many of the following primitives are defined for discrete  as well as continuous random variables and distributions. Since they are analogous,
I chose to only represent discrete versions for the sake of simplicity.


|                                                         |                                                                                                                                                                                    |
|---------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Entropy                                                 | $$\mathbb{H}(X) = \mathbb{H}(p) := -\sum_\mathcal{X} p(X=x)\log_2 p(X=x)$$                                                                                                         |
| Cross-entropy                                           | $$\mathbb{H}(p, q) := -\sum_\mathcal{X} p(X=x) \log_2 q(X=x)$$                                                                                                                     |
| Joint entropy                                           | $$\mathbb{H}(X, Y) := -\sum_{\mathcal{X}, \mathcal{Y}} p(X=x, Y=y)\log_2 p(X=x, Y=y)$$                                                                                             |
| Conditional entropy                                     | $$\begin{aligned} \mathbb{H}(X\|Y) &:= \mathbb{E}_{p(X)}[\mathbb{H}(p(Y\|X))] \\\ &= \mathbb{H}(X, Y) - \mathbb{H}(X) \end{aligned}$$                                                                                  |
| Chain rule for entropy                                  | $$\mathbb{H}(X_1, X_2, \dots, X_n) = \sum_{i=1}^n \mathbb{H}(X_i\|X_1, \dots X_{i-1}) $$                                                                                           |
| KL-divergence (a.k.a relative entropy)                  | $$\begin{aligned} D_{KL}(p\|\|q) &:= \sum_{\mathcal{X}} p(X=x) \log_2 \frac{p(X=x)}{q(X=X)} \\\ &= \mathbb{H}(p, q) - \mathbb{H}(p) \end{aligned}$$                                |
| Forwards KL-divergence                                  | Approximating $p$ with $q$ by minimizing $D_{KL}(p\|\|q)$ w.r.t. $q$                                                                                                               |
| Reverse KL-divergence                                   | Approximating $p$ with $q$ by minimizing $D_{KL}(q\|\|p)$ w.r.t. $q$                                                                                                               |
| (Expected) Mutual Information (a.k.a. Information Gain) | $$\begin{aligned} \mathbb{I}(X;Y) &:= D_{KL}(p(X, Y) \|\| p(X)p(Y)) \\\ &= \mathbb{H}(X) - \mathbb{H}(X\|Y) \\\ &= \mathbb{H}(X) + \mathbb{H}(Y) - \mathbb{H}(X, Y) \end{aligned}$$ |
| Conditional Mutual Information                          | $$\begin{aligned} \mathbb{I}(X;Y\|Z) &:= \mathbb{E}_{p(Z)} [ \mathbb{I}(X;Y) \| Z] \\\ &= \mathbb{I}(Y; X, Z) - \mathbb{I}(Y;Z) \end{aligned}$$                                     |
| Chain rule for MI                                       | $$\mathbb{I}(Z_1, \dots, Z_n; X) = \sum_{i=1}^n \mathbb{I}(Z_i; X \| Z_1, \dots, Z_{i-1})$$                                                                                        |

