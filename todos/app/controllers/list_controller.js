var path = require('path'),
    bodyParser = require('body-parser');

var Todo = require('../models/todo');
var List = require('../models/list');
var Board = require('../models/board');

//Index
exports.index = function (req, res) {
  var board_id = req.param('boardId');
  List.find({_board: board_id})
  .populate('todos')
  .exec(function (error, lists) {
    if (lists) {
      res.json(lists)
    } else if (error) {
      console.error(error.stack);
      res.redirect('/error');
    }
  })
}

//Show
// exports.show = function (req, res) {
//   List.find({}, function (error, lists) {
//     if (lists) {
//       console.log(lists);
//     res.json(lists)
//     } else if (error) {
//       console.error(error.stack);
//       res.redirect('/error');
//     }
//   })
// }

//Create
exports.create = function (req,res) {
  var boardId = req.body.boardId;
  var list = new List ({name: req.body.name, _board: boardId});
  list.save(function (error, list) {
    if (list) {
      res.json(list)
    } else if (error) {
      console.error(error.stack);
      res.json({status: 400, message: error.message});
    }
  })
}

//Edit
exports.edit = function (req,res) {
  var list = {_id: req.params.list_id}
  List.update(list, {name: req.body.name}, function (error, list) {
    if (list) {
      List.find({}, function (error, lists) {
        res.json(lists)
      })
    } else if (error) {
      console.error(error.stack);
      res.redirect('/error');
    }
  })
}

//Destroy
exports.destroy = function (req,res) {
  var todo = new Todo ({_list: req.params.list_id})
  todo.remove(function (error, todo) {
    if (todo) {
    var list = new List ({_id: req.params.list_id})
    list.remove(function (error, list) {
      if (list) {
        console.log(list);
        res.json(list)
      } else if (error) {
          console.error(error.stack);
          res.redirect('/error');
        }
    })
    }
  })
}