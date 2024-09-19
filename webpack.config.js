const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    utils: './src/utils/index.ts',
    background:'./src/scripts/p5-sketch.ts',
    app: './src/react/index.tsx',  
  },
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist/'),
    clean: true, 
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        defaultVendors: false,
        background: {
          test: /[\\/]background[\\/]/,
          name: 'background',
          priority: 40,
          enforce: true,
        },
        app: {
          test: /[\\/]app[\\/]/,
          name: 'app',
          priority: 30,
          enforce: true,
        },
      },
    },
  },
  target: 'web',
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
      },
      
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Use the custom HTML template
    }),
  ],
};