const express = require('express');
const app = express();
const ContactRoutes = express.Router();
const nodemailer = require("nodemailer");

// Defined store route
ContactRoutes.route('/message').post(function (req, res) {

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
          from: `${req.body.username} <foo@example.com>`, // sender address
          to: 'emanuel@yopmail.com', // list of receivers
          subject: req.body.subject, // Subject line
          //text: "Hello world?", // plain text body
          html: `${req.body.message}`, // html body
        });

        console.log("Message sent: %s", info.messageId);
        res.status(200).json({
          'responseCode' : 200, 
          'message'      : 'email has been sent successfully'
        });
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      }
  });

module.exports = ContactRoutes;