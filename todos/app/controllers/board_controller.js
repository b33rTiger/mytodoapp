var path = require('path'),
    bodyParser = require('body-parser');

var Todo = require('../models/todo');
var List = require('../models/list');
var Board = require('../models/board');

//Index
exports.index = function (req, res) {
  Board.find({}, function (error, boards) {
    if (boards) {
    res.json(boards)
    } else if (error) {
      console.error(error.stack);
      res.json({status: 400, message: error.message});
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
  var board = new Board ({name: req.body.name, description: req.body.description})
  board.save(function (error, board) {
    if (board) {
      Board.find({}, function (error, boards) {
        if (boards) {
          res.json(boards)
        } else if (error) {
          console.error(error.stack);
          res.json({status: 400, message: error.message});
        }
      })
    }
  })
}

//Edit
// exports.edit = function (req,res) {
//   var list = {_id: req.params.list_id}
//   console.log(req.body.name);
//   List.update(list, {name: req.body.name}, function (error, list) {
//     if (list) {
//       List.find({}, function (error, lists) {
//         res.json(lists)
//       })
//     } else if (error) {
//       console.error(error.stack);
//       res.redirect('/error');
//     }
//   })
// }

//Destroy
// exports.destroy = function (req,res) {
//   console.log(req.params.list_id);
//   var todo = new Todo ({_list: req.params.list_id})
//   todo.remove(function (error, todo) {
//     if (todo) {
//     var list = new List ({_id: req.params.list_id})
//     list.remove(function (error, list) {
//       if (list) {
//         List.find({}, function (error, lists) {
//           if (lists) {
//             res.json(lists)
//           } else if (error) {
//             console.error(error.stack);
//             res.redirect('/error');
//           }
//         })
//       }
//     })
//     }
//   })
// }