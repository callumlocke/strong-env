# strong-env

Tiny library for loading config from environment variables in Node.js/Bun with strong typing and validation. No dependencies.

## Why?

App configuration values are typically a mixture of strings, booleans and numbers. But environment variables are **always strings**. For example, `HTTPS=false` results in the string `"false"`, which can cause confusing bugs.

This library safely coerces environment variables into the correct types, throwing an error if any are missing or invalid.

## Installation

```sh
> npm install strong-env
# Also works with `bun`, `yarn`, `pnpm` etc.
```


## Usage

```ts
// e.g. app/config.ts

import env from 'strong-env'

export const USE_HTTPS = env.boolean('USE_HTTPS')
export const DB_PORT = env.port('DB_PORT', 3000)
export const API_HOSTNAME = env.string('API_HOSTNAME', 'https://localhost')
```

### Methods

- All methods accept a default value as a second argument.
  - The default is only used when the named environment variable is missing (`undefined` or `""`)
- If the required environment variable is present but **invalid**, an error is thrown (even if you provide a default).
- If the required environment variable is missing and you don't provide a default, an error is thrown.

#### boolean

Ensures it's a boolean.

- `"true"`, `"TRUE"` or `"1"` becomes `true`
- `"false"`, `"FALSE"` or `"0"` becomes `false`
- Anything else throws.

#### number

Ensures it's a finite number.

- `"123"` becomes `123`
- `"-123"` becomes `-123`
- `"5.5"` becomes `5.5`
- `"1e6"` becomes `1000000`
- `"Infinity"` or `"foo"` throws

#### integer

Like `number`, but also ensures it's an integer.

- `"123"` becomes `123`
- `"-123"` becomes `-123`
- `"5.5"` throws

#### port

Like `integer`, but also ensures it's a valid port number, i.e. `1` through `65535`.
- `"21"` becomes `21`
- `"3000"` becomes `3000`
- `"65535"` becomes `65535`
- `"99999"`, `"0"` and  `"-3000"` all throw

#### string

Ensures it's a non-empty string.

- `"foo"` becomes `"foo"`
- `""` throws


### Default type inference

If a default value with a different type is provided, the return type is inferrred accordingly:

```ts
env.port('PORT', null);   // number | null
```

### Custom source object

The default export is based on the `process.env` global (which works in both Node and Bun). If for some reason you want to use a different object as the source, you can do this:

```ts
import { load } from 'strong-env'

const myCustomEnv = { 'FOO': '1234' };

const env = load(myCustomEnv)

export const FOO = env.port('FOO')
```

The `load` function accepts any plain object typed the same as `process.env`: `{ [name: string]: string | undefined }`.

## Licence

MIT
