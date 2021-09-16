require("dotenv").config();
const express = require("express");
const Razorpay = require("razorpay");
let Users = require('../models/User');
const RazorRoute = express.Router();
let jwt = require('jsonwebtoken');
RazorRoute.post("/orders", async (req, res) => {
    try {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        });

        const options = {
            amount: req.body.price * 100  , // amount in smallest currency unit
            currency: "INR",
            receipt: req.body.price._id
        };

        const order = await instance.orders.create(options);

        if (!order) return res.status(500).send("Some error occured");

        res.json(order);
    } catch (error) {
        res.status(500).send(error);
    }
});

RazorRoute.post("/success", async (req, res) => {
  Users.findById(req.body.data._id, function(err, user) {
    if (!user)
      res.status(404).send("Record not found");
    else {
      user.payment = true;
      user.package = req.body.data.package;
      user.payment_id = req.body.data.payment_id;
      user.orderCreationId = req.body.data.orderCreationId;
      user.razorpayPaymentId = req.body.data.razorpayPaymentId;
      user.razorpayOrderId = req.body.data.razorpayOrderId;
      user.razorpaySignature = req.body.data.razorpaySignature;
      user.payMentDate = new Date();
      user.save().then(user => {
      let userDetails = {
        _id : user._id,
        name : user.name,
        email : user.email,
        image : user.image,
        terms : user.terms,
        payment : user.payment,
        package : user.package,
        payment_id : user.payment_id,
        payMentDate : user.payMentDate
      }  
      const accessToken = jwt.sign(userDetails, process.env.ACCESS_TOKEN_SECRET)
        res.json({
           'responseCode' : 200,
           'token'        : accessToken,
           'message'      : 'Payment has been made successfully'
        })
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

module.exports = RazorRoute;