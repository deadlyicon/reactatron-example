var path = require('path');
var webpack = require('webpack');

var root  = __dirname

var browserJs = {
  entry: root+'/browser',
  output: {
    path: 'dist/public',
    filename: 'browser.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react', 'stage-0'],
          plugins: ['transform-runtime'],
          cacheDirectory: true
        }
      }
    ]
  },
};


var clientCss = {

};

module.exports = [
  // serverJs,
  browserJs,
  // browserCss,
]
