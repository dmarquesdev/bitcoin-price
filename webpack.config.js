const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const sourcePath = path.join(__dirname, 'src');
const buildPath = path.join(__dirname, 'public');

module.exports = {
  context: sourcePath,
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './index.jsx',
  ],
  devtool: 'source-map',
  output: {
    path: buildPath,
    filename: 'js/bundle.js',
    publicPath: '/',
  },
  devServer: {
    contentBase: buildPath,
    headers: { 'Access-Control-Allow-Origin': '*' },
    hot: true,
    inline: true,
    port: 3000,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot-loader/webpack'],
        exclude: /node_modules/,
      },

      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['stage-0', 'react', 'env'],
        },
      },

      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 10000000,
        },
      },

      {
        test: /\.(png|jpg|gif|jpeg|bmp)$/,
        loader: 'url-loader',
        query: {
          limit: 10000000,
        },
      },

      {
        test: /\.scss$/,
        use: ['css-hot-loader' ].concat(ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
            },
            {
              loader: 'postcss-loader',
            },
            {
              loader: 'sass-loader',
            },
          ],
        })),
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].css',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],

  resolve: {
    extensions: ['.js', '.json', '.jsx', '*']
  },
};