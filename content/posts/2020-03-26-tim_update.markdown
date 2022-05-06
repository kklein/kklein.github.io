---
title:  "Update: Time Is Money"
date:   2020-03-26 16:38:07 +0200
comments: false
description: I built a Chrome extension which seems to work more or less.
tags: [tech]
---

A while back, I wrote about [Time Is Money](http://kevinkle.in/jekyll/update/2018/08/03/tim.html).

Back then I ran into several technical problems with modern browsers' [idle api](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/idle).

Circumventing these with a somewhat brute approach made it possible to get the extension to run more smoothly. Besides still being able to build it from source, it is now available in the [chrome extension store](https://chrome.google.com/webstore/detail/timeismoney/pdhagfofcpkciigdpbmjniblellpbjjk).

## Current behaviour

In the extension options, a user can specify an _hourly_ wage as well as a set of _undesirable websites_.

Whenever the user has an active tab on one of those websites, a counter will appear in the top left corner of the browser window. This is periodically updated to reflect the 'amount spent' on undesirable websites throughout the current week.

The count should only consider the most recently active tab when working with several browser windows. Yet, this is all _a bit_ messy. There are plenty of edge cases: multiple browser windows, multiple browsers with different profiles, several OS windows open, OS hibernation, laptop lid closes and many more.

I attempted to capture some of those aspects explicitly. For all others, a simple timeout mechanism should bound the errors: after a user-defined timeout of inaction, the count will no longer be increased until there is further action.

Please reach out in case you bump into unintended behaviors or have suggestions for improvements!

For some more technical context, please see the [project repo](https://github.com/kklein/timeismoney). 
