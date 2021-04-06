---
title: BitcartCC Version 0.0.0.3 is out!
img: https://github.com/bitcartcc/bitcart-media/raw/master/logo.png
author: MrNaif2018
category: releases
createdAt: "2020-10-25T17:41:16"
---

BitcartCC Version 0.0.0.3 released! Server logs, admin panel improvements on mobile, search speed-up, bug fixes and usability improvements!

### Logging system

We now have logging system set up for our merchants API.

It means that it'll be easier to debug issues, as it is now possible to view logs from admin panel.

You can view logs (collected each day), and download them if needed for others to help to fix your issue.

### Admin panel responsibility improvements

Admin panel should now work better on mobile, especially in server management page.

### Other changes

Search input in admin panel now no longer searches all related tables, but only the one you are currently viewing.

Fixed a bug where if you have passed products=`None` to API it would crash.

Update check now doesn't even start to run if update url is not set

Admin panel's wallets creation dialog currency field is now a dropdown-to avoid entering invalid fields.

https://github.com/bitcartcc/bitcart/blob/master/CHANGELOG.md#0003

<script async src="https://telegram.org/js/telegram-widget.js?12" data-telegram-post="bitcartcc/2933" data-width="100%"></script>
