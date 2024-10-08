const path = require('path');
const toml = require('toml');
const yaml = require('yamljs');
const json5 = require('json5');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const finalPath = path.resolve(__dirname, 'dist');
const assetSource = path.resolve(__dirname, 'public', 'assets');
const assetDest = path.resolve(finalPath, 'assets');

console.log({
  finalPath,
  assetSource,
  assetDest,

})

module.exports = {
  entry: './src/index.tsx',
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      publicPath: '/',
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: "./tsconfig.json" // Path to your tsconfig.json
      }),
      // new CopyPlugin({
      //   patterns: [
      //     {
      //       from: assetSource,
      //       to: assetDest
      //     },
      //   ],
      // }),
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: finalPath,
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.toml$/i,
        type: 'json',
        parser: {
          parse: toml.parse,
        },
      },
      {
        test: /\.yaml$/i,
        type: 'json',
        parser: {
          parse: yaml.parse,
        },
      },
      {
        test: /\.json5$/i,
        type: 'json',
        parser: {
          parse: json5.parse,
        },
      },
    ],
  },
};
