const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    config = require('./DB');

   const UserRoutes        = require('./routes/user.route');
   const RazorRoute        = require('./routes/payment');
   const PlanRoutes        = require('./routes/plan.route');
   const ContactRoutes     = require('./routes/Contact');
   const PostRoutes        = require('./routes/post.route');
   const CategoryRoutes    = require('./routes/categories.route');
   const TagRoutes         = require('./routes/tags.router');
    mongoose.Promise = global.Promise;
    mongoose.connect(config.DB, { useNewUrlParser: true ,  useUnifiedTopology: true }).then(
      () => {console.log('Database is connected') },
      err => { console.log('Can not connect to the database'+ err)}
    );

    const app = express();
    app.use(bodyParser.json());
    app.use(cors());
    app.use('/user',     UserRoutes);
    app.use('/payment',  RazorRoute);
    app.use('/plan',     PlanRoutes);
    app.use('/contact',  ContactRoutes);
    app.use('/post',     PostRoutes);
    app.use('/category', CategoryRoutes);
    app.use('/tag', TagRoutes);
    const port = process.env.PORT || 4000;

    const server = app.listen(port, function(){
     console.log('Listening on port ' + port);
    });