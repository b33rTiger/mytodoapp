var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
//Todos
var todoSchema = new Schema({
  item: { type: String, unique: true },
  _list: {type: Schema.Types.ObjectId, ref: 'List'},
  created_at: Date,
  updated_at: Date
})
var Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;