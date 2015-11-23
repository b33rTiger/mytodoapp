var jwt = require('jsonwebtoken'),
  express = require('express'),
  app = require('../app'),
  bcrypt = require('bcrypt-nodejs');

exports.authenticate = function (req, res, next) {
  if(req.originalUrl == '/api/members/signup' || req.originalUrl == '/api/members/login' || req.originalUrl == '/authenticate') {
    next();
    return;
  }
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, app.app.get('superSecret'), function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });
  }
};