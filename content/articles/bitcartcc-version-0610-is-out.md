---
title: BitcartCC Version 0.6.1.0 is out!
img: https://github.com/bitcartcc/bitcart-blog/raw/master/assets/img/bitcartcc-0610.png
author: MrNaif2018
category: releases
createdAt: "2021-12-31T22:28:37"
---

BitcartCC Version 0.6.1.0 is out! Better search engine, theming support, better store UI and more!

This release contains quite a few bugfixes and new changes, but doesn't contain any breaking changes

During this release we started our efforts to localize and improve customization of BitcartCC parts.

Our website was translated into Belarussian, French and Hindi languages in addition to already existing English and Russian.

In 2022 many important changes are coming to make BitcartCC the easiest to use

### Better search engine

Search engine in admin panel is now way more advanced.

It is now possible to search by exact fields, like:

`store_id:someid some arbitrary text` will filter column `store_id` with value `someid`, and then search `some arbitrary text` like it did with previous
search engine.

You can also filter objects created in a certain time interval

### Theming support in BitcartCC store

You can now customize the UI of your store pages!
In admin panel you can set a link to css file used for themeing your admin (not supported yet) or store.

You can override different color variables to customize the look and feel of your store.

Here's example css:

```css
:root {
  --brand-color: #162d50;
  --primary: var(--brand-color) !important;
  --success: var(--brand-color) !important;
  --link: var(--brand-color) !important;
}
```

<script async src="https://telegram.org/js/telegram-widget.js?15" data-telegram-post="bitcartcc/5276" data-width="100%"></script>

### Better store UI

The cart page was removed, instead by clicking on cart button a wonderful sidebar will appear (with nice animations too)

Also store can display more than 6 items per page now (6, 12, 18 or all items)

There were some accessibility improvements to the store

<script async src="https://telegram.org/js/telegram-widget.js?15" data-telegram-post="bitcartcc/5306" data-width="100%"></script>

### Quality of life improvements

- In case of API issues, admin panel and store now display a better page explaining how to resolve the issue together with detailed logs
- In admin panel tooltips were added on hover to all icons
- On store page there is a new button to quickly jump to view all invoices of a store (via new search engine)
- Better lists UI
- Added an easter egg!
- Automatically upgrade faulty libseccomp2 on rpi to make setup flawless

<script async src="https://telegram.org/js/telegram-widget.js?15" data-telegram-post="bitcartcc/5356" data-width="100%"></script>

### New library released: universalasync

We have released a new library under bitcartcc organization: `universalasync`. It allows library maintainers to write only async versions of their code, and sync version will be achieved automatically. Depending on call context, wrapped functions will either work as sync or async ones.

That's the same way our SDK has worked for quite a while, this functionality was extracted from SDK to a separate package.

Also the implementation was greatly improved, we now test all use cases and fixed some bugs.

### Other changes

- Postgres database in docker no longer sets a password: it accepts connections without any password set. This is fine because database is not exposed to the outside internet
- Added `py.typed` to SDK to allow type checkers to suggest better hints for user code
- Dropped leftovers of gzro coin
- We have rewritten many of our code to properly use event loop, therefore we can support python 3.7-3.10+ without issues
- All our test suites now run on testnet
- Our regtest tests now use fulcrum
- Fixed email notification provider and others that required integer types, also fixed broken notifications when changing notification providers
- Added `removelocaltx` command for bch-based coins and made bch daemon use official electron cash instead of our fork again
- Upgraded all packages
- Fixed backups
- New `get_tx_hash` RPC method to get tx hash of a raw tx
- Fixed worker start on Mac OS
