---
title: "How much is a hundred bucks?"
date: 2023-04-23 7:38:07 +0200
comments: false
published: true
description: This is a really cool post, please read it.
tags: [math, thoughts]
katex: True
draft: True
---

Formal setup:

* The annual savings as of now are $s$, e.g. 50,000 USD.
* The annual savings increase every year by $\rho_s$, e.g. by 0.07.
* There is a fixed annual return on savings investments of $\rho_i$, e.g. of 0.04.
* There is a savings goal $g$, e.g. 1,000,000 USD. One might define this as the yearly spending divided by $\rho_i$.

Under these assumptions, the cumulative savings after $H$ years equal:

After 0 years: 0

After 1 year: $s$

After 2 years: $s(1+\rho_s) + s(1 + \rho_i) = s[(1+\rho_s) + (1+\rho_i)]$

After 3 years: $s(1+\rho_s)^2 + s(1+\rho_s)(1+\rho_i) + s(1+\rho_i)^2 = s[(1 + \rho_s)]$

...

$$\begin{aligned}
& \sum_{y=0}^{H-1} s (1 + \rho_s)^y (1 + \rho_i)^{H-1-y} \\\
= & s (1 + \rho_i)^{H-1} \sum_{y=0}^{H-1} \left(\frac{1 + \rho_s}{1 + \rho_i} \right)^y \\\
= & s (1 + \rho_i)^{H-1} \frac{1 - \left(\frac{1 + \rho_s}{1 + \rho_i} \right)^{H}}{1 - \frac{1 + \rho_s}{1 + \rho_i}} \\\
= & s (1 + \rho_i)^{H} \frac{1 - \left(\frac{1 + \rho_s}{1 + \rho_i} \right)^{H}}{\rho_i - \rho_s} \\\
= & \frac{s}{\rho_i - \rho_s}  [(1 + \rho)^{H} - (1 + \rho_s)^{H}]
\end{aligned}$$

Here we used the formula of the geometric series. In other words, we assumed that $|\frac{1 + \rho_s}{1 + \rho_i}| \neq 1$. Hence,
we assume that $\rho_s \neq \rho_i$. If they were equal, we could apply the formula for the geometric series, too, simply to a different, more simple
summation term.

The following plot shows this function for a varying time horizon.

![image](/imgs/savings.png)

According to ChatGPT, there is no analytical solution for the inverse of this function. In other words,
we can't find the function mapping from cumulative savings to duration of saving.

Still, what we can do is to try to numerically look for the duration which yields a certain cumulative savings sum.
Put differently

> Find the $H$ such that $f(H) = Q$

This can be achieved by looking for the root of $f(H) - Q$ with the Newton-Raphson method.

Now, we can do this twice. Once for $Q$ and once for $Q + \epsilon$. This allows to answer the question:

> At the point in time where we will have amassed $Q$ savings, how much time is $\epsilon$ money worth?

Naturally, the marginal value of time increases and the marginal value of money decreases. Therefore we would expect different responses to this question
for different $Q$.

$Q=0, \epsilon=100: .41$ days

$Q=\frac{\text{annual expenses}}{2 \rho_i}, \epsilon=100: .22$ days

$Q=\frac{\text{annual expenses}}{\rho_i}, \epsilon=100: .16$ days

