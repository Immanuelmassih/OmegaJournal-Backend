const express = require('express');
const app = express();
const PlanRoutes = express.Router();

// Require Plan model in our routes module
let Plan = require('../models/subscriptionPlan.modal');
let jwt = require('jsonwebtoken');

// Defined store route

PlanRoutes.route('/add').post(function (req, res) {
  let Plan = new Plan(req.body);
  Plan.save()
    .then(Plan => {
      res.status(200).json({
        'responseCode' : 200, 
        'response': 'Plan has been added successfully'
      });
    })
    .catch(err => {
      res.status(400).send({
        'responseCode' : 400, 
         'response': 'unable to save Plan'
      });
    });
});

// Defined get data(index or listing) route
PlanRoutes.route('/').get(function (req, res) {
  Plan.find(function (err, Plans){
    if(err){
      console.log(err);
    }
    else {
      res.json(Plans);
    }
  });
});

// Defined edit route
PlanRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Plan.findById(id, function (err, Plan){
      res.json(Plan);
  });
});

//  Defined update route
PlanRoutes.route('/update/:id').post(function (req, res) {
  Plan.findById(req.params.id, function(err, Plan) {
    if (!Plan)
      res.status(404).send("Record not found");
    else {
      Plan.PlanName = req.body.PlanName;
      Plan.PlanDescription = req.body.PlanDescription;
      Plan.PlanPrice = req.body.PlanPrice;

      Plan.save().then(Plan => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
PlanRoutes.route('/delete/:id').get(function (req, res) {
    Plan.findByIdAndRemove({_id: req.params.id}, function(err, Plan){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = PlanRoutes;