var mongoose = require("mongoose");
		// passportLocalMongoose = require("passport-local-mongoose");

var SubcriberSchema = new mongoose.Schema({
	name: String,
	email: String,
	country: String,
});
// UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Subcriber", SubcriberSchema);
