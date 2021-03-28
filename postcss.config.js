module.exports = {
  plugins: {
    autoprefixer: {},
    // https://github.com/evrone/postcss-px-to-viewport
    'postcss-px-to-viewport': {
      viewportWidth: 375,
      viewportHeight: 667,
      unitPrecision: 5,
      viewportUnit: 'vw',
      selectorBlackList: ['ignore'],
      mediaQuery: false,
      exclude: [/TabBar/]
    }
  }
}
