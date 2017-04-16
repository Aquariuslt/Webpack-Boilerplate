/* Created by Aquariuslt on 16/04/2017.*/
import gulp from 'gulp';
import gutil from 'gulp-util';

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import webpackDevConfig from './config/webpack.dev.config.babel';

import logger from './util/logger';

gulp.task('serve', function () {
  logger.info('Webpack building.');
  let compilerConfig = webpack(webpackDevConfig);
  new WebpackDevServer(compilerConfig, webpackDevConfig.devServer)
    .listen(webpackDevConfig.devServer.port, webpackDevConfig.devServer.host, function (error) {
      if (error) {
        throw new gutil.PluginError('webpack', error);
      }
    });
});
