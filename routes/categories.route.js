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

CategoryRoutes.route('/detail/:id').get(function (req, res) {
  Categories.find({_id : req.params.id},function (err, categoty){
    if(err){
       res.status(400).json({
        'responseCode' :  400, 
        'response'     :  [],
        'message'      : 'Categoty details has not been found'
      });
    }
    else {
       res.status(200).json({
        'responseCode' :  200, 
        'response'     :  categoty,
        'message'      : 'Categoty details has been found'
      });
    }
  });
});

module.exports = CategoryRoutes;