# node-nxlog [![Build Status](https://travis-ci.org/avz/node-nxlog.svg)](https://travis-ci.org/avz/node-nxlog)

## Installation

```
npm install nxlog
```

## API

- `nxlog.info(...)`
- `nxlog.warn(...)`
- `nxlog.log(...)`
- `nxlog.error(...)`
- `nxlog.inject(console)`

## Examples
```javascript
var nxlog = require('nxlog');

nxlog.info('Math.random()', Math.random(), Math.random());
nxlog.info('Path to this file', __filename);
nxlog.info('Current date', new Date());
nxlog.info('Memory usage', process.memoryUsage());
```

```
2015-03-04 20:40:48.100 UTC [INFO] Math.random() 0.5802670463453978 0.13026104355230927
2015-03-04 20:40:48.114 UTC [INFO] Path to this file /private/tmp/nxlog/strings.js
2015-03-04 20:40:48.115 UTC [INFO] Current date Wed Mar 04 2015 23:40:48 GMT+0300 (MSK)
2015-03-04 20:44:06.600 UTC [INFO] Memory usage Object { rss: 16203776, heapTotal: 9751808, heapUsed: 3901968 }
```

### Large objects

```javascript
var nxlog = require('nxlog');

nxlog.info('Dump of process.features', process.features);
```

```
2015-03-04 20:47:22.754 UTC [INFO] Dump of process.features
2015-03-04 20:47:22.754 UTC [INFO] ... Object { debug: false,
2015-03-04 20:47:22.754 UTC [INFO] ...   uv: true,
2015-03-04 20:47:22.754 UTC [INFO] ...   ipv6: true,
2015-03-04 20:47:22.754 UTC [INFO] ...   tls_npn: true,
2015-03-04 20:47:22.754 UTC [INFO] ...   tls_sni: true,
2015-03-04 20:47:22.754 UTC [INFO] ...   tls_ocsp: true,
2015-03-04 20:47:22.754 UTC [INFO] ...   tls: true }
```

### Exceptions

```javascript
var nxlog = require('nxlog');

nxlog.error(new Error('Some bad message'));
```

```
2015-03-04 20:49:42.735 UTC [ERROR] Error: Some bad message
2015-03-04 20:49:42.735 UTC [ERROR] ...     at Object.<anonymous> (/private/tmp/nxlog/exceptions.js:3:13)
2015-03-04 20:49:42.735 UTC [ERROR] ...     at Module._compile (module.js:460:26)
2015-03-04 20:49:42.735 UTC [ERROR] ...     at Object.Module._extensions..js (module.js:478:10)
2015-03-04 20:49:42.735 UTC [ERROR] ...     at Module.load (module.js:355:32)
2015-03-04 20:49:42.735 UTC [ERROR] ...     at Function.Module._load (module.js:310:12)
2015-03-04 20:49:42.735 UTC [ERROR] ...     at Function.Module.runMain (module.js:501:10)
2015-03-04 20:49:42.735 UTC [ERROR] ...     at startup (node.js:129:16)
2015-03-04 20:49:42.735 UTC [ERROR] ...     at node.js:814:3
```
