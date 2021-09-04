const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Plans = new Schema({
  name: {
    type: String
  },
  duration: {
    type: String
  },
  price: {
    type: Number
  },
  description : {
    type : Boolean
  }
},{
    collection: 'Plans'
});

module.exports = mongoose.model('Plans', Plans);