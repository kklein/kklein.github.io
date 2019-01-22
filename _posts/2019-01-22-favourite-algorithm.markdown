---
layout: post
title:  "A Beautiful, Derandomized Algorithm"
date:   2019-01-21 16:38:07 +0200
categories: jekyll update
---
<script type="text/javascript" async
src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?
config=TeX-AMS-MML_HTMLorMML"></script>

### MAX-3SAT
Is a boolean satisfiability problem. Given a formula in 3-CNF, we intend to satisfy as many clauses as possible.

As a reminder, 3-CNF means that the formula \\(\mathcal{F}\\) consists of \\(m\\) conjuncted clauses using \\(n\\) literals. Each clause is a disjunction of exactly three literals. An example with \\(m=4\\) and \\(n=5\\). An exemplary formula:

\begin{align}
\mathcal{F} &= C_1 \wedge C_2 \wedge C_3 \wedge C_4 \\\
&= (l_1 \vee \neg l_2 \vee l_4) \wedge (l_2 \vee l_4 \vee \neg l_5) \wedge (\neg l_1 \vee \neg l_3 \vee l_5)  \wedge (l_2 \vee l_3 \vee l_4)
\end{align}

This problem is NP-hard and we will look into an approximation algorithm.

### How many clauses can we satisfy?
In order to show that _at least a lot_ of the clauses can be satisfied for every formula, we employ the _probabilistic method_.

Let's define a randomized algorithm.

Each literal \\(l_i\\) is i.i.d. from the
uniform distribution over \\(\\{True, False\\}\\). This turns every clause, and thereby the number of satisfied clauses \\(M\\) into a random variable.

We observe that a clause is satisfied if any of is components, being either a literal or a negated literal, is \\(True\\). Hence it is \\(True\\) in all cases but the one in which all of its components are \\(False\\).

\\[\Pr[C_i] = 1 - \Pr[\text{all components are }False] = 1 - \frac{1}{2}^3 = \frac{7}{8}\\]

We need no more but our dearest linearity of expectation to show that for every formula, we satisfy \\(\frac{7}{8}\\) of its clauses, _in expecation_.

\begin{align}
\mathbb{E}[M] &= \mathbb{E}[\sum_{i=1}^m C_i] \\\
&= \sum_{i=1}^m \mathbb{E}[C_i] = \sum_{i=1}^m \Pr[C_i] \quad \text{(L.O.E.)} \\\
&= \frac{7}{8}m
\end{align}

The _probabilistic method_ allows us to draw an interesting conclusion from this. We have shown that \\(\frac{7}{8}\\) of all clauses are satisfied in _expectation_ for a given formula. As the expected value is over a non-negative value, we know that one of the realizations the expected value sums over has to be at least \\(\frac{7}{8}\\)m for the mean of the realizations to be \\(\frac{7}{8}\\)m. Hence one random assignment will lead to the satisfaction of at least \\(\frac{7}{8}\\)m clauses, for every formula.

I find that this by itself is an interesting, not necessarily intuitive result. It is a proof of existence.

This method is often used for proofs of existence or/i.e. non-zero success probabilities of randomized algorithms. However, in this particular scenario we will use this as the foundation for the synthesis of a deterministic algorithm assigning truth values to literals as to approximate the maximum assignment! This approach is sometimes referred to as derandomization via _conditional expectation_.

### Construction of determinstic algorithm


The high-level idea of the algorithm is that we look at one literal after another, calculate the expected value conditioned on a possible assignment and then set this literal to the truth value that yields the highest expected value.

This revolves around two main observations:
* We don't 'lower the expectation' by conditioning on the assignment that maximizes the conditional expectation.
* We can compute the conditional expectation 'efficiently'.

#### Increasing expectation
Our random assignment process used to compute the expected value tells us that:
\\[\mathbb{E}[M|l_1=\alpha_1, ..., l_{i-1}=\alpha_{i-1}] = \\\
\frac{1}{2} \mathbb{E}[M|l_1=\alpha_1, ..., l_{i-1}=\alpha_{i-1}, l_i=0] + \frac{1}{2}
\mathbb{E}[M|l_1=\alpha_1, ..., l_{i-1}=\alpha_{i-1}, l_i=1]\\]



\\[\Rightarrow max(\mathbb{E}[M|l_1=\alpha_1, ..., l_{i-1}=\alpha_{i-1}, l_i=0],\
\mathbb{E}[M|l_1=\alpha_1, ..., l_{i-1}=\alpha_{i-1}, l_i=1]) \geq \\\
\mathbb{E}[M|l_1=\alpha_1, ..., l_{i-1}=\alpha_{i-1}]
\\]

Therefore we know that always setting a literal to the truth value maximizing the conditional expectation will give us \\(\mathbb{E}[M|l=\alpha] \geq \mathbb{E}[M] = \frac{7}{8}m\\).
#### Cost of computing conditional expectation
Given assignments \\(l_1 = \alpha_1, \dots, l_i = \alpha_i\\), computing \\(\mathbb{E}[M\|l_1 = \alpha_1, \dots, l_i = \alpha_i]\\) is actually pretty easy. We go clause by clause, each containing 3 literals and hence requiring \\(\mathcal{O}(1)\\) time. If all literals of a clause are determined, we check whether the clause is satisfied or not and accordingly count it as 0 or 1. If some of the literals are set, we add the probability of it being satisfied, e.g. \\(\Pr[False \vee l_{i+1} \vee \neg l_{i+2}] = 1 - \frac{1}{4} = \frac{3}{4}\\). All clauses that have no determined literals keep their expected satisfaction of \\(\\frac{7}{8}\\). Hence computing one conditional expectation takes us \\(\mathcal{O}(m\cdot 1)\\) time.

#### Bringing it together

```
for i = 1 to n:
  M_0 = E[M|l_1 = a_1, ... ,l_i-1 = a_i-1, l_i = 0]
  M_1 = E[M|l_1 = a_1, ... ,l_i-1 = a_i-1, l_i = 1]
  if M_0 >= M_1:
    a_i = 0
  else:
    a_i = 1
return a_1, ..., a_n
```

Hence we get an assignment satisfying at least \\(\frac{7}{8}\\) of the clauses
in \\(\mathcal{O}(mn)\\) time.

### Closing notes

[Håstad](https://dl.acm.org/citation.cfm?doid=502090.502098) showed that finding a polynomial time algorithm satisfying more than \\(\frac{7}{8}\\) of the clauses for satisfiable forumlas, unless... well unless \\(\mathcal{P} = \mathcal{NP}\\).

I discovered this through Angelika Steger's graduate course [Randomized Algorithms and Probabilistic Methods](https://www.cadmo.ethz.ch/education/lectures/HS18/RandAlg/index.html) at ETH. It has been the best course I have attended.
