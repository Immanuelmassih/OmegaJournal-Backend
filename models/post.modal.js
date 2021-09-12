const mongoose = require('mongoose');
const Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

let Post = new Schema({
  title: {
    type: String
  },
  image: {
    type: Object
  },
  category: {
    type: ObjectId
  },
  tags : {
    type : [ObjectId],
  },
  private : {
    type : Boolean
  },
  content : {
    type : String
  },
  author : {
    type : ObjectId
  },
  authorName : {
    type : String
  },
  date : {
    type : Date,
    default : new Date()
  }
},{
    collection: 'Post'
});

module.exports = mongoose.model('Post', Post);