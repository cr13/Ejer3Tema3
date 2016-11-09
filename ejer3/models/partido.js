var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema   = new Schema({
	id: { type: String, required: true, index: { unique: true }},
	eq_visitante: String,
	eq_local: String,
	competicion: String,
	anio: Number,
	apuestas:[],
	resultado: String

});

module.exports=mongoose.model('partido', userSchema);
