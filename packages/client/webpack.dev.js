const { merge } = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: "development",
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    port: 3000, // Add your desired port number here
    historyApiFallback: true
  },
  plugins: [
    new webpack.DefinePlugin({
      __API_HOST__: JSON.stringify('http://localhost:3001'),
      __WS_HOST__: JSON.stringify('ws://localhost:3001'),
    })
  ],
  optimization: {
    runtimeChunk: 'single',
  },
});
