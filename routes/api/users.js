const express = require('express');
const router = express.Router();
const User = require('../../models/User')
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const { session } = require('passport');

//@route  POST  /api/users/register
//@desc   Register a user
//@access Public 
router.post('/register', (req, res) => {
  User.findOne({email:req.body.email})
      .then(user => {
        if(user) {
          return res.status(400).json({email: 'Email already exists'});
        } else {
          
          // Creating Gravatar
          const avatar = gravatar.url(req.body.email, {
            s:'200',
            r:'pg',
            d:'mm'
          });

          const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            avatar
          });

          // Encrypting Password
          bcrypt.genSalt(10, (err, salt) => {
            if(err) throw err;
            bcrypt.hash(req.body.password, salt, (err, hash) => {
              if(err) throw err;
              newUser.password = hash;
              newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err))
            });
          });
        }
      })
      .catch(err => console.log(err));
});


//@route  POST  /api/users/login
//@desc   Login a user
//@access Public 

router.post('/login', (req, res) => {
  User.findOne({email:req.body.email})
      .then(user => {
        if(!user) {
          return res.status(400).json({email:'User not found...Please register!'})
        } else {
          bcrypt.compare(req.body.password,user.password, (err, success) => {
            if(err) throw err;
            if(success) {
              //Create Payload
              const payload = {
                id: user.id,
                name: user.name,
                avatar: user.avatar
              };

              //Sign a token
              jwt.sign(payload, keys.secretoOrKey, 
                {expiresIn: 36000}, (err, token) => {
                  if (err) throw err;
                  return res.json({token: 'Bearer '+token});
                });
            } else {
              return res.status(404).json({password:'Incorrect Password!'})
            }
          });
        }
      })
      .catch(err => console.log(err));
})

//@route  get  /api/users/current
//@desc   User Current Info
//@access Private

router.use('/current', 
passport.authenticate('jwt', {session: false}),
(req, res) => {
    res.json(req.user);

});

module.exports = router;