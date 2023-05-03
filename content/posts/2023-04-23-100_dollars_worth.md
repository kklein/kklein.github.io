---
title: "How Much Is a Hundred Bucks?"
date: 2023-05-03 7:38:07 +0200
comments: false
published: true
description: In a world where we rent out our time
tags: [math, thoughts]
katex: True
draft: False
---

The calculator accompanying this post can be found [here](https://kevinkle.in/savings/index.html).

## The value of time, the value of money

There are various ways of trying to assess the value of something. For instance, one might
define the value of a resource by how much someone else is willing to pay. In the domain of
time we could ask the question of the hourly rate someone is willing to pay for our time/labor
and consider that the value of our time.

A contractor or employee might be able to gauge how much other people are
willing to pay for one hour of one's time and derive from that an
[aspirational hourly rate, as suggested by Naval](https://nav.al/hourly-rate).
In this mindset, one might take on the stance of never 'doing work'[^0], e.g. filing taxes,
doing laundry, which costs, i.e. or framed differently, 'pays', less than said aspirational
hourly rate. The implicit assumption here is that our time is a fairly liquid resource -
instead of cooking a meal for an hour we could do an additional hour of the work that pays
best and keep the difference.

Since this is a trade, we assume it was fair/efficient and  think of both resources having
equivalent value. Hence, the hourly rate, defining the value of time in terms of money, would
also imply a valuation of money in terms of time.

While this view might be useful in many regards, it doesn't perfectly capture what I want it
to capture.

On the one hand, it doesn't explicitly[^1] account for temporal developments, such
as returns on investment over the years. For example, a dollar saved now might be 'more valuable'
in terms of time gains than a dollar saved in ten years, depending on my (compounding) returns on
investment and depending on one's capability to increase hourly pay over the years.

On the other hand, the previous view relies on the assumption that we
can and would trade time for money, potentially forever. What seems more natural for me to do
is to emphasize that, in a very simplified model of employment, one is renting out one's time
until ones doesn't 'need' to anymore - ideally hoping that this is strictly before the moment
a respective national pension fund kicks in. After that point in time, one might still go
after the very same activity but with a very different motivation - no longer trading time for
money but rather just allocating time on what's best fun, most exciting, most rewarding. In
this model, the monetary unit remains the same as before: the typical currency, say USD. Yet,
the temporal unit changes: it is no longer an hour of one's time 'right now' but rather the
delay from achieving financial independence that a monetary unit causes.

Bluntly put, the cost model for money becomes: By how much does spending a given amount
delay the point in time of reaching the bliss of financial freedom?

Note that the answer to this question doesn't change whether one continues to receive income
from employment or contracting after this point in time. This is a relevant since we are
talking about financial freedom, in a somewhat stark contrast to retirement.

Clearly, the more we spend before reaching our savings goal, the longer it'll take us to reach
it. Put differently, the less we spend, the more time in a state of choice, freedom of sorts,
we buy ourselves. But how much time? We'll get to that in the
next paragraph.

Moreover, we will realize that the value of money is likely to change over time.
TODO: Insert illustration with time axis

## How much is 100 USD, formally?

### How much do we save?

Let us say that

* The annual savings as of now are $s$, e.g. 50,000 USD.
* The annual savings increase every year by $\rho_s$, e.g. by 0.07.
* There is a fixed annual return on savings investments of $\rho_i$, e.g. of 0.04.
* There is a savings goal $g$, e.g. 1,000,000 USD. One might define this as the yearly spending divided by $\rho_i$.

Under these assumptions, the cumulative savings after $H$ years equal:

After 0 years: 0

After 1 year: $s$

After 2 years: $s(1+\rho_s) + s(1 + \rho_i) = s[(1+\rho_s) + (1+\rho_i)]$

After 3 years: $s(1+\rho_s)^2 + s(1+\rho_s)(1+\rho_i) + s(1+\rho_i)^2 = s[(1 + \rho_s)]$

It can easily be shown by induction that this series equals the following expression, which can be further simplified:

$$\begin{aligned}
f(H) &= \sum_{y=0}^{H-1} s (1 + \rho_s)^y (1 + \rho_i)^{H-1-y} \\\
&= s (1 + \rho_i)^{H-1} \sum_{y=0}^{H-1} \left(\frac{1 + \rho_s}{1 + \rho_i} \right)^y \\\
&= s (1 + \rho_i)^{H-1} \frac{1 - \left(\frac{1 + \rho_s}{1 + \rho_i} \right)^{H}}{1 - \frac{1 + \rho_s}{1 + \rho_i}} \\\
&= s (1 + \rho_i)^{H} \frac{1 - \left(\frac{1 + \rho_s}{1 + \rho_i} \right)^{H}}{\rho_i - \rho_s} \\\
&= \frac{s}{\rho_i - \rho_s}  [(1 + \rho_i)^{H} - (1 + \rho_s)^{H}]
\end{aligned}$$

Here we used the formula of the geometric series. In other words, we assumed that $|\frac{1 + \rho_s}{1 + \rho_i}| \neq 1$. Hence,
we assume that $\rho_s \neq \rho_i$. If they were equal, we could apply the formula for the geometric series, too, simply to a different, more simple
summation term.

The following plot shows the function $f$ from above for varying time horizons $H$ and some arbitrary
parameters $s$, $\rho_i$ and $rho_s$:

![image](/imgs/savings.png)

We could now subtract the savings goal from this function and look for the try to find
the root of that expression, with respect to $H$. This is an expression of the form
$a^H + b^H - c = 0$. As far as I can tell there are, in the general case, no analytical
solutions for such expressions. As a consequence we can't easily invert the function from
above and can't have a mapping from cumulative savings to duration of saving.

Still, what we can do is to try to numerically look for the duration which yields a certain cumulative saving.
Put differently, we can tackle the following problem:

> Find the $H$ such that $f(H) = g$

This can be achieved by looking for the root of $f(H) - g$ with the Newton-Raphson method.

In summary, we have a way of determining the duration of saving $H$, given a savings goal $g$.

Let us now bridge continue this exercise, taking additional expenditures into account.

### How much is 100 USD in USD?

In the previous paragraph, we illustrated how savings from now will compound. Spending
a sum of money now, will - in a sense -  also compound, since we are missing out
on the return on investment had we not spent but invested this money.

Gladly, this compounding is of a simpler nature than that of the savings. The savings
came with the interdependent compounding aspects: the return on investment as well as
the increase in annual savings. For an expense $e$ made right now, there is only the
return on investment that is compounding:

$$\begin{aligned}
c(H, \rho_i, e) &= e (1 + \sum_{y=0}^H \rho_i^y)
&= e (1 + \frac{1-\rho_i^{H+1}}{1 - \rho_i}
\end{aligned}$$

again, applying the formula for the geometric series.

For example, if we expect to hit our savings goal in $H=10$ years, and we assume an annual
return on invest $\rho_i$ to be .05, spending $e=100$ USD now will 'cost us' 160 USD.
Put differently, we need to increase our savings goal by 160USD if we want to spend 100USD
right now.

Importantly, we see that the missed savings potential due to
additional expenditures is a monotonically increasing function of the horizon $H$. As
a consequence, spending 100 USD now is more expensive than spending 100USD halfway down the 
road.

### How much is 100 USD in time?

We can now tie both previous pieces together. We now how much we save not considering
additional expenditures and how an expenditure impacts our savings. We observe that, simply
put, our savings $f(...)$ minus the missed savings potential $c(...)$ should be equal the savings goal $g$.

We can then again use Newton Raphson to solve this equation to figure out for which $H$
this equation holds true. Put differently, we can figure out for how long we need to save
taking this expenditure into account.

Comparing this duration with the duration without the additional expenditure then yields
the extra time of saving we need to put in.

TODO: Insert example

## Going further: How much is 100USD of a time other than at the end?

TODO: Insert matrix with illustrations on the graph

What we can see on this graph is that the increase in savings between year 2 and year 4 is
substantially less than the increase in savings between year 10 and 12. Conversely, this
tells us that the value of our time might be lower at year 2 than at your 10. Or does it?
Let's take a step back.


[^0]: I suppose that 'doing work' here means anything that takes time and is not substantially intrisically rewarding. Flipped around, this might mean that an employment activity might not
necessarily be 'doing work'.

[^1]: One can of course bake anything into an hourly rate and make define it relative to a point in time - this would then implicitly capture temporal developments.
