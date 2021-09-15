const mongoose = require('mongoose');
const Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

let Comments = new Schema({
  postId: {
    type: ObjectId
  },
  author : {
    type : ObjectId
  },
  comment : {
    type : String
  },
  date : {
    type : Date,
    default : new Date()
  }
},{
    collection: 'Comments'
});

module.exports = mongoose.model('Comments', Comments);