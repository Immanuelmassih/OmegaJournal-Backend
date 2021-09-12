const express = require('express');
const app = express();
const TagRoutes = express.Router();
let Tags = require('../models/tags.modal')

TagRoutes.route('/').get(function (req, res) {
  Tags.find(function (err, users){
    if(err){
      console.log(err);
    }
    else {
      res.json(users);
    }
  });
});

module.exports = TagRoutes;