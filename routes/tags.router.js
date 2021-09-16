const express = require('express');
const app = express();
const TagRoutes = express.Router();
let Tags = require('../models/tags.modal')

TagRoutes.route('/').get(function (req, res) {
  Tags.find(function (err, tags){
    if(err){
      console.log(err);
    }
    else {
      res.json(tags);
    }
  });
});

TagRoutes.route('/detail/:id').get(function (req, res) {
  Tags.find({_id : req.params.id},function (err, tag){
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
        'response'     :  tag,
        'message'      : 'Categoty details has been found'
      });
    }
  });
});

module.exports = TagRoutes;