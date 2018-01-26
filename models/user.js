var mongoose = require("mongoose"),
	passportLocalMongoose = require("passport-local-mongoose");


var UserSchema = new mongoose.Schema({
	username: String,
	email: String,
	password: String,
	firstName: String,
	lastName: String,
	trackingPost: {type: Number, default: 0},
	trackingComment: {type: Number, default: 0},
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
