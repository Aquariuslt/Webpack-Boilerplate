/* Created by Aquariuslt on 14/04/2017.*/
import webpack from 'webpack';
import merge from 'webpack-merge';
import webpackBaseConfig from './webpack.base.config.babel';

import ExtractTextPlugin from 'extract-text-webpack-plugin';
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';

import devConfig from './dev.config';
import pathUtil from '../util/path-util';

let webpackDevConfig = merge(webpackBaseConfig, {
  devtool: 'source-map',
  output: {
    path: devConfig.output.path,
    publicPath: devConfig.output.publicPath,
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].bundle.js.map',
    chunkFilename: '[id].chunk.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            pathUtil.root('node_modules')
          ) === 0
        );
      }
    }),
    new ExtractTextPlugin({
      filename: '[name].bundle.css'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin()
  ],
  devServer: {
    host: devConfig.devServer.host,
    port: devConfig.devServer.port,
    historyApiFallback: true,
    quiet: false,
    noInfo: true,
    stats: {
      assets: false,
      colors: true,
      version: false,
      hash: false,
      children: false,
      timings: true,
      chunks: true,
      chunkModules: false
    },
    publicPath: devConfig.output.publicPath
  }
});

export default webpackDevConfig;
