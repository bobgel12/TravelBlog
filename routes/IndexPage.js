
var express = require("express"),
	router 	= express.Router(),
	Post = require("../models/post"),
	middleware = require("../middleware"),
	passport = require("passport");
	User = require("../models/user");

  router.get("/", function (req, res) {
  	Post.find({}, function(err, posts){
  		if (err) {
  			console.log(err);
  		} else{
  			Post.count({}, function(err, count){
  				if (err) {
  					console.log(err);
  				} else if (req.user) {
      				console.log( "Number of posts: ", count );
      				console.log(req.user);
      				if ((req.user.trackingPost < count)) {
      					var different = count - req.user.trackingPost;
      					var display = "We have " + String(different) + " new post for you!";
  	    				req.user.trackingPost = count;
  	    				req.user.save();
  	    				console.log("We have " + different + " new post for you!");
  	    				console.log(req.flash("hello"));
  						res.render("IndexPage", {title: "IndexPage", posts: posts, currentUser: req.user, success: req.flash(display)});
      				} else {
  						res.render("IndexPage", {title: "IndexPage", posts: posts, currentUser: req.user});
  					}
      			} else {
  					res.render("IndexPage", {title: "IndexPage", posts: posts, currentUser: req.user});
      			}
  			});
  		}
  	});
  });

  router.post("/", middleware.isLoggedIn, function (req, res) {
  	Post.create(req.body.post, function (err, post) {
  		if (err) {
  			console.log(err);
  		}
  		else{
  			post.author.id = req.user._id;
  			post.author.username = req.user.username;
  			post.save();
  			res.redirect("/");
  		}
  	});
  });

  router.get("/NewPost", middleware.isLoggedIn, function(req, res){
  	res.render("NewPost", {title: "New Post"});
  });

  router.get("/IndexPage/:id", function (req, res) {
  	Post.findById(req.params.id).populate("comments").exec(function (err, foundPost) {
  		if (err) {
  			console.log(err);
  		} else{
  			res.render("ShowPage", {title: "Show Page",foundPost: foundPost});
  		}
  	});
  });


  // UPDATE ROUTE
  router.get("/IndexPage/:id/edit", middleware.isThisYourPost,  function(req, res){
  	Post.findById(req.params.id, function(err, foundPost){
  		if (err) {
  			console.log(err)
  		} else{
  			res.render("EditPage", {title: "Edit Page", foundPost: foundPost});
  		}
  	});
  });

  router.put("IndexPage/:id", middleware.isThisYourPost, function  (req, res) {
  	Post.findByIdAndUpdate(req.params.id, req.body.post, function (err, updatedPost) {
  		if (err) {
  			console.log(err);
  			req.flash("error", "There is a problem when you try to update the form")
  			res.redirect("/");
  		} else{
  			req.flash("success", "Your post has been editted!")
  			res.redirect("/"+ req.params.id);
  		}
  	});
  });

  // DESTROY ROUTE

  router.delete("/IndexPage/:id", middleware.isThisYourPost, function (req, res) {
  	Post.findByIdAndRemove(req.params.id, function(err){
  		if (err) {
  			console.log(err);
  		} else{
  			req.flash("success", "Your post has been deleted!")
  			res.redirect("/")
  		}
  	});
  });


router.get("/AboutPage", function (req, res) {
	res.render("AboutPage", {title: "AboutPage"})
})



// Authenticate Route
router.get("/RegisterPage", function (req, res) {
	res.render("RegisterPage", {title: "RegisterPage"})
})
router.post("/RegisterPage", function (req, res) {
	var newUser = new User({username: req.body.username, firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email});
	User.register(newUser, req.body.password, function(err, user){
		if (err) {
			console.log(err);
			return res.render("RegisterPage");
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/");
		});
	});
});

router.get("/LoginPage", function (req, res) {
	res.render("LoginPage", {title: "LoginPage"})
})

router.post("/LoginPage",passport.authenticate("local",
	{
		successRedirect: "/",
		failureRedirect: "/LoginPage"
	}) ,function(req, res){
})

router.get("/LogOut", function (req, res) {
	req.logout();
	req.flash("success", "You are logged out!");
	res.redirect("/");
})


module.exports = router;
