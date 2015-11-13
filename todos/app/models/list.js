var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var listSchema = new Schema({
  _board: {type: Schema.Types.ObjectId, ref: 'Board'},
  todos: [{type: Schema.Types.ObjectId, ref: 'Todo'}],
  name: { type: String, unique: true},
  description: String,
  created_at: Date,
  updated_at: Date
})

var List = mongoose.model('List', listSchema);

module.exports = List;