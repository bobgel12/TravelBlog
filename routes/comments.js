// ===========
// Comment Route
// ===========

var express = require("express"),
	router 	= express.Router({mergeParams: true}),
	Comment = require("../models/comment"),
	Post 	= require("../models/post"),
	middleware = require("../middleware");


//  Create Comment
router.post("/", function (req, res) {
	Post.findById(req.params.id, function (err, foundPost) {
		if (err) {
			console.log(err);
		} else{
			Comment.create(req.body.comment, function (err, comment) {
				if (err) {
					console.log(err);
				} else{
					comment.author.name = req.body.name;
					comment.author.email = req.body.email;
					comment.save();
					console.log(comment);
					// Pushing the comment to the array in Post.comments
					foundPost.comments.push(comment);
					foundPost.save();
					res.redirect("/");
				}
			});
		}
	});
});

router.get("/addNewComment",function (req, res) {
	Post.findById(req.params.id, function (err, foundPost) {
		if (err) {
			console.log(err);
		} else{
			res.render("AddComment", {title: "Add Comment", foundPost: foundPost});
		}
	});
});

// Edit Comment
router.get("/:commentId/edit",  function(req, res){
	Comment.findById(req.params.commentId, function(err, foundComment){
		if (err) {
			console.log(err);
		} else{
			res.render("EditComment",{foundComment: foundComment, foundPostId : req.params.id , title: "Edit Comment"});
		}
	});
});
router.put("/:commentId", function(req, res){
	Comment.findByIdAndUpdate(req.params.commentId, req.body.comment, function (err, updatedComment) {
		if (err) {
			console.log(err);
			req.flash("error", "There is a problem when you try to update the comment")
			res.redirect("/IndexPage");
		} else{
			req.flash("success", "Your comment has been editted!")
			res.redirect("/IndexPage/"+ req.params.id);
		}
	});
});

// Delete Comment
router.delete("/:commentId", function (req, res) {
	Comment.findByIdAndRemove(req.params.commentId, function(err){
		if (err) {
			req.flash("error", "There is a problem when you try to delete the comment")
			console.log(err);
		} else{
			req.flash("success", "Your comment has been deleted!")
			res.redirect("/IndexPage/"+  req.params.id);
		}
	});
});


module.exports = router;
