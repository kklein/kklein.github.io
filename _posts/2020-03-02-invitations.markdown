---
layout: post
title:  "Invitations"
date:   2019-03-01 9:38:07 +0200
categories: jekyll update
comments: false
---
<script type="text/javascript" async
src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?
config=TeX-AMS-MML_HTMLorMML"></script>

## Scenario and goal
You are the host of an event for which there are \\(n\\) candidates to be invited. Let the nature of the event be such that it seems personally attached to you, yet also fairly polarizing in its experience. In other words:
- some invitees will have a desire to decline
- invitees with a desire to decline will feel bad about declining
- some non-invitees will have a desire to attend
- non-invitees with a desire to attend will feel bad about not being able to attend

Moreover, one might weight the ambitions wrt non-desiring invitees and desiring non-invitees differently. For instance, one might consider the discomfort of someone having
to decline worse than the missed opportunity of someone not attending who would've liked to.

In other words, this gives rise to the goal of _minimizing_ the following quantities:
- non-desiring invitees
- desiring non-invitees

Thus, recalling the option to weigh those terms differently, we obtain the following loss function:
\\[\mathcal{L} := \alpha\text{\#non-desiring invitees} + (1 - \alpha) \text{\#desiring non-invitees}\\]
with \\(\alpha \in [0, 1]\\).

If we had perfect a priori knowledge about invitation candidates and would either invite according to it or its negative, our loss function would evaluate to \\(0\\) or \\(n\\). As those represent 'best' and 'worst' cases, we can set our expectation of algorithm performance to be within the range \\([0, n]\\).


## Assumptions
- Candidate desires to attend the event are i.i.d. with \\(\Pr[desire] = q\\).
- \\(q\\) is unknown.
- Invitation candidates respond to the invitation according to their desire.
- \\(\alpha\\)

## Algorithms and their performances
Let's start off with some naive deterministic algorithms to depthen our intuition about the loss function.

# Naive 1: Invite all candidates
\\(\mathbb{E}[\mathcal{L}] = \alpha \mathbb{E}[\text{\#non-desiring candidates}] = \alpha n (1-q) \\)

# Naive 2: Invite nobody
\\(\mathbb{E}[\mathcal{L}] = (1 - \alpha) \mathbb{E}[\text{\#desiring candidates}] = (1 - \alpha)n q \\)

# Randomized 1: Invite with probability \\(p\\)
\\(\mathbb{E}[\mathcal{L}] = \alpha n (1 - q) p +  (1 - \alpha)n q (1 - p)\\)

Naturally, one might wonder what shape the optimal \\(p\\) takes on, as a function of \\(\alpha\\) and \\(q\\).

\begin{align}
\hat{p} &:= argmin_{p}\\ \mathcal{L} \\\
        &= argmin_{p}\\ \alpha n (1 - q) p +  (1 - \alpha)n q (1 - p) \\\
        &= argmin_{p}\\ p (\alpha (1 - q) + (1 - \alpha)q(-1)) \\\
        &= argmin_{p}\\ p (\alpha - q)
\end{align}

Recalling that \\(p\\) is a probability, we know it is bounded by \\([0, 1] \\). Hence there are three cases:
- \\(\hat{p} := 0\\) if \\(\alpha > q\\)
- \\(\hat{p} := 1\\) if \\(\alpha < q\\)
- \\(p\\) is irrelevant if \\(q = \alpha\\)

What does this tell us?
In the first case, we would like to go with the naive 'invite nobody' approach whereas in the second case, we would like to go with the 'invite everybody' approach.
ADD INTUITION.

However, as \\(q\\) is assumed to be unknown, we cannot evaluate the condition. In other words, depeding on \\(\alpha\\) and \\(q\\), one of Naive 1 and Naive 2 will perform well, the other badly. This randomized approach will lie somewhere inbetween. Allowing for an _adaptive_approach, i.e. letting \\(p\\) vary ofer time, we could 'push' \\(p\\) closer to either \\(0\\) or \\(1\\), either of which is preferable. Such a method would naturally end up with a loss between that of the fixed starting probability \\(p\\) and the approached 'invite all' or 'invite nobody' approach. For instance, if asking everybody is the optimal choice, the relative ordering of expected losses looks as follows:

![losses](/losses.png){:class="img-responsive"}

The red arrows indicate the direction in which we'd like to shift the randomized approach.

Note that in order to devise an adaptive strategy, we need to consecutively sample feedback. Hence candidates invitations are no longer i.i.d. but rather invited one after another, each possibly influencing all of the remaining candidates. 

# Randomized 2: Update invitation propabilities \\(p_i\\)
Given a \\(p\\) such that \\(p_1 = p\\) and \\(\delta > 0\\).
```
for i = 1 to n:
    invite candidate i with probability p_i
    if candidate i was invited:
        if candidate i accepts:
           p_{i+1} := p_i + delta
        else:
           p_{i+1} := p_i - delta 
```
We assume that \\(delta\\) either small enough such that \\([0, 1] \subset [p_1 - n \delta; p_1 + n \delta]\\). If not, one could simply cut \\(p_i\\) off at 0 and 1 respectively.

In order to analyze the expected loss of this approach, it turns out useful to ask another question first: How many candidates will be invited with this approach?

The iterative process of updating \\(p_i\\) can be thought of as a random walk on the following Markov chain:

![probability updates](/mc.png){:class="img-responsive"}

The likelihood of candidate \\(i\\) being invited depends on the state we find ourselves in in timestep \\(i\\). Refering to a state and its associated value \\(p_i\\) by \\(S_i\\), our question of the total amount of invitees translates to:

\\[\mathbb{E}[\text{\#invitees}] = \mathbb{E}[\sum_{i=1}^n S_i]\\]

Before addressing this quantity, we first derive a helpful notion: the expected state in timestep \\(i\\).
\begin{align}
\mathbb{E}[S_i] &= \mathbb{E}[p_1 + \delta \cdot \text{\#'right' transitions so far} - \delta \cdot \text{\#'left' transitions so far}]\\\
                &= p_1 + \delta \cdot \mathbb{E}[\text{\#'right' transitions so far}] - \delta \cdot \mathbb{E}[\text{\#'left' transitions so far}] \text{ (L.O.E.)}\\\
                &= p_1 + \delta (i-1)q - \delta(i-1)(1-q)
\end{align}

Coming back to our underlying question, we obtain:
\begin{align}
\mathbb{E}[\text{\#invitees}] &= \mathbb{E}[\sum_{i=1}^n S_i] \\\
                              &= \sum_{i=1}^n \mathbb{E}[S_i] \text{ (L.O.E.)} \\\
                              &= \sum_{i=1}^n p_1 + \delta (i-1)q - \delta(i-1)(1-q) \\\
                              &= n p_1 + \delta \frac{n(n-1)}{2}(2q - 1) \\\
                              &= n (p_1 + \delta \frac{n-1}{2}(2q - 1))
\end{align}

For the sake of compactness, let us define \\(r := p_1 + \delta \frac{n-1}{2}(2q - 1)\\).
Plugging this into our loss function, we obtain:

\\[ \mathbb{E}[\mathcal{L}] = \alpha n (1 - q) r + (1 - \alpha) n q (1 - r) \\]

This expected value should raise the question: did we really improve on the first randomized approach, with fixed \\(p\\)? A closer examination of \\(r\\) yields the insight. We see that \\(r < p_1\\) if \\(q < \frac{1}{2}\\) and \\(r > p_1\\) if \\(q > \frac{1}{2}\\). In other words, this approach is an enhancement over the former if either is satisfied:
- \\(\alpha > q\\) and \\(\frac{1}{2} > q\\) 
- \\(\alpha < q\\) and \\(\frac{1}{2} < q\\).

On the one hand, it might seem like a disappointment, that it is not always an improvement over the randomized approach with fixed probability. On the other hand, we know see (more clearly) why such hopes were unfounded: Our update rule is independent of \\(\alpha\\). This is hhighly influential as \\(\alpha\\) determines the loss funciton. I think that such an update rule should be feasible

## Closing remarks
- It seems to me that what we are doing in the update step can be seen as implicitly maintaining and leveraging a counter on the binary outcomes of desire preferences. This is a flavor of explore-exploit.
- The _addition_ of \\(\delta\\)s in the update step is a design choice. Mulitplication seems like a sensible approach, too.
- Many thanks to Tim. :)