// ./app/controllers/produtcs

// Products Controller

var ProductsSchema = require('../models/products');

exports.index = function (req,res){ 
	return ProductsSchema.find(function(err, products){
		console.log(products);
		if (! err) {
			res.render('products/index',{
				products : products
			});
		} else {
			res.render('products/index',{
				products : {}
			});
		}
	});
};



exports.add = function (req, res) {
	res.render('products/add');
};

exports.do_add = function (req, res) {
	res.send('like toy soldier')
};