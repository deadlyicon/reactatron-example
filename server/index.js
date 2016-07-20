require('../config/environment')
import express from 'express'

const PUBLIC_DIR = __dirname + '/public';
console.log('PUBLIC_DIR', PUBLIC_DIR)
const server = express()

export { server }

server.set('port', process.env.PORT || 3000);



// if (ENV.NODE_ENV === "development"){
//   var webpack = require("webpack");
//   var webpackDevMiddleware = require("webpack-dev-middleware");
//   var webpackConfig = require("../webpack.config")
//   var compiler = webpack(webpackConfig);
//   app.use(webpackDevMiddleware(compiler, {}));
// }


server.use(express.static(PUBLIC_DIR));

server.get('/*', (request, response) => {
  response.sendFile(PUBLIC_DIR+'/index.html');
});

server.start = (callback) => {
  server.listen(server.get('port'), () => {
    console.log('starting server at http://localhost:'+server.get('port'))
    if (callback) callback(server);
  });
};

server.start()
