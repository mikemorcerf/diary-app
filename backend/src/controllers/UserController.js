const { User } = require('../models/');
const generateUniqueId = require('../utils/generateUniqueId');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

function generateToken(params = {}){
  return jwt.sign(params, authConfig.secret, {
    //token will expire in one week
    expiresIn: 604800,
  });
}

module.exports = {
  async create(req, res) {
    const id = generateUniqueId();
    const { firstName, lastName, email, password } = req.body;
    let newUser;
    try{
        if(await User.findOne({ where: {email: email} })){
          return res.status(400).json({error:`${email} is already registered.`});
        }

        newUser = await User.create({
        id,
        firstName,
        lastName,
        email: email.toLowerCase(),
        password: await bcrypt.hash(password, 10)
      });
    } catch (err) {
      return res.status(400).json({error:`${err.parent.detail}.`});
    }

    return res.json(newUser.id);
  },

  async profile(req, res) {
    const requestId = req.userId;
    let user;
    try {
      user = await User.findOne({
        attributes: { exclude: ['password'] },
        where: {
          id: requestId
        },
      });
    } catch(err) {
      return res.status(400).json({error:`${err.parent.detail}`});
    }
    if(!user){
      return res.status(404).json({error:"User not found."});
    }
    return res.json(user);
  },

  async authenticate(req, res) {
    const { email, password } = req.body;
    let user;

    user = await User.findOne({ where: {email: email} });
    //Check if user exists and if password is correct
    if(!user || !await bcrypt.compare(password, user.password)){
      res.status(400).json({error:'Email or password are invalid. Please try again.'});
    }

    user.password = undefined;

    const token = generateToken({ id: user.id });

    res.json({user, token});
  }
};