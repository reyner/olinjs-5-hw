
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose')
  , Facebook = require('facebook-node-sdk');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.cookieParser('coffee'));
  app.use(express.session());
  app.use(Facebook.middleware({ appId: '183589414998540', secret: '6d2efbf9c52e69ad1afa1817d9e57c8b' }));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.methodOverride());
});

app.configure('development', function(){
  app.use(express.errorHandler());
  mongoose.connect(process.env.MONGOLAB_URI || 'localhost');
});

app.get('/', Facebook.loginRequired(), routes.index);
app.get('/users', user.list);
app.get('/users/delete_all', user.delete_all);
app.post('/users/personalize', user.personalize);
app.get('/profile/:user', Facebook.loginRequired(), routes.profile);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
