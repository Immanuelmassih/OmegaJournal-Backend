const mongoose = require('mongoose');
const Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

let Users = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  terms : {
    type : Boolean
  },
  payment : {
    type : Boolean,
    default : false
  },
  package : {
    type : ObjectId,
    default : null
  }
},{
    collection: 'Users'
});

module.exports = mongoose.model('Users', Users);