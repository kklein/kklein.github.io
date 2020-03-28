---
layout: post
title:  "Playlist Chatbot"
date:   2020-03-27 16:00:00 +0200
categories: jekyll update
comments: false
---
Countless times have I found myself in the situation of receiving a telegram message of following
kind:

![telegram message](/imgs/playlist-chat-bot/telegram-message.png){:class="img-responsive"}

On the one hand I find this immensely exciting:
   * A friend takes time to share something with me.
   * I take pleasure in exploring music per se.
   * Both conjuncted, there is a possibility to bond over music.

Hence there is a great amount of potential!

Yet, on the other hand, it's a bit of a mess. As seemingly few people do, I use Google Play
Music/Youtube Music over spotify (it's a long story). Spotify links are sometimes rendered
nicely by Telegram as to indicate artist/song/album information. Sometimes not. Depending on that,
the process of adding a friend's suggestion to a playlist of mine looks as follows:
   * ? Follow spotify link (leave telegram), retrieve song information.
   * Open Google Play Music.
   * Query song information.
   * Add a search result to playlist.
   * Switch back to Telegram to thank dear friend. :)

My desire was to keep all of the upside while getting rid of all context changes. This could be
achieved by a chatbot. The desired behavior:
   * Friend messages chatbot directly with song information in plain text.
   * Chatbot queries Google Play Music for songs.
   * Chatbot adds highest-ranking result to my playlist.
   * Chatbot confirms addition to friend.

![bot message](/imgs/playlist-chat-bot/bot-message.png){:class="img-responsive"}

Implementing such a bot came with fairly low effort as I found both the [python telegram bot
api](https://python-telegram-bot.org/) as well as the [gmusicapi](
https://github.com/simon-weber/gmusicapi) very userfriendly. Deploying the bot locally with a
polling mechanism has also proven to be relatively straightforward.

Remote deployment seemed a bit trickier at first, for google play music authentication is typically
handled via oauth browser authentication. Thanks to the help of [Simon
Weber](https://www.simonmweber.com/) I was able to make it run on Google Cloud Functions. This has
actually been a surprisingly seemles and pleasant experience. Details regarding the authentication
can be found in the [project repo](https://github.com/kklein/gmusic-bot).