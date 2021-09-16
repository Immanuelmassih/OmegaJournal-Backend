const express = require('express');
const app = express();
const UserRoutes = express.Router();
require('dotenv').config();
// Require user model in our routes module
let Users = require('../models/User');
let jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const mongoose = require('mongoose');
const multer  = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {

      Users.findById(req.params.id, function(err, user) {
        if (user){
          user.image = file.originalname;
          user.save()
        }
      });

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

UserRoutes.post('/avatar/:id', upload.single('image'), (req, res, err) => {


  res.status(200).json({
    'responseCode' : 200, 
    'response'     : [],
    'message' : "Images has been uploaded"
  })
})

// Defined store route
UserRoutes.route('/add').post(function (req, res) {
  let user = new Users(req.body);
  const accessToken = jwt.sign(req.body, process.env.ACCESS_TOKEN_SECRET)
  user.save()
    .then(user => {
      res.status(200).json({
        'responseCode' : 200, 
        'response'     : accessToken,
        'message'      : 'user has been added successfully'
      });
    })
    .catch(err => {
      res.status(400).send({
         'responseCode' : 400, 
         'response'     : [],
         'message'      : 'unable to save user'
      });
    });
});

UserRoutes.route('/login').post(function (req, res) {
   Users.find({email : req.body.email, password : req.body.password},function (err, user) {
       if (user.length > 0) {
         let matchedUser = {
             _id : user[0]._id.toString(),
             name : user[0].name,
             email : user[0].email,
             terms : user[0].terms,
             payment : user[0].payment,
             payMentDate : user[0].payMentDate
         }
         const accessToken = jwt.sign(matchedUser, process.env.ACCESS_TOKEN_SECRET)
          res.status(200).json({
            'responseCode' : 200, 
            'response'     : accessToken,
            'message'      : 'user has been logged in successfully'
          });
       } else {
          res.status(400).send({
             'responseCode' : 400, 
             'response'     : [],
             'message'      : 'user does not exist in system'
          });
       }
       if (err) {
          res.status(400).send({
             'responseCode' : 400, 
             'response'     : [],
             'message'      : 'an error occured'
          });
       }
   })
});

UserRoutes.route('/forgot').post(function (req, res) {
  Users.find({email: req.body.email}, function (err, users){
       if (users.length > 0) {
          async function main() {
            let testAccount = await nodemailer.createTestAccount();
            let transporter = nodemailer.createTransport({
              host: "smtp.gmail.com",
              port: 587,
              secure: false, // true for 465, false for other ports
              auth: {
                user: "emanuelswedonburg@gmail.com", // generated ethereal user
                pass: "JesusChrist@123", // generated ethereal password
              },
            });

            // send mail with defined transport object
            let info = await transporter.sendMail({
              from: '"Reset account" <foo@example.com>', // sender address
              to: 'emanuel@yopmail.com', // list of receivers
              subject: "Reset Account", // Subject line
              //text: "Hello world?", // plain text body
              html: `<a href="http://localhost:3000/reset-account/${users[0]._id.toString()}">Click here to reset account</a>`, // html body
            });

            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
          }

          main().catch(console.error);
          res.status(200).json({
            'responseCode' : 200, 
            'message'      : 'reset password link has been sent to your email'
          });
       } else {
          res.status(201).send({
             'responseCode' : 201, 
             'response'     : [],
             'message'      : 'user does not exist in system'
          });
       }
       if (err) {
          res.status(400).send({
             'responseCode' : 400, 
             'response'     : [],
             'message'      : 'an error occured'
          });
       }
  });
});

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

// Defined get data(index or listing) route
UserRoutes.route('/userDetail/:id').get(function (req, res) {
  Users.aggregate([
  { $match : { _id : mongoose.Types.ObjectId(req.params.id) } },
  {
    $lookup: {
      from: "Post",
      localField: "_id",
      foreignField: "author",
      as: "postList",
    },
  },
   {
    $lookup: {
      from: "Categories",
      localField: "postList.category",
      foreignField: "_id",
      as: "category_info",
    },
  },
  { $addFields: {postCount: {$size: "$postList"}}}
])
  .then((result) => {
      res.status(200).json({
        'responseCode' :  200, 
        'response'     :  result,
        'message'      : 'User details has been found'
      });
  })
  .catch((error) => {
    res.status(200).json({
      'responseCode' :  200, 
      'response'     :  [],
      'message'      : 'User details has not been found'
    });
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
UserRoutes.route('/reset/:id').post(function (req, res) {
  Users.findById(req.params.id, function(err, user) {
    if (!user)
      res.status(404).send("Record not found");
    else {
      user.password = req.body.password;
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
    user.findByIdAndRemove({_id: req.params.id}, function(err, post){
        if ( post ) {
          res.status(200).json({
            'responseCode' :  200, 
            'response'     :  result,
            'message'      : 'Post has been deleted successfully'
          })
        }
        if ( err ) {
          res.status(200).json({
            'responseCode' :  200, 
            'response'     :  [],
            'message'      : 'Post has not been deleted'
          });
        }
    });
});

function authenticateToken (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
}

module.exports = UserRoutes;