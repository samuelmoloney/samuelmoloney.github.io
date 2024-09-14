const path = require('path');

module.exports = {
  entry: {
    background:'./src/scripts/p5-sketch.ts',
    app: './src/react/index.tsx',  
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'src/dist'),
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
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
};