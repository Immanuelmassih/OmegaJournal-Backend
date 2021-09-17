const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    config = require('./DB');
    //import cors from “cors”;


   const UserRoutes        = require('./routes/user.route');
   const RazorRoute        = require('./routes/payment');
   const PlanRoutes        = require('./routes/plan.route');
   const ContactRoutes     = require('./routes/Contact');
   const PostRoutes        = require('./routes/post.route');
   const CategoryRoutes    = require('./routes/categories.route');
   const TagRoutes         = require('./routes/tags.router');
   const CommentsRoutes    = require('./routes/comments.route');
    mongoose.Promise = global.Promise;
    mongoose.connect(config.DB, { useNewUrlParser: true ,  useUnifiedTopology: true }).then(
      () => {console.log('Database is connected') },
      err => { console.log('Can not connect to the database'+ err)}
    );
    
    const app = express();
    // app.use(function (req, res, next) {
    //   res.header(“Access-Control-Allow-Origin”, “*”);
    //   res.header(
    //     “Access-Control-Allow-Headers”,
    //     “Origin, X-Requested-With, Content-Type, Accept”
    //   );
    //   next();
    // });
    // const cors = require(“cors”);
    const corsOptions = {
      origin:  "localhost:3000",
      credentials: true, //access-control-allow-credentials:true
      optionSuccessStatus: 200,
    };
    app.use(cors(corsOptions));

    app.use(bodyParser.json());
    app.use(cors());
    app.use('/user',     UserRoutes);
    app.use('/payment',  RazorRoute);
    app.use('/plan',     PlanRoutes);
    app.use('/contact',  ContactRoutes);
    app.use('/post',     PostRoutes);
    app.use('/category', CategoryRoutes);
    app.use('/comment', CommentsRoutes);
    app.use('/tag', TagRoutes);
    const port = process.env.PORT || 4000;
    var publicDir = require('path').join(__dirname,'/public'); 
    app.use(express.static(publicDir)); 

    const server = app.listen(port, function(){
     console.log('Listening on port ' + port);
    });














    