var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

require('./config/environment')


if (process.env.NODE_ENV === 'development'){
  require('dotenv').load();
}

var root  = __dirname

var processDotEnvPlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV:  JSON.stringify(process.env.NODE_ENV),
    PORT:      JSON.stringify(process.env.PORT),
    APP_ROOT:  JSON.stringify(process.env.APP_ROOT),
    DIST_PATH: JSON.stringify(process.env.DIST_PATH),
  }
})


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
  target: 'node',
  node: {
    __filename: false,
    __dirname: false
  },
  console: true,
  process: true,

  context: root+'/server',
  entry: root+'/server/index.js',
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
  entry: {
    browser: root+'/browser/index.js',
  },
  output: {
    path: root+'/dist/public',
    filename: "[name].js",
    chunkFilename: "[id].js",
    publicPath: '/'
  },
  devtool: 'sourcemap',
  plugins: [
    new ExtractTextPlugin('[name].css')
  ],
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
      },
      {
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract("style", "css!sass")
      }
    //   {
    //     test: /\.css$/,
    //     loader: ExtractTextPlugin.extract("style", "css")
    //   },
    //   {
    //     test: /\.(scss|sass)$/,
    //     // loaders: ["style", "css?sourceMap", "sass?sourceMap"]
    //     // loader: ExtractTextPlugin.extract("style", "css?sourceMap", "sass?sourceMap")
    //     loader: ExtractTextPlugin.extract("style", "css", "sass?sourceComments")
    //   }
    ]
  },
};


// var browserCss = {
//   context: root+'/browser/view/styles',
//   entry: root+'/browser/view/styles/index.sass',
//   output: {
//     path: root+'/tmp',
//     filename: "[name].jz",
//     chunkFilename: "[id].jz"
//   },
//   // devtool: 'sourcemap',
//   plugins: [
//     new ExtractTextPlugin(root+'/dist/public/browser.css', {
//       allChunks: true
//     })
//   ],
//   module: {
//     loaders: [
//       {
//         test: /\.css$/,
//         loader: ExtractTextPlugin.extract("style", "css")
//       },
//       {
//         test: /\.(scss|sass)$/,
//         // loaders: ["style", "css?sourceMap", "sass?sourceMap"]
//         // loader: ExtractTextPlugin.extract("style", "css?sourceMap", "sass?sourceMap")
//         loader: ExtractTextPlugin.extract("style", "css", "sass?sourceComments")
//       }
//     ]
//   },
//   sassLoader: {
//     // includePaths: [path.resolve(__dirname, "./some-folder")]
//   }
// };

module.exports = [
  serverJs,
  browserJs,
  // browserCss,
]
