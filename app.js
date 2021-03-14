const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bookRoute = require('./routes/books-route');
const genreRoute = require('./routes/genres-route');
const cookieSession = require('cookie-session');
const passport = require('passport');
// const keys = require('./keys');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');


//Using dot env to laod environment variables
dotenv.load();

//always follow the order in which cookie and sessions are intialized
// app.use(cookieSession({
// 	maxAge: 24 * 60 * 60 * 1000, //1day in milli second
// 	keys: [keys.session.cookieKey]
// }));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//BOOKSTORE_MLAB_URL - MongoDb url from Mlab
const MONGODB_URL = process.env.BOOKSTORE_MLAB_URL || 'mongodb://localhost/bookstore';
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
//location for static content
app.use(express.static(__dirname + '/client'));

//Use Mlab url here
mongoose.connect(MONGODB_URL);

app.get('/', function (req, res) {
	res.send('Please Use the API /api/book or /api/genre');
});

app.use('/api/book', bookRoute);
app.use('/api/genre', genreRoute);
//setup route for /auth/*
app.use('/auth', authRoutes);
//setup route for /profile/*
app.use('/profile', profileRoutes);

app.listen(PORT);
console.log('Started BookStore application on port ' + PORT);
console.log('Open http://localhost:' + PORT + ' on your browser!');