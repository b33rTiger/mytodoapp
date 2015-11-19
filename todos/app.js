var express = require('express'),
  _ = require('lodash'),
  app = express(),
  router = express.Router(),
  path = require('path'),
  bcrypt = require('bcrypt-nodejs'),
  jwt    = require('jsonwebtoken'),
  bodyParser = require('body-parser');

app.set('superSecret', 'beerybeerbeer');

//Database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todos');

//Models
var Todo = require('./app/models/todo');
var List = require('./app/models/list');
var Board = require('./app/models/board');
var Member = require('./app/models/member');

//Controllers
var TodoController = require('./app/controllers/todo_controller.js');
var ListController = require('./app/controllers/list_controller.js');
var BoardController = require('./app/controllers/board_controller.js');
var MemberController = require('./app/controllers/member_controller.js');
var AuthenticationController = require('./app/controllers/authentication_controller.js');

var AuthenticationMiddleware = require('./app/authentication_middleware');


//body-parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//Allow cross-site
app.use(function (req,res,next){
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
  next();
});


//Routes
app.post('/api/members/signup', MemberController.signUpPost);
app.post('/api/members/login', MemberController.login);
//Index
// app.use('/api', AuthenticationMiddleware.authenticate);
// app.post('/authenticate', AuthenticationController.authenticate);
app.get('/api/todos', TodoController.index);
app.get('/api/lists', ListController.index);
app.get('/api/boards/:ownerId', BoardController.index);

//Create
app.post('/api/todos', TodoController.create);
app.post('/api/lists', ListController.create);
app.post('/api/boards/:ownerId', BoardController.create);

//Edit
app.post('/api/edit/:todo_id', TodoController.edit);
app.post('/api/edit/lists/:list_id', ListController.edit);

//Delete
app.post('/api/delete/board/:ownerId', BoardController.destroy);
app.post('/api/delete/:todo_id', TodoController.destroy);
app.post('/api/delete/list/:list_id', ListController.destroy);

//Server
app.listen(3000);
console.log('Listening to port 3000');

exports.app = app;