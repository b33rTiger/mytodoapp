var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var boardSchema = new Schema({
  board: [{type: Schema.Types.ObjectId, ref: 'List'}],
  name: { type: String, unique: true},
  description: String,
  created_at: Date,
  updated_at: Date
})

var Board = mongoose.model('Board', boardSchema);

module.exports = Board;