var mongoose = require("mongoose");

// Build the Schema
var commentSchema = new mongoose.Schema({
	content: String,
	date: String,
	author: {
				name: String,
				email: String
			}
});
// Export the module
module.exports = mongoose.model("Comment", commentSchema);


// var commentSchema = new mongoose.Schema({
// 	content: String,
// 	date: String,
// 	author: {
// 		id: {
// 			type: mongoose.Schema.Types.ObjectId,
// 			ref: "User"
// 		},
// 		username: String
// 	}
// });
