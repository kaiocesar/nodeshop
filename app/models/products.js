// ./app/models/produtcs

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Commencts

var ProductsSchema = Schema({
	name : {type: String, default : '', trim: true},
	price : {type: Number, default : 0.00},
	createAt : {type: Date, default : Date.now},
	photo : {type: String, default : "no-image.png", trim: true},
	description : {type: String, default : "", trim: true},
	status : {type: Boolean, default: true},
	comments : [{
		body: {type: String, default: '', trim:true},
		//user: {type: Schema.ObjectId, ref:'User'}
		createAt : {type:Date, default: Date.now}
	}]
});


module.exports = mongoose.model('Products', ProductsSchema);


