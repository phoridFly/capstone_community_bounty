import * as webpack from 'webpack';
import HtmlWebPackPlugin from 'html-webpack-plugin';

const config: webpack.Configuration = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    main: './src/index.tsx',
    silentRenew: './silentRenew/index.js',
  },
  output: {
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html',
      chunks: ['main'],
    }),
    new HtmlWebPackPlugin({
      template: './silentRenew/silentRenew.html',
      filename: 'silentRenew.html',
      chunks: ['silentRenew'],
    }),
  ],
};

export default config;