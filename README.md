# strong-env

Tiny Node.js library to for coercing environment variables into strongly typed values.

## Installation

```sh
> npm install strong-env
```

## Usage

```ts
// e.g. config.ts

import env from 'strong-env'

export const USE_HTTPS = env.boolean('USE_HTTPS')

export const DB_PORT = env.port('DB_PORT', 3000)

export const API_HOSTNAME = env.string('API_HOSTNAME', 'https://localhost')
```

- Each method automatically validates and coerces the value to the appropriate type.
- You can provide a default value as a second argument, which will be returned if the specified env var is empty. If no default value is provided _and_ the specified env var is empty, it throws a `TypeError`.
  - An env var is considered 'empty' if its value is `undefined` _or_ an empty string.
- If the environment variable is set to something invalid for the method you're using (such as `0` when using `env.port`), it will always throw an error (even if you provide a default value).

### Methods

– `env.port(name: string, fallback?: any)`

- `env.boolean(name: string, fallback? any)`
  - Acceptable values: `"true"`, `"false"`, `"1"`, `"0"`.
  - Returns a `boolean`.


### Default types

Default values can be `any` type. In most cases, it probably makes sense to stick to using whatever type is appropriate for whatever method you're using, but in some cases it may be useful to use a fallback value of another type, such as `null`.

In TypeScript, the return type of each method automatically includes the type of your second argument, if given:

```ts
env.port('PORT');        // number
env.port('PORT', 3000);  // number
env.port('PORT', null);  // number | null
env.port('PORT', 'hm');  // number | string
```

### Advanced: custom source object

The default export is based on the `process.env` global. If for some reason you want to use a different object as the source, you can do this:

```ts
import { load } from 'strong-env'

const myEnvVars = {
  'FOO': '123',
};

const env = load(myEnvVars)
```

The `load` function accepts any plain object in the same shape as `process.env`: `{ [name: string]: string | void }`.
