const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');

module.exports = {
  entry: {
    background:'./src/scripts/background.ts',
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'src/dist'),
  },
  target: 'web',
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  },
};