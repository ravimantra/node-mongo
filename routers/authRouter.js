const express = require('express');
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user.model');
const { registerUserValidation, loginUserValidation } = require('../utils/validate');

router.post('/register', async (req, res) => {
  // validation request data
  const { error } = registerUserValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // check if user is already registered 
  const isUserExist = await User.findOne({ email: req.body.email });
  if (isUserExist) {
    return res.status(400).send('User already exist');
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  // create new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword
  });
  try {
    await user.save();
    res.send({ user: user._id });
  } catch(err) {
    res.status(400).send(err);
  }
})

router.post('/login', async (req, res) => {
  // validate request data
  const { error } = loginUserValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // check if email or password is correct
  const user = await User.findOne({ email: req.body.email });
  const isPasswordMatched = await bcrypt.compare(req.body.password, user.password);
  if (!user || !isPasswordMatched) {
    return res.status(400).send('Email or password is wrong');
  }

  // password is correct
  const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);
  res.header('auth-token', token).send({ token: token });
  // res.sendStatus(200);
  //res.send('Logged in!');
})

module.exports = router;
