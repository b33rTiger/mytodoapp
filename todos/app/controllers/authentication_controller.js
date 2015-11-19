var app = require('../../app'),
  jwt = require('jsonwebtoken'),
  Member = require('../models/member');

exports.authenticate = function(req, res) {

  // find the user
  Member.findOne({
    name: req.body.email
  }, function(err, member) {

    if (err) throw err;

    if (!member) {
      res.status(404).json({ success: false, message: 'Authentication failed. Member not found.' });
    } else if (member) {

      // check if password matches
      if (member.password != req.body.password) {
        res.status(401).json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign({name: member.name, id: _id}, app.get('superSecret'), {
          expiresInMinutes: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }
    }
  });
};