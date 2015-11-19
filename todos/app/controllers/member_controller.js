var path = require('path'),
    bodyParser = require('body-parser'),
    bcrypt = require('bcrypt-nodejs');

//models
var Member = require('../models/member');
var Board = require('../models/board');

//------------------------------------------------------------------------------//
//Index
// exports.index = function (req,res){
//   if (req.isAuthenticated()) {
//         res.render('index', {
//           userId: req.member.get('id'),
//           username: req.member.get('name')
//         });
//   } else {
//     res.render('index')
//   }
// };

//------------------------------------------------------------------------------//
//Sign Up GET (Create User)
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
//Sign Up POST (Create User)
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

//------------------------------------------------------------------------------//
//Sign In GET
exports.signInGet = function (req,res) {
  if(req.isAuthenticated()) {
    res.redirect('/');
  }
  res.render('users/signin', {title: 'Sign In'});
};

//------------------------------------------------------------------------------//
//Sign In POST
exports.signInPost = function (req,res,next) {
  passport.authenticate('local', {
    failureRedirect:'/signin'
  }, function (err,user,info) {
    req.logIn(user, function (err) {
      if(err) {
        console.log(err + " Fail");
        res.render('error', {
          title: 'Sign In Fail',
          errorMessage: err.message
        });
      } else {
        res.redirect('/');
      }
    });
  })(req,res,next);
};

//------------------------------------------------------------------------------//
//Sign Out
exports.signOut = function(req,res,next) {
  if(!req.isAuthenticated()) {
    res.render('index')
  } else {
    req.logout();
    res.redirect('/')
  }
}

//------------------------------------------------------------------------------//
//Show User
exports.show = function (req,res) {
  var userId = req.params.id;
  var user = new User({id: userId});
  // user.fetch({
  //  withRelated:['roles']
  // })
  user.fetch()
  .then(function (data) {
    res.render('users/edit', {
      title: 'Current User',
      userId: req.user.get('id'),
      username: req.user.get('username')
    })
  })
  .catch(function (error) {
    console.log(error.stack);
    res.redirect('/errorpage');
  });
}

//------------------------------------------------------------------------------//
//Update User (e-mail and password)
exports.edit = function (req,res) {
  var userId = req.params.id;
  var password = req.body.password,
    salt = bcrypt.genSaltSync(10),
    hash = bcrypt.hashSync(password,salt);

  new User({
    id: userId
  })
  .fetch()
  .then(function (user) {
    if(req.isAuthenticated()) {
      user.save({
        email: req.body.email || user.get(
          'email'),
        password: hash || user.get('password')
      })
      .then(function (user){
        req.method = 'GET';
        res.redirect('/');
      })
      .catch(function (error){
        console.error(error.stack);
        res.redirect('/errorpage');
      })
    } else {
      res.render('users/signup', {title: 'Sign Up', });
    }
  })
}


//------------------------------------------------------------------------------//
//Error page
exports.errorShow = function (req, res) {
  res.render('error');
}
