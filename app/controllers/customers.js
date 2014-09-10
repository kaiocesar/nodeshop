// ./app/controllers/customers.js

/**
*	Customers Controller
*	@author Kaio Cesar <programador.kaio@gmail.com>		
*/	

module.exports = function(app) {


	var CustomersController = {
		index : function(req, res) {
			res.render('dashboard/customers/index');
		},
		add : function(req, res) {
			res.render('dashboard/customers/add');
		},
		edit : function(req, res) {
			res.render('dashboard/customers/edit');
		},

	};

	return CustomersController;

};

