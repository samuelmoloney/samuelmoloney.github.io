const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');

module.exports = {
  entry: './src/scripts/background.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
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
  plugins: [
    // This will create an HTML file for each .html file in src/
    ...glob.sync('./src/pages/*.html').map((file) => new HtmlWebpackPlugin({
      template: file,
      filename:  path.join('pages', path.basename(file)),
      inject: true,
    })),
  ]
};