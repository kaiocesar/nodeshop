// ./app/controllers/produtcs.js

/**
*	Product Controller
*	@author Kaio Cesar <programador.kaio@gmail.com>		
*/		

module.exports = function(app) {

	var numeral = require('numeral');
	var formidable = require('formidable');
	var util = require('util');
	var fs = require('fs');
	var mongoose = require('mongoose');
	var ProductsSchema = require('../models/products');

	var ProductsController = {
		index : function (req, res){ 
			return ProductsSchema.find(function(err, products){
				if (! err) {
					res.render('dashboard/products/index',{
						products : products,
						maskinput : function(price) {
							var currency = numeral(price).format('0,00.00');
							return 'R$'+currency;
						}
					});
				} else {
					res.render('dashboard/products/index',{
						products : {}
					});
				}
			});
		},
		
		add : function (req, res) {	
			res.render('dashboard/products/add', {message : req.flash('message')});
		},

		do_add : function (req, res) {

			fs.readFile(req.params.photo, function(err,data){
				var newPath = __dirname + "/uploads/uploadFileName";		
				fs.writeFile(newPath, data, function(err){
					if (!err) {
						console.log('Success uploaded image.');
					}
				})
			});



			var DateNow = new Date();
			var newProduct = new ProductsSchema();

			newProduct.name = req.body.name;
			newProduct.price = req.body.price;
			newProduct.photo = newProduct.photo;
			newProduct.description = req.body.description;
			newProduct.status = true;
			newProduct.createAt = DateNow;

			return newProduct.save(function(err){
				if (!err) {
					req.flash('message','Successfully registered product.');
				} else {
					req.flash('message','Error registering the product, try again.');
				}

			});

			res.redirect('/dashboard/products/add');

		},

		details : function(req, res) {
			return ProductsSchema.find({_id:req.params.id}, function(err,product){
				if (!err) {
					res.render('dashboard/products/details',{ 
						product : product,
						maskinput : function(price) {
							var currency = numeral(price).format('0,0.00');
							return 'R$'+currency;
						} 
					});
				} else {
					res.render('dashboard/products/details', { product : {} });
				}
			});
			
		},

		edit : function(req, res) {
			res.render('dashboard/products/edit');
		}



	};

	return ProductsController;

};

