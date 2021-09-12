const express = require('express');
const app = express();
const CategoryRoutes = express.Router();
let Categories = require('../models/category.modal')

CategoryRoutes.route('/').get(function (req, res) {
  Categories.find(function (err, users){
    if(err){
      console.log(err);
    }
    else {
      res.json(users);
    }
  });
});

module.exports = CategoryRoutes;