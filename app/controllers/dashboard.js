// ./app/controllers/dashboard.js

/**
*	Dashboard Controller
*	@author Kaio Cesar <programador.kaio@gmail.com>		
*/		

module.exports = function(app) {

	var DashboardController = {
		index : function(req, res) {
			res.render('dashboard/common/index');
		},
		settings : function(req, res) {
			res.render('dashboard/common/settings');
		},
		profile : function(req, res) {
			res.render('dashboard/common/profile');
		},
		visits : function(req, res) {
			res.render('dashboard/common/visits');
		}
	};

	return DashboardController;

};
