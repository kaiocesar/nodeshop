// ./app/models/produtcs


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductsSchema = Schema({
	local : {
		name : {type: String, default : '', trim: true},
		price : {type: Number, default : 0.00},
		createAt : {type: Date, default : Date.now},
		photo : {type: String, default : "no-image.png", trim: true},
		description : {type: String, default : "no-image.png", trim: true},
		status : {type: Boolean, default: true}
	}
});


ProductsSchema.methods.Add = function(data){
	
};

module.exports = mongoose.model('Products', ProductsSchema);


