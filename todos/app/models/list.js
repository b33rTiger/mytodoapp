var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var listSchema = new Schema({
  todos: [{type: Schema.Types.ObjectId, ref: 'Todo'}],
  name: { type: String, unique: true},
  description: {type: String, unique: true},
  created_at: Date,
  updated_at: Date
})

var List = mongoose.model('List', listSchema);

module.exports = List;