var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var memberSchema = new Schema({
  board: [{type: Schema.Types.ObjectId, ref: 'board'}],
  name: { type: String, unique: true},
  email: {type: String, unique: true},
  password: String,
  created_at: Date,
  updated_at: Date
})

var Member = mongoose.model('Member', boardSchema);

module.exports = Member;