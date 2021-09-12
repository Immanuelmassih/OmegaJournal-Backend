require("dotenv").config();
const express = require("express");
const Razorpay = require("razorpay");
let Users = require('../models/User');
const RazorRoute = express.Router();

RazorRoute.post("/orders", async (req, res) => {
    try {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        });

        const options = {
            amount: 50000, // amount in smallest currency unit
            currency: "INR",
            receipt: "receipt_order_7432",
        };

        const order = await instance.orders.create(options);

        if (!order) return res.status(500).send("Some error occured");

        res.json(order);
    } catch (error) {
        res.status(500).send(error);
    }
});

RazorRoute.post("/success", async (req, res) => {
    Users.find({email: req.body.data.email}, function (err, user){
      Users.findById(user[0]._id.toString(), function(err, user) {
        if (!user)
          res.status(404).send("Record not found");
        else {
          user.payment = true;
          user.package = req.body.data.package;
          user.payment_id = req.body.data.payment_id;
          user.save().then(user => {
              res.json('Update complete');
          })
          .catch(err => {
                res.status(400).send("unable to update the database");
          });
        }
      });
    })
});

module.exports = RazorRoute;