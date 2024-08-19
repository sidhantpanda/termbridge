const { merge } = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: "production",
  plugins: [
    new webpack.DefinePlugin({
      __API_HOST__: JSON.stringify('http://localhost:3000'),
    })
  ],
})