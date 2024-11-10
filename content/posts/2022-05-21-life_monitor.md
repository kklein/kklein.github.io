---
title: "Life Monitor"
date: 2022-05-22 7:38:07 +0200
comments: false
params:
  published: true
description: Notifying me about relevant blind spots of my life.
tags: [tech]
---

# Motivation

On the one hand, there are things we notice 'automatically', easily, without consciously paying attention to them. On the other hand, there are things that slip through the cracks unless we make a point out of monitoring them.

It might seem very natural that whether something is effortlessly 'visible' is highly dependent on other properties of that very same something. It occurred to me that I have a tendency to be less receptive for observations that

* stretch over a longer period of time
* are not as spectacular in magnitude

For instance, I notice easily when a run of a given day extended to a very long distance. Yet, I notice much less easily when I ran a lot of distance summing up the past 9 days. I do notice easily when I've had a very bad day. All the while I notice less easily when 4 out of the past 5 days have been sort of disappointing.

Yet, this tendency for myopia and prioritization of spectacle seems misaligned with many interests of mine. I find that a lot of the most significant levers on my life, both good and bad, seem to rely on compounding, on consistency and longer time periods.

As a consequence, I have been longing for a system, which reduces friction in spotting developments of interest, both good and bad, which might otherwise go unnoticed by accident.

More concretely, I wanted a gentle warning system on some rough indicators of unintended behavior or circumstances as well as an enthusiastic woo boy, giving praise for displays of sustained positive behavior. In short: a monitoring system.

While there are many ways of notifying someone, I wanted an option which

* works on and is synchronized across mobile and personal computer
* is able to transmit both text and images
* allows for convenient rendering of images
* stores and shows past notifications

As an avid Telegram user, I thought of the option of sending myself emails or using a Telegram chat bot for that purpose. Without a strong preference I opted for the latter.

# Monitoring content

While many behaviors might be desirable to point out and adjust, for this exercise I had to do with the data available to me now. I ended up using two different sources of data. Firstly, I relied on google calendar data since [I log all of my physical exercise as calendar events](https://kevinkle.in/posts/2018-10-21-running-log/). Secondly, I pulled all of my daily [org log data](https://kevinkle.in/posts/2022-02-27-org_journal/), quantifying markers such as sleep, eating, stress, happiness and more. The latter data sits in plain text files on Dropbox servers.

In light of the motivation described above, I tried to define relevant behaviors and conditions serving as identifiers thereof. On an operational level, some of these conditions are tested on a daily basis while others are on a weekly basis. A sample of some notification constellations can be seen here:

| Signal   | Type of data | Periodicity | Condition                                                                              |
|----------|--------------|-------------|----------------------------------------------------------------------------------------|
| Positive | Running      | Daily       | Have there been at least k days of running in a row?                                   |
| Positive | Cycling      | Daily       | Has there been an run that made the cumulative yearly distance pass a 500km threshold? |
| Negative | Sleeping     | Weekly      | Has last week's average sleeping value been lower than the 40th percentile of values?  |
| Positive | Eating       | Weekly      | Has last week's average eating value been higher than the 60th percentile of values?   |

If a condition is met, it is translated into a text message and sent to me by means of a Telegram bot. This looks as follow:

![message org log](/imgs/life-monitor/msg-org.png)
![message streak](/imgs/life-monitor/streak.png)
![message cycling](/imgs/life-monitor/cycling.png)
![message threshold](/imgs/life-monitor/threshold.png)

In addition to creating specific text messages based on these conditions, I opted to also proactively send some recapitulative plots on a weekly basis.

![cumulative running](/imgs/life-monitor/cum-running.png)
![org overview](/imgs/life-monitor/org-overview.png)


# Architecture
All code I wrote is running on Google Cloud Platform. In particular, GCP's [Pub/Sub](https://cloud.google.com/pubsub) is at the heart of it, allowing for a periodic triggering of data analysis.

![pubsub](/imgs/life-monitor/pubsub.png)

As can be seen in the diagram, there are scheduled and periodic [cron](https://en.wikipedia.org/wiki/Cron) jobs. These are implemented with Google Scheduler and can be launched as simply as this, given one has [set up the gcloud cli tool](https://cloud.google.com/sdk/docs/initializing):

```
gcloud scheduler jobs create pubsub pubsub_cal_weekly --schedule "10 16 * * SUN" --topic ping_schedule --message-body '{"kind": "calendar_weekly"}' --location europe-west3
```

Note that these jobs can carry a message. I use different jobs with different messages based on the kind of data they rely on and based on the frequency of evaluation.

Also note that these cron jobs publish to a specific topic, in the example snippet above `ping_schedule` - step 1 in the diagram. My [Google Cloud Function](https://cloud.google.com/functions) needs to be subscribed to this very topic in order to be notified whenever it should be - step 2 in the diagram. When deploying a Function, this could look as such:

```
gcloud functions deploy f_scheduled [...] --trigger-resource ping_schedule --trigger-event google.pubsub.topic.publish
```

Depending on the message received from the scheduled cron job, the Function embarks on different kinds of data analysis. In order to do so, it requests and fetches message-dependent application data from an application server. Application data could e.g. be calendar events, requested from the google calendar API - step 3 in the diagram.

Once the data is retrieved, the Function analyzes it and assesses whether conditions for creating notifications are met. If not, nothing happens. If some notifications, either text or images, ought to be sent, the Function forwards this information to a Telegram bot. The bot then sends this notification as a regular text message to the end user, on any device running a Telegram app. This can be seen as step 4 in the diagram. I used [python-telegram-bot](https://github.com/python-telegram-bot/python-telegram-bot) - which I quite enjoyed using so far - for all things Telegram.

As of now, GCP forecasts a monthly cost of 0.01 CHF for running this project.

I found the [How to schedule a recurring Python script on Google Cloud](https://cloud.google.com/blog/products/application-development/how-to-schedule-a-recurring-python-script-on-gcp) article by google to be a super useful starting point.

# Future work

* Expand to finances by including Transferwise and  splitwise data in monitoring.
* Make Telegram bot responsive to prompts requesting a specific overview/evaluation instead of only triggering evaluations via regular cron jobs.
* Implement more and better conditions.

Code [here](https://github.com/kklein/life-monitor).
Discussion on hacker news [here](https://news.ycombinator.com/item?id=31477851).

