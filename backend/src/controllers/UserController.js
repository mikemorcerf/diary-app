// Diary app API
// Author: Michael de Morcerf e Moura
// LinkedIn: https://www.linkedin.com/in/michaelmoura/
// Github: https://github.com/mikemorcerf

const { User } = require('../models/');
const generateUniqueId = require('../utils/generateUniqueId');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');
const crypto = require('crypto');

function generateToken(params = {}){
  return jwt.sign(params, authConfig.secret, {
    //token will expire in one week
    expiresIn: 604800,
  });
};

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
      return res.status(400).json({error:`${err}.`});
    }

    return res.json(newUser.id);
  },

  async profile(req, res) {
    const requestId = req.userId;
    let user;
    try {
      user = await User.findOne({
        attributes: { exclude: ['password', 'passwordResetToken', 'passwordResetExpires'] },
        where: {
          id: requestId
        },
      });
    } catch(err) {
      return res.status(400).json({error:`${err}`});
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
      return res.status(400).json({error:'Email or password are invalid. Please try again.'});
    }

    user.password = undefined;

    const token = generateToken({ id: user.id });

    return res.json({user, token});
  },

  async forgotPassword(req, res) {
    const { email } = req.body;
    let token = '';

    try{
      const user = await User.findOne({
        attributes: { exclude : ['password'] },
        where: {
          email: email,
        },
      });
      if(!user){
        return res.status(400).json({error: 'Email not registered.'});
      }

      token = crypto.randomBytes(20).toString('HEX');
      const now = new Date();
      now.setHours(now.getHours() + 1);
      user.passwordResetToken = token;
      user.passwordResetExpires = now;
      await user.save();
      
    } catch (err) {
      return res.status(400).json({error:`${err}`});
    }
    
    return res.json({ token });
  },

  async resetPassword(req, res) {
    const { email, password, token } = req.body;
    try{
      user = await User.findOne({
        where : {
          email,
        }
      });

      if(!user){
        return res.status(400).json({error: 'User not found.'});
      }

      if(user.passwordResetToken !== token){
        return res.status(400).json({error: 'Invalid token.'});
      }

      if(Date.now() > user.passwordResetExpires){
        return res.status(400).json({error: 'Token expired.'});
      }

      user.password = await bcrypt.hash(password, 10);
      user.passwordResetToken = null;
      user.passwordResetExpires = null;
      await user.save();

      user.password = undefined;

      return res.json(user);
    } catch (err) {
      return res.status(400).json({error:'Error reseting password.'});
    }
  }
}