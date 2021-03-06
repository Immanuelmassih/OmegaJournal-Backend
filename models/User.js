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
  image : {
    type : String
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
  },
  payment_id : {
    type : String,
    default : null
  },
  orderCreationId : {
    type : String
  },
  razorpayPaymentId : {
    type : String
  },
  razorpayOrderId : {
    type : String
  },
  razorpaySignature : {
    type : String
  },
  payMentDate : {
    type : Date
  }
},{
    collection: 'Users'
});

module.exports = mongoose.model('Users', Users);