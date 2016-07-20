var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

var root  = __dirname

// this lists all node_modules as external so they dont
// get packaged and the requires stay as is.
// http://jlongster.com/Backend-Apps-with-Webpack--Part-I
var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });


var sourceMapSupperBannerPlugin = new webpack.BannerPlugin(
  'require("source-map-support").install();',
  { raw: true, entryOnly: false }
)


var serverJs = {
  context: root+'/server',
  entry: root+'/server/index.js',
  target: 'node',
  output: {
    path: root+'/dist',
    filename: 'server.js',
  },
  devtool: 'sourcemap',
  externals: nodeModules, // dont bundle any node_modules
  plugins:  [
    sourceMapSupperBannerPlugin,
    new webpack.IgnorePlugin(/\.(css|less)$/)
  ],
  module: {
    loaders: [
      {
        test: /.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0'],
          plugins: ['transform-runtime'],
          cacheDirectory: true
        }
      }
    ]
  },
}

var browserJs = {
  context: root+'/browser',
  entry: root+'/browser/index.js',
  output: {
    path: root+'/dist/public',
    filename: 'browser.js',
    publicPath: '/'
  },
  devtool: 'sourcemap',
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
  serverJs,
  browserJs,
  // browserCss,
]
