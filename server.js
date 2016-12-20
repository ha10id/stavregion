// modules =================================================
  var express         = require('express');
  var favicon         = require('serve-favicon');
  var app             = express();
  var mongoose        = require('mongoose');
  var bodyParser      = require('body-parser');
  var methodOverride  = require('method-override');
  var morgan          = require('morgan');
  var multipart       = require('connect-multiparty');
  var errorHandler    = require('errorhandler');

  var routes = require('./routes');
  var api    = require('./routes/api');

  var http   = require('http');
  var path   = require('path');

// configuration ===========================================
  var db = require('./config/db');
  mongoose.Promise = global.Promise; // remove warning DeprecationWarning: Mongoose: mpromise ...
  mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)

// all environments
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(favicon(__dirname + '/public/img/26.ico'));

  app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
  app.use(morgan('dev'));                                         // log every request to the console
  app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
  app.use(bodyParser.json());                                     // parse application/json
  app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
  app.use(bodyParser.json({ uploadDir: 'public/uploads' }));
  app.use(multipart({uploadDir: 'public/uploads'}));
  app.use(methodOverride());

  var env = process.env.NODE_ENV || 'development';
// development only
  if (env === 'development') {
    app.use(errorHandler());
  }
// production only
  if (env === 'production') {
    // TODO
  }

// Routes ==================================================
  app.get('/', routes.index);
  app.get('/partials/:name', routes.partials);
  app.post('/upload', api.upload);
// JSON API
  // app.get('/api/posts', api.posts);
  // app.get('/api/post/:id', api.post);
  // // app.post('/api/menu', api.addMenu);
  // app.put('/api/menuchildren/:id', api.addMenuChildren);
  // app.get('/api/menu', api.listMenu);
  app.get('/api/news', api.listNews);
  app.get('/api/news/:id', api.news);
  app.get('/api/regions', api.listRegions);
  app.get('/api/listsimple', api.listSimpleNews);
  // app.put('/api/post/:id', api.editPost);
  // app.delete('/api/post/:id', api.deletePost);
  // app.get('*', routes.index);
  app.get('*', routes.index);
// Start Server =============================================

  http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
  });
