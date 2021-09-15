const express = require('express');
const app = express();
const CommentsRoutes = express.Router();
const mongoose = require('mongoose');
// Require Comment model in our routes module
let Comment = require('../models/comments.modal');
let jwt = require('jsonwebtoken');

// Defined store route

CommentsRoutes.route('/add').post(function (req, res) {
  let comment = new Comment(req.body);
  comment.save()
    .then(Comment => {
      res.status(200).json({
        'responseCode' : 200, 
        'response': 'Comment has been added successfully'
      });
    })
    .catch(err => {
      res.status(400).send({
        'responseCode' : 400, 
         'response': 'unable to save Comment'
      });
    });
});

// Defined get data(index or listing) route
CommentsRoutes.route('/post/:id').get(function (req, res) {
   Comment.aggregate([
    { $match : 
      { postId : mongoose.Types.ObjectId(req.params.id) } 
    },
    {
      $lookup: {
        from: "Users",
        localField: "author",
        foreignField: "_id",
        as: "UserDetail",
      },
    },
    {
      $unwind: "$UserDetail",
    }
  ])
  .then((result) => {
      res.status(200).json({
        'responseCode' :  200, 
        'response'     :  result,
        'message'      : 'Comments have been found'
      });
  })
  .catch((error) => {
    res.status(200).json({
      'responseCode' :  200, 
      'response'     :  [],
      'message'      : 'No comment found'
    });
  });
});

// Defined edit route
CommentsRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Comment.findById(id, function (err, Comment){
      res.json(Comment);
  });
});

//  Defined update route
CommentsRoutes.route('/update/:id').post(function (req, res) {
  Comment.findById(req.params.id, function(err, Comment) {
    if (!Comment)
      res.status(404).send("Record not found");
    else {
      Comment.CommentName = req.body.CommentName;
      Comment.CommentDescription = req.body.CommentDescription;
      Comment.CommentPrice = req.body.CommentPrice;

      Comment.save().then(Comment => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
CommentsRoutes.route('/delete/:id').get(function (req, res) {
    Comment.findByIdAndRemove({_id: req.params.id}, function(err, Comment){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = CommentsRoutes;