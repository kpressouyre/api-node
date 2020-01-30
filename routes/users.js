var express = require('express');
var router = express.Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', async function(req, res, next) {
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  };
  const userSchema = new User(user);

  try{
    const savedUser = await userSchema.save();
    jwt.sign({user}, 'secretkey', (err, token) => {
      res.json({
        token
      });
    });
    ///res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/login', async function(req, res, next) {
  
});

router.get('/testAuth', verifyToken, function (req, res, next) {
  jwt.verify(req.token, 'secretkey', function(err, authData){
    if(err){
      res.sendStatus(403);
    }else{
      res.json({'test':'123', authData});
    }
  });
});


function verifyToken(req, res, next){
  const bearer = req.headers['authorization'];
  console.log(bearer);
  if(typeof(bearer) !== 'undefined'){
    const token = bearer.split(' ')[1];
    req.token = token;
    next();
  }else{
    res.sendStatus(403);
  }
}

module.exports = router;
