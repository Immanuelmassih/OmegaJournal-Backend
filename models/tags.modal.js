const mongoose = require('mongoose');
const Schema = mongoose.Schema

let Tags = new Schema({
  name: {
    type: String
  }
},{
    collection: 'Tags'
});

module.exports = mongoose.model('Tags', Tags);