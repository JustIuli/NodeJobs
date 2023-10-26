const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const AuthRoutes = require('./Routes/Auth');
const ListingRoutes = require('./Routes/Listings');
const AuthListingRoutes = require('./Routes/AuthListings');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: 'sessions'
});

app.set('view engine', 'ejs');
app.set('views', 'Views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'SecretBgms',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

app.use(AuthRoutes)

app.use(ListingRoutes)

app.use((req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
});

app.use(AuthListingRoutes);

app.use((req,res,next) => {
    res.render('404/404')
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(result => {
    app.listen(process.env.PORT);
  })
  .catch(err => {
    console.log(err);
  });
