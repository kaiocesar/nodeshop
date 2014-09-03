// ./app/routes

module.exports = function(app, passport) {
	// GET routes
	app.get('/', function(req, res){
		res.render('index');
	});

	app.get('/login', function(req, res){
		res.render('login', {message: req.flash('loginMessage')});
	});

	app.get('/signup', function(req, res){
		res.render('signup', {message: req.flash('signupMessage')});
	});

	app.get('/dashboard', isLoggedIn, function(req, res){
		res.render('dashboard', {
			user : req.user
		});
	});

	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});


	// POST routes
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/dashboard', //Temporary area "Wait confirmation email"
		failureRedirect : '/signup',
		failureFlash    : true
	}));


	app.post('/login', passport.authenticate('local-login', {
		successRedirect : "/dashboard",
		failureRedirect : "/login"		,
		failureFlash    : true
	}));


};


function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/login');
}