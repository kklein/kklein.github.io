---
title: "Use It Or Lose It"
date: 2000-01-01 7:38:07 +0200
comments: false
published: false
description: I sometimes learn about things; I want to remember them, too
tags: [tech, thoughts]
katex: True
---

I long held the belief that knowing things (by heart)[^0] was both overrated and not too important.
Rather, I thought that being able to quickly access and digest information was the only thing that mattered.
I still think that the latter is incredibly important, but I changed my mind on the former.

# Why remember?

Tl;dr: I now think that knowing things matters to some extent and would like to memorize.

If I ask myself the question of what could be between my current situation and a situation I'd desire to be
in, a partitioning presents itself naturally to me: inability, internal gatekeepers and external gatekeepers.

Inability would mean that I indeed try to do something with a reasonable amount of dedication, believe in myself,
am not obviously held back by others and still don't reach that situation. An example of that could be developing
asthma in the midst of a marathon preparation.

An internal gatekeeper would mean that something inside of me sabotages the attempt of reaching said situation, either
by preventing me from trying at all or by maintaining a certain reservation, suffocating true belief. An example
of that could be wanting to work with on a topic, say Reinforcement Learning, thinking about a way to get there,
e.g. by working through a course on Reinforcement Learning, but then telling myself that this doesn't make any
sense anyway since I haven't perfected my multivariate calculus skills - which Reinforcement Learning approaches
might draw from.

An external gatekeeper would mean that a person wields some kind of power to influence the path between me and my
desired situation and uses that power to burn any bridges. An example of that could be an employer who doesn't hire
me for he lacks the conviction in my abilities.

Note that all of these prevention mechanisms might be well-justified and have a net positive effect on me. Yet, at
times they might be unjustified and have a net negative effect. In the latter case, it'd be great to get rid of them.

Missing out on some of this potential is a very general problem. My change of mind with respect to the importance of
knowing things has to do with a particular instance of this. I now believe that not knowing things can unjustly
inflate the gatekeeping effects, both internal and external.

Concretely, I've found that at times, my enthusiasm about a topic is suddenly dampened by realizing that there are
a couple of things I once knew, that are relevant and that I no longer know - a case of internal gatekeeping.

Moreover, I've found that other people regularly rely on the assessment of knowledge of a person when deciding
whether they would like to offer or obstruct an opportunity. The extent of this has been a surprise to me since
my mental model had always been that if someone had done something 'hard' - e.g. have a track record of doing pure math -
it didn't matter whether they knew about something 'less hard' - e.g. the interpretation of the
[Kullback-Leibler divergence](https://en.wikipedia.org/wiki/Kullback%E2%80%93Leibler_divergence) - they could surely pick
it up in no time.

TODO: Make sure to not confound just doing hard things (including experience) and knowledge

Q: What is 'expertise'?

I do still think that they could pick it up in no time but there are at least two catches with this mental model:
* Sometimes a lot of value is created by being able to react quickly, to bounce ideas between people, to have short
  feedback loops, to reinforce and filter quickly, without having to read up on things.
* Other people might have a different (or no) partial ordering of hardness of somewhat comparable topics. Not everybody
  might agree that you can surely understand fast how a boosted decision tree works if one tends to work with topology.

TODO: Better example

Therefore I came to the conclusion that I should start remembering, memorizing and knowing things.

# What's the state of the art of remembering?

TODO: Explain anki system/algo (spaced repetition) and ankiweb
Teaser some of Anki's pros: Open Source, free hosting, high degree of customization, laTeX, Audio files, image files, Lückentexte

# Remembering, in practice

While there are plenty of ready-to-use Anki flashcard decks available
online, I decided to create my own decks. I both care about high precision and low recall.

## Creation of flashcards
I store all of my flashcards in fairly straight-forward csv files. This is an excerpt from my
[flashcards for French](https://github.com/kklein/flashcards/blob/main/french.csv).

```csv
L'embarras,"1. Incertitude, perplexité de quelqu'un qui ne sait quelle voie choisir.
2. Gêne, malaise en présence d'une situation délicate
3. Difficulté, problème (surtout pluriel)"

Échappatoire (f.),"Moyen adroit et détourné de se tirer d'embarras.
Exemple: Trouver une échappatoire pour ne pas aller à une soirée."

Agencer,"Disposer en combinant (des éléments), organiser (un ensemble)
par une combinaison d'éléments."

Habile,"Qui exécute avec adresse et compétence quelque chose de ses mains."
```

As of now I have decks for the following topics:
* French vocabulary[^1]
* English vocabulary
* Probability & Statistics
* Machine Learning
* Causal Inference
* Deep Learning

The former two decks are imported as to create cards for the reverse as well. For example, the last row of the excerpt above will create two flashcards:

| Question                                                           | Answer                                                             |
|:-------------------------------------------------------------------|:-------------------------------------------------------------------|
| Habile                                                             | Qui exécute avec adresse et compétence quelque chose de ses mains. |
| Qui exécute avec adresse et compétence quelque chose de ses mains. | Habile                                                             |

All other decks are unidirectional.

I version-control these csv files with `git` and host them in [this GitHub repository](https://github.com/kklein/flashcards).

Naturally, anki expects these csv files to have a certain format. In order to automate
the validation of this format, I build a [pre-commit](https://pre-commit.com/) hook, such that whenever I seek
to commit an update to my flashcards, the csv files are validated for spelling errors
and format violations. You can find this validation mechanisms in [this repository](https://github.com/kklein/anki-csv).

Once the csv files are created/updated and version controlled, I
import them with Anki's macOS client. This client allows
for the synchronization with AnkiWeb - making them available on all of
my devices.
[The last time I checked](https://forums.ankiweb.net/t/anki-public-api/22741)
there was no public API to circumvent having to use Anki's desktop
client and directly updating
the decks via a programming language or cli.

## Usage of flashcards

In order to study/practice the flashcards, I use both Anki's macOS desktop client as well as their Android app.
The former comes with a deck explorer. Here one can investigate, whether all cards will be rendered as expected:

![image](/imgs/anki.png)

# Agenda

* Talk about why remembering matters: Circle of influence, reducing the barrier of participation (wrt external and internal gatekeepers)
* Talk a bit about the mathematics/technicalities of Anki's spaced repetition


[^0]: In the sense of remembering and memorizing, i.e. storing and retrieving information without further aid; in stark contrast to wielding a skill or understanding.
[^1]: I realized that in languages, being able to define a word is a different skill from knowing its meaning; it's an exercise in articulation.
