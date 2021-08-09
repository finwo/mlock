# nlock

Thread-wide named locks

> **Please Note:** Due to the very limited scope of this module, I do not anticipate needing to make very many changes to it.  Expect long stretches of zero updates—that does not mean that the module is outdated.

## Motivation

While it's usually a bad idea to write code in such a way that may be unsafe for
usage in multiple threads/workers, sometimes you won't be able to work around
it.

For such cases, you need some form of locking mechanism, which is what this
package provides.

## Installation

Use your favorite package manager to install it from [npmjs](https://npmjs.com).
I'll be using `npm` in the examples in this readme.

```bash
npm install --save nlock
```

## Usage

```javascript

// Use the import syntax
import { lock, unlock } from 'nlock';

// Or use commonjs import
const nlock = require('nlock');

// Acquire a lock
await lock('lockname');

// YOUR THREAD-UNSAFE CODE HERE

// Release the lock
unlock('lockname');
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
