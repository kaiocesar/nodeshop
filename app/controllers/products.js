// ./app/controllers/produtcs

// Products Controller
var connect = require('connect-flash');

var ProductsSchema = require('../models/products');

exports.index = function (req,res){ 
	return ProductsSchema.find(function(err, products){
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
	console.log( req.flash('message') );
	res.render('products/add', {message : req.flash('message')});
};

exports.do_add = function (req, res) {

	var DateNow = new Date();
	var newProduct = new ProductsSchema();

	newProduct.name = req.body.name;
	newProduct.price = req.body.price;
	newProduct.photo = newProduct.photo;
	newProduct.description = req.body.description;
	newProduct.status = true;
	newProduct.createAt = DateNow;

	newProduct.save(function(err){
		if (!err) {
			req.flash('message','Successfully registered product.');
		} else {
			req.flash('message','Error registering the product, try again.');
		}

	});

	res.redirect('/products/add');

};


exports.details = function(req, res) {
	ProductsSchema.find({_id:req.params.id}, function(err,product){
		if (!err) {
			res.render('products/details',{ product : product });
		} else {
			res.render('products/details', { product : {} });
		}
	});
	
};


exports.test = function(req, res) {
	ProductsSchema.find(function(err, products){
		if (!err) {
			res.json(products);
		}
	})
};