
# docvy-updater

> Check for updates for Docvy application

[![Build Status](https://travis-ci.org/docvy/updater.svg?branch=develop)](https://travis-ci.org/docvy/updater) [![Coverage Status](https://coveralls.io/repos/docvy/updater/badge.svg)](https://coveralls.io/r/docvy/updater)


## installation:

```bash
⇒ npm install docvy/updater#develop
```

## API

```js
var updater = require("docvy-updater");
```

### updater.check(callback)

Checks for new versions of the application

* `callback` (Function): called once check is complete
  * signature: `callback(err, info)`
  * `info` is [version information](#info)


<a name="info"></a>
### version information:

Information about the **latest** version of the application.

Sample:

```js
{
  version: "0.100.0",
  changes: {
    major: false,
    minor: true,
    bug: false
  },
  news: "fixes plugin hang"
}
```

* `version` (String): semver-conforming version tag
* `changes` (Object): *(more of a convenience than need)*
* `changes.major` (Boolean): `true` if API changes occurred
* `changes.minor` (Boolean): `true` if features were added
* `changes.bug` (Boolean): `true` if bugs were fixed
* `news` (String): details on the version


## license:

**The MIT License (MIT)**

Copyright (c) 2015 Forfuture LLC <we@forfuture.co.ke>
Copyright (c) 2015 GochoMugo <mugo@forfuture.co.ke>

