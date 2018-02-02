var mongoose = require("mongoose");

// Build Schema
var postSchema = new mongoose.Schema({
	content: String,
	title: String,
	subject: String,
	author: {
				id: {
						type: mongoose.Schema.Types.ObjectId,
						ref: "User"
					},
				username: String
			},
	comments: [
		{
			id:	{
					type: mongoose.Schema.Types.ObjectId,
					ref: "Comment"
				},
			content: String,
			author: {
				name: String,
				email: String
			}
		}
	]
});

// Export the module
module.exports = mongoose.model("Post", postSchema);


// var postSchema = new mongoose.Schema({
// 	content: String,
// 	title: String,
// 	subject: String,
// 	author: {
// 				id: {
// 						type: mongoose.Schema.Types.ObjectId,
// 						ref: "User"
// 					},
// 				username: String
// 			},
// 	comments: [
// 		{
// 			type: mongoose.Schema.Types.ObjectId,
// 			ref: "Comment"
// 		}
// 	]
// });
