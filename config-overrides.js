const { override, addWebpackPlugin } = require('customize-cra');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpack = require('webpack');

module.exports = override(
  // Add webpack bundle analyzer plugin
  addWebpackPlugin(new BundleAnalyzerPlugin()),
  // Add DefinePlugin for setting NODE_ENV
  addWebpackPlugin(new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }))
);
