const { User } = require('../models/');
const generateUniqueId = require('../utils/generateUniqueId');

module.exports = {
  async create(req, res) {
    const id = generateUniqueId();
    const { firstName, lastName, email, password } = req.body;
    let newUser;
    try{
        newUser = await User.create({
        id,
        firstName,
        lastName,
        email,
        password
      });
    } catch (err) {
      return res.json(`Error: ${err.parent.detail}`);
    }
    return res.json(newUser);
  },
};