// Middleware

var middleware = [];

middleware.isLoggedIn = function (req, res, next){
	if (req.isAuthenticated()) {
		return next();
	} else{
		req.flash("error", "Please Login!");
		res.redirect("/LoginPage");
	}
}
middleware.isThisYourPost = function (req, res, next){
	if (req.isAuthenticated()) {
		Post.findById(req.params.id, function(err, foundPost){
			if (foundPost.author.id.equals(req.user._id)) {
				next();
			} else{
				req.flash("error","You don't have permission to do that");
				res.redirect("back");
			}
		})
	} else{
		req.flash("error", "You don't have permission to do that!");
		res.redirect("back");
	}
}
middleware.isThisYourComment = function(req, res, next){
	if (req.isAuthenticated()) {
		Comment.findById(req.params.commentId, function(err, foundComment){
			if (foundComment.author.id.equals(req.user._id)) {
				next();
			} else{
				req.flash("error", "You don't have permission to do that!");
				res.redirect("back");
			}
		})
	} else{
		req.flash("error", "You don't have permission to do that!");
		res.redirect("back");
	}
}

middleware.noti = function(req, res, next){
	req.flash("success", "hello");
}

module.exports = middleware;
