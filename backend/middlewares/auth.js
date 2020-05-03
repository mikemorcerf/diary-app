const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.js');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if(!authHeader){
    res.status(401).json({error: "Token not found."});
  }
  const parts = authHeader.split(' ');

  if(!parts.length===2){
    res.status(401).json({error: "Token error."});
  }

  const [ scheme, token ] = parts;

  if(!/^Bearer$/i.test(scheme)){
    res.status(401).json({error: "Error with token format."});
  }

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if(err){
      return res.status(401).json({error: 'Invalid token.'});
    }
    // If token is valid get user id and pass it on
    req.userId = decoded.id;
    return next();
  });
}