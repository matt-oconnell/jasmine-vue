/* eslint-env node */

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    main: './src/index.js',
  },
  output: {
    filename: 'jasmine-vue.js',
    path: __dirname + '/dist/',
  },
  target: 'web',
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader' },
    ],
  },
};
