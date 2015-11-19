var path = require('path'),
    bodyParser = require('body-parser'),
    bcrypt = require('bcrypt-nodejs');

//models
var Member = require('../models/member');
var Board = require('../models/board');

//------------------------------------------------------------------------------//
//Show a member
exports.show = function (req,res){
  var memberId = req.params.memberId;
  Member.find({_id: memberId}, function (error, member) {
    if (member) {
      res.json(member);
    } else if (error) {
      console.error(error.stack);
      res.json({status: 400, message: error.message});
    }
  })
};

//------------------------------------------------------------------------------//
//Member Login
exports.login = function(req, res) {
    var password = req.body.password,
      email = req.body.email;
    Member.findOne({email: email})
    .populate('boards')
    .exec(function (error, member) {
      if (member) {
        if (bcrypt.compareSync(password, member.password)) {
          res.json(member)
        }
      } else if (error) {
        console.error(error.stack);
        res.json({status: 400, message: error.message});
      }
    })
  };

//------------------------------------------------------------------------------//
//Create member
exports.signUpPost = function (req,res) {
  var password = req.body.password,
    salt = bcrypt.genSaltSync(10),
    hash = bcrypt.hashSync(password,salt);
  var member = new Member ({name: req.body.name, password: hash, email: req.body.email})
  member.save(function (error, member) {
    if (member) {
      res.json(member)
    } else if (error) {
      console.error(error.stack);
      res.json({status: 400, message: error.message});
    }
  })
};

//Delete User
exports.destroy = function (req, res) {
  var memberId = req.params.memberId;
  var member = new Member ({_id: memberId})
  member.remove(function (error, member) {
    if (member) {
      res.json(member)
    } else if (error) {
      console.error(error.stack);
      res.json({status: 400, message: error.message});
    }
  })
}

//------------------------------------------------------------------------------//
// //Sign In GET
// exports.signInGet = function (req,res) {
//   if(req.isAuthenticated()) {
//     res.redirect('/');
//   }
//   res.render('users/signin', {title: 'Sign In'});
// };

//------------------------------------------------------------------------------//
//Sign In POST
// exports.signInPost = function (req,res,next) {
//   passport.authenticate('local', {
//     failureRedirect:'/signin'
//   }, function (err,user,info) {
//     req.logIn(user, function (err) {
//       if(err) {
//         console.log(err + " Fail");
//         res.render('error', {
//           title: 'Sign In Fail',
//           errorMessage: err.message
//         });
//       } else {
//         res.redirect('/');
//       }
//     });
//   })(req,res,next);
// };

//------------------------------------------------------------------------------//
// //Sign Out
// exports.signOut = function(req,res,next) {
//   if(!req.isAuthenticated()) {
//     res.render('index')
//   } else {
//     req.logout();
//     res.redirect('/')
//   }
// }


//------------------------------------------------------------------------------//
//Update User (e-mail and password)
// exports.edit = function (req,res) {
//   var userId = req.params.id;
//   var password = req.body.password,
//     salt = bcrypt.genSaltSync(10),
//     hash = bcrypt.hashSync(password,salt);

//   new User({
//     id: userId
//   })
//   .fetch()
//   .then(function (user) {
//     if(req.isAuthenticated()) {
//       user.save({
//         email: req.body.email || user.get(
//           'email'),
//         password: hash || user.get('password')
//       })
//       .then(function (user){
//         req.method = 'GET';
//         res.redirect('/');
//       })
//       .catch(function (error){
//         console.error(error.stack);
//         res.redirect('/errorpage');
//       })
//     } else {
//       res.render('users/signup', {title: 'Sign Up', });
//     }
//   })
// }


//------------------------------------------------------------------------------//
//Error page
// exports.errorShow = function (req, res) {
//   res.render('error');
// }
