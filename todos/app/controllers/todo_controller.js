var path = require('path'),
    bodyParser = require('body-parser');

var Todo = require('../models/todo');
var List = require('../models/list');

//Index
exports.index = function (req, res) {
  var list_id = req.query.listId;
  Todo.find({_list: list_id})
  .populate('_list')
  .exec(function (error, todos) {
    if (todos) {
    res.json(todos)
    } else if (error) {
      console.error(error.stack);
      res.redirect('/error');
    }
  })
}

//Create
exports.create = function (req,res) {
  var listId = req.body.listId;
  var todo = new Todo ({item: req.body.name, _list: listId});
  todo.save(function (error, todo) {
    if (todo) {
      Todo.find({_list: listId}, function (error, todos) {
        if (todos) {
          res.json(todos)
        } else if (error) {
          console.error(error.stack);
          res.redirect('/error');
        }
      })
    }
  })
}

//Edit
exports.edit = function (req,res) {
  var listId = req.body.listId;
  var todo = {_id: req.params.todo_id}
  Todo.update(todo, {item: req.body.item}, function (error, todo) {
    if (todo) {
      Todo.find({_list: listId}, function (error, todos) {
        res.json(todos)
      })
    } else if (error) {
      console.error(error.stack);
      res.redirect('/error');
    }
  })
}

//Destroy
exports.destroy = function (req,res) {
  var listId = req.body.listId;
  var todo = new Todo ({_id: req.params.todo_id})
  todo.remove(function (error, todo) {
    if (todo) {
      Todo.find({_list: listId}, function (error, todos) {
        if (todos) {
          res.json(todos)
        } else if (error) {
          console.error(error.stack);
          res.redirect('/error');
        }
      })
    }
  })
}