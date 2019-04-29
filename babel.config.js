module.exports = api => {
  api.cache(true)

  const presets = [
    [
      '@babel/env',
      {
        targets: { node: 8 },
      },
    ],
    '@babel/typescript',
  ]
  const plugins = []

  return {
    ignore: ['**/*.test.ts'],
    presets,
    plugins,
  }
}
