// ./app/controllers/home.js

/**
*	Home Controller
*	@author Kaio Cesar <programador.kaio@gmail.com>		
*/		

module.exports = function(app){

	var HomeController = {
		index : function (req, res) {
			// load all products
			res.render('front/index');
		},
		about : function (req, res) {
			res.render('front/about');
		},contacts : function (req, res) {
			// load all products
			res.render('front/contact');
		},
		contacts_send : function (req, res) {
			// send contact
			res.redirect('/contact');
		}

	};

	return HomeController;

};




