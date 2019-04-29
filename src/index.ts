/* eslint-disable @typescript-eslint/no-explicit-any */

interface RawEnv {
  [key: string]: string | undefined
}

interface StrongEnv {
  boolean(name: string): boolean
  boolean<Default>(name: string, defaultValue: Default): boolean | Default

  string(name: string): string
  string<Default>(name: string, defaultValue: Default): string | Default

  number(name: string): number
  number<Default>(name: string, defaultValue: Default): number | Default

  integer(name: string): number
  integer<Default>(name: string, defaultValue: Default): number | Default

  port(name: string): number
  port<Default>(name: string, defaultValue: Default): number | Default
}

export const load = (rawEnv: RawEnv): StrongEnv => {
  const strongEnv: StrongEnv = {
    boolean: (name: string, defaultValue?: any) => {
      const value = rawEnv[name]

      if (typeof value === 'string' && value.length > 0) {
        switch (value) {
          case 'false':
          case '0':
            return false

          case 'true':
          case '1':
            return true

          default:
            throw new TypeError(
              `Expected env var ${JSON.stringify(
                name,
              )} to be set to one of the following: "true", "false", "1", "0"`,
            )
        }
      }

      if (defaultValue !== undefined) return defaultValue

      throw new TypeError(`Missing environment variable: ${name}`)
    },

    string: (name: string, defaultValue?: any) => {
      const value = rawEnv[name]

      if (typeof value === 'string' && value.length > 0) return value

      if (defaultValue !== undefined) return defaultValue

      throw new TypeError(`Missing environment variable: ${name}`)
    },

    number: (name: string, defaultValue?: any) => {
      const value = rawEnv[name]

      if (typeof value === 'string') {
        const result = Number.parseFloat(value)
        if (Number.isFinite(result)) return result
        throw new TypeError(
          `Expected environment variable to be set to a finite number: ${name}`,
        )
      }

      if (defaultValue !== undefined) return defaultValue

      throw new TypeError(`Missing environment variable: ${name}`)
    },

    integer: (name: string, defaultValue?: any) => {
      const value = rawEnv[name]

      if (typeof value === 'string') {
        const result = Number.parseFloat(value)

        if (Number.isInteger(result)) return result

        throw new TypeError(
          `Expected environment variable to be set to an integer: ${name}`,
        )
      }

      if (defaultValue !== undefined) return defaultValue

      throw new TypeError(`Missing environment variable: ${name}`)
    },

    port: (name: string, defaultValue?: any) => {
      const value = rawEnv[name]

      if (typeof value === 'string') {
        const result = Number.parseFloat(value)

        if (Number.isInteger(result) && result >= 1 && result <= 65535) {
          return result
        }

        throw new TypeError(
          `Expected environment variable to be set to a valid port number (1-65535): ${name}`,
        )
      }

      if (defaultValue !== undefined) return defaultValue

      throw new TypeError(`Missing environment variable: ${name}`)
    },
  }

  return Object.freeze(strongEnv)
}

export default load(process.env)
