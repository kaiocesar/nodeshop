// ./app/routes



module.exports = function(app, passport) {

	var dashboard = require('../app/controllers/dashboard')(app);
	var customers = require('../app/controllers/customers')(app);
	var products = require('../app/controllers/products')(app);
	var home  = require('../app/controllers/home')(app);

	// GET routes
	app.get('/', home.index);
	app.get('/about', home.about);
	app.get('/contacts', home.contacts);
	app.post('/contacts', home.contacts_send);


	// GET - Dashboard routes (dashboard)
	app.get('/dashboard', dashboard.index);
	app.get('/dashboard/settings', dashboard.settings);
	app.get('/dashboard/profile', dashboard.profile);
	app.get('/dashboard/visits', dashboard.visits);


	// GET - Dashboard routes (customers)
	app.get('/dashboard/customers', customers.index);
	app.get('/dashboard/customers/add', customers.add);
	app.get('/dashboard/customers/edit/:id', customers.edit);


	// GET - Dashboard routes (products)
	app.get('/dashboard/products', products.index);
	app.get('/dashboard/products/add', products.add);
	app.get('/dashboard/products/edit/:id', products.edit);









	// routes refactory
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

	app.get('/confirmation-email', function(req, res){
		res.render('confirmation-email');
	});


	// POST routes
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/confirmation-email', //Temporary area "Wait confirmation email"
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