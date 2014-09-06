// ./app/controllers/produtcs

// Products Controller
var connect = require('connect-flash');

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
	res.render('products/add', {message : req.flash('message')});
};

exports.do_add = function (req, res) {

	var DateNow = new Date();
	var newProduct = new ProductsSchema();

	newProduct.local.name = req.body.name;
	newProduct.local.price = req.body.price;
	newProduct.local.photo = newProduct.local.photo;
	newProduct.local.description = req.body.description;
	newProduct.local.status = true;
	newProduct.local.createAt = DateNow;

	newProduct.save(function(err){
		if (!err) {
			req.flash('message','Successfully registered product.');
		} else {
			req.flash('message','Error registering the product, try again.');
		}

	});

	res.redirect('/products/add');

};