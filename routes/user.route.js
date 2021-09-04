const express = require('express');
const app = express();
const UserRoutes = express.Router();

// Require user model in our routes module
let Users = require('../models/User');
let jwt = require('jsonwebtoken');

// Defined store route
UserRoutes.route('/add').post(function (req, res) {
  let user = new Users(req.body);
  console.log ( user )
  user.save()
    .then(user => {
      res.status(200).json({
        'responseCode' : 200, 
        'response': 'user has been added successfully'
      });
    })
    .catch(err => {
      res.status(400).send({
        'responseCode' : 400, 
         'response': 'unable to save user'
      });
    });
});

// UserRoutes.route('/add').post(function (req, res) {
//   let user = new Users(req.body);
//   console.log ( user )
//   user.save()
//     .then(user => {
//       res.status(200).json({
//         'responseCode' : 200, 
//         'response': 'user has been added successfully'
//       });
//     })
//     .catch(err => {
//       res.status(400).send({
//         'responseCode' : 400, 
//          'response': 'unable to save user'
//       });
//     });
// });

// Defined get data(index or listing) route
UserRoutes.route('/').get(function (req, res) {
  user.find(function (err, users){
    if(err){
      console.log(err);
    }
    else {
      res.json(users);
    }
  });
});

// Defined edit route
UserRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  user.findById(id, function (err, user){
      res.json(user);
  });
});

//  Defined update route
UserRoutes.route('/update/:id').post(function (req, res) {
  user.findById(req.params.id, function(err, user) {
    if (!user)
      res.status(404).send("Record not found");
    else {
      user.userName = req.body.userName;
      user.userDescription = req.body.userDescription;
      user.userPrice = req.body.userPrice;

      user.save().then(user => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
UserRoutes.route('/delete/:id').get(function (req, res) {
    user.findByIdAndRemove({_id: req.params.id}, function(err, user){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = UserRoutes;