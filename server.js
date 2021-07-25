const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const passport = require('passport');



const app = express();

//body-parser config
app.use(express.urlencoded());
app.use(express.json());

//Connect db
const db = keys.mongoURI;
mongoose.connect(db)
        .then(() => console.log("Mongo DB connected"))
        .catch(err => console.log(err))


//Passport Configuration
app.use(passport.initialize());
require('./config/passport')(passport);

// first route
app.get('/' , (req, res) => res.send('Hello World!'));

//Use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts',posts);

const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));