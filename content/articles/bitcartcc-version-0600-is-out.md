---
title: BitcartCC Version 0.6.0.0 is out!
img: https://github.com/bitcartcc/bitcart-blog/raw/master/assets/img/bitcartcc-0600.png
author: MrNaif2018
category: releases
createdAt: "2021-09-21T16:35:48"
---

BitcartCC Version 0.6.0.0 is out! ARM support, backups support, electrum 4.1 and many refactors, bugfixes, quality of life improvements for better BitcartCC!

### Major update

This update contains backwards-incompatible changes

This time we have included the changes from all BitcartCC repositories since previous version

### Breaking: unifying data directory

The app stores all it's data in one directory instead of separate directories within source code. This makes it work without permission errors.

With docker deployment only the datadir volume could be backed up, also it's separated from source tree now

This removes unnecessary volume mounts in compose dir, now all data is stored in named docker volumes. Also removes conf directory mounting and many fixes applied before, as it is actually not required now

This means that logs and images are not moved into new directory by default.

At docker deployment `bitcart_datadir` volume now stores all the data, `bitcart_logs` volume is removed, `compose/images` directory and `compose/conf` directory are not used anymore.

### Multiarch support (ARM images now available)

Now we build all images for 3 architectures: amd64, arm32, arm64. This allows running BitcartCC on a Raspberry Pi and other portable devices.

We have updated all our docker components, not only main BitcartCC parts

bitcartcc/docker-gen gained arm support, updated with upstream changes to 0.7.7

updated bitcartcc/tor to 0.4.6.5 with arm support

bitcartcc/docker-compose was moved to bitcartcc/bitcart-docker-deps repo and updated to 1.28.6

Usually building images for ARM takes a while when being run in a emulation, but we found a solution:

We build amd64 image on amd64 machine without emulation, and in the same time arm64 machine on CI builds arm64 image without emulation and arm32
image with emulation, but this emulation provides minimal performance penalties, images are built in parallel with `docker buildx`.
After that, images are united into one tag with `docker buildx imagetools`, so that when pulling a release the right image gets chosen.

So if you are on a raspberry pi, same instructions as on regular servers apply, and everything will just work.

### Backups support

The long-awaited feature is there! All deployments now have `backup.sh` and `restore.sh` scripts performing backup and restore operations

Example:

`BACKUP_PROVIDER=scp SCP_TARGET=user@someip:backups ./backup.sh`

On another machine with ip `someip`:

`./restore.sh 20210918-220925-backup.tar.gz`

Will restore the identical state of your instance.

You can also perform manual backups from server management->backups page by just a click of a button.
Backup settings, like provider and environment variables are also configured here.

Current supported backup providers: local (save on local machine), scp (send via ssh to any machine), s3 (send to AWS s3)

You can also schedule backups, by default it is off. They are performed in one of selected frequencies: daily, weekly, monthly.

The app will store the remaining time by itself even after restarts.

All backup operations are also logged to server logs.

<script async src="https://telegram.org/js/telegram-widget.js?15" data-telegram-post="bitcartcc/5011" data-width="100%"></script>

<script async src="https://telegram.org/js/telegram-widget.js?15" data-telegram-post="bitcartcc/5012" data-width="100%"></script>

<script async src="https://telegram.org/js/telegram-widget.js?15" data-telegram-post="bitcartcc/5016" data-width="100%"></script>

<script async src="https://telegram.org/js/telegram-widget.js?15" data-telegram-post="bitcartcc/5017" data-width="100%"></script>

<script async src="https://telegram.org/js/telegram-widget.js?15" data-telegram-post="bitcartcc/5025" data-width="100%"></script>

### Electrum 4.1 upgrade and various core daemon refactors and improvements

This is our scheduled upgrade of electrums from 4.0 series to 4.1 series

Breaking changes in electrum:

- Lightning gossip is not enabled by default as before, instead trampoline routing is used. You can enable gossip back by setting `COIN_LIGHTNING_GOSSIP` variable to true
- When invoice is paid, it's status is no longer `Paid`, but `Unconfirmed`. Invoice becomes `Paid` after first confirmation. This allows us to implement `transaction_speed` setting in a better way

Important changes in electrum:

- Deterministic lightning keys added. This means that you can't run two nodes on the same server with same seeds, because node_id would be the same. Important note: deterministic node id is enabled only for native segwit wallets created/restored from electrum seed (xprv won't work).
- Signet support added
- All lightning commands now have l tag, which allows us to provide better exceptions for lightning methods

Other changes related to electrum upgrade:

- Added tests for lightning payments to ensure they also work
- Improved handling of invoices, query only needed statuses, removed problem with first confirmation not always appearing
- Hide logging errors from electrum when not in debug mode
- Disabled rpc in electrumx and also removed ignore asyncio warnings in tests
- Implemented graceful stopping for all daemons
- Improved fee estimates handling

Together with electrum upgrades, BCH-based coins have gained some more feature-parity with btc-based coins:

- Removed lockfile creation for bch, it can now run in parallel with electron cash wallet
- Added feerate support for bch-based coins

### Important: deprecated lunanode installer

Our lunanode installer at https://launch.bitcart.ai is deprecated. Use BitcartCC configurator instead, it is more feature-complete and can install
BitcartCC on any server. We might add some hosting provider presets to configurator in the future/
The lunanode installer will be removed with the next BitcartCC major release: 0.7.0.0. It will then redirect to the configurator.

<script async src="https://telegram.org/js/telegram-widget.js?15" data-telegram-post="bitcartcc/5022" data-width="100%"></script>

### Many core daemons and invoice processing improvements

- Daemon refactor: it's settings are now passed as cli args. i.e. you can't use `setconfig("lightning",False)` and disable lightning if it was enabled via env var
- Added new `verified_tx` event, called when tx got it's first confirmation
- Experimental: `get_tx` SDK method (`get_transaction` daemon method) now supports `use_spv` flag to use SPV verification for getting confirmations, this works on all electrumx servers without verbose mode errors, but it is experimental because it is inefficient, we are waiting for electrum protocol 1.4
- Use coingecko for btc with tor as it no longer blocks tor exit nodes
- New `getaddressbalance_wallet` RPC method which gets address balance via local wallet balance and not network
- It is now possible to override daemon exception spec in other coins to extend it with custom errors
  So there are now two specs: base spec, by default btc.json for all coins, and the current coin spec, if used. Changing base spec may be useful for adding coins like ethereum
- `WalletNotLoadedError` is now properly raised by the daemon instead of not-easy-to-understand `KeyError`
- Commands which require wallet are now properly checked
- Fixed daemon xpub parsing
- Daemons are now properly documented
- Now `BaseDaemon` contains only base code common for all daemons, like config loading, and `BTCDaemon` contains code for electrum-based coins, it is useful for adding completely custom coins not based on electrum
- Fixed rare bug with event processing order for sync clients
- Fixed issue with IPN sending on `transaction_speed` >= 1 and added functional tests for it

### Added new coin: XRG

Added Ergon (XRG, port 5005) via it's electron cash fork oregano:
https://ergon.moe
https://ergon.moe/prop-reward.pdf

It is a fork with BCH with stable price. It is achieved by making the block reward proportional to the cost of producing a block. Earning a single unit of the currency by mining takes a fixed amount of effort.

### SDK improvements

- Use current package version in SDK docs
- SDK now doesn't crash on None rates
- Emulate `asyncio.run` behaviour, allow starting/stopping websockets in idle unlimited number of times
- Better error handling, no try/except required, all errors are logged instead, load_wallet can handle currencies case-insensitively

### BitCCL improvements

BitCCL is getting prepared for being integrated into BitcartCC in following releases.

Better, more secure compiler
It can now be used without issues even with untrusted code which tries to bypass the passed context, export only needed functions

### Quality of life improvements

The toolbar on admin panel is now unified. On desktop the left navigation bar doesn't open anymore, as it is replaced by main toolbar. On mobile the left navigation bar is now useful and contains links for navigation (before configurator link wouldn't fit in screen)
When logged in, it shows same links as before. When not logged in it shows configurator (if allowed by server policies), login and register buttons
Datatables are more responsive too now

Other improvements:

- Display fiat currency in balance stats instead of ephermal sum of balances, it is configurable in the profile page
- Support for custom payment methods labels, this is configurable via `label` field of a wallet
- Better reponsibility on mobile

<script async src="https://telegram.org/js/telegram-widget.js?15" data-telegram-post="bitcartcc/5003" data-width="100%"></script>

<script async src="https://telegram.org/js/telegram-widget.js?15" data-telegram-post="bitcartcc/5006" data-width="100%"></script>

<script async src="https://telegram.org/js/telegram-widget.js?15" data-telegram-post="bitcartcc/5009" data-width="100%"></script>

### BitcartCC CLI is now included in docker deployments

You can access it with `bitcart-cli.sh` script, like so:

`./bitcart-cli.sh help`

It requires a running `worker` container

### Maintenance and other improvements

- We have disabled dependabot (spammy) on all our repositories and enabled renovate instead.
  https://github.com/bitcartcc/renovate-config is our global config repository
- Many improvements to circleci pipeline: now test results and artifacts are uploaded
- Install bitcoind from PPA in CI for tests to improve build times greatly
- Integrate `pre-commit` for better contribution experience, and to modernize and unify our codebase
- https://github.com/bitcartcc/bitcartcc-orb
  created to reduce duplication across our repos, can be used by others in circleci to efficiently build multiarch images and not only that
- Updated to Node 14 LTS in node-based images
- Many package upgrades, fixing some security issues found in them
- Added new `tor-relay` component allowing you to run your own tor relay as part of bitcartcc deployment and to support tor network
- Our go cli now supports specifying custom daemon url instead of defaults, uses our spec to show more readable exception messages and is built by our CI now
- Fix invoice products access control security issue
- We now use batch inserts where possible to improve performance on e.g. stores with many wallets connected

### Migration guide

Even though the update contains many changes, all changes should be applies automatically.

Run `contrib/upgrades/upgrade-to-0600.sh` upgrade helper to move your existing logs and images if you need it
