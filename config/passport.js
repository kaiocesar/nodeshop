// ./config/passport.js

var LocalStrategy = require('passport-local').Strategy;

var User = require('../app/models/user');

module.exports = function(passport) {
	// passport session setup
	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user);
		});
	});


	// local signup
	passport.use('local-signup', new LocalStrategy({
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true
	},
	function(req, email, password, done) {
		process.nextTick(function(){
			User.findOne({'local.email':email}, function(err,user){
				if (err)
					return done(err);

				if (user) {
					return done(null, false, req.flash('signupMessage','That email is already taken.'));
				} else {
					var newUser = new User();
					newUser.local.email = email;
					newUser.local.password = newUser.generateHash(password);
					newUser.local.status = false; // waiting response confirm email
					newUser.local.type = 1; // User type = guest


					// save the user
					newUser.save(function(err){
						if (err)
							throw err;
						return done(null, newUser);
					});
				}
			});
		});
	}
	));



	// local login
	passport.use('local-login', new LocalStrategy({
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true
	},
	function (req, email, password, done) {
		
		User.findOne({'local.email' : email }, function(err, user) {
			if (err)
				return done(err);

			if (!user)
				return done(null, false, req.flash('loginMessage', 'No user found.'));

			if (!user.validPassword(password)) 
				return done(null, false, req.flash('loginMessage', 'Oops Wrong password.'))

			return done(null, user);

		});
	}
	));

};


