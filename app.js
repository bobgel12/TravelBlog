var express 	= require("express"),
	bodyParser 	= require("body-parser"),
	mongoose 	= require("mongoose"),
	passport 	= require("passport"),
	flash 		= require("connect-flash-plus"),
	Post 			= require("./models/post"),
	Comment 	= require("./models/comment"),
	User 			= require("./models/user"),
	LocalStrategy 	= require("passport-local"),
	methodOverride 	= require("method-override"),
	session 		= require("express-session");

var  indexPageRoutes = require("./routes/IndexPage"),
	   commentRoutes 	= require("./routes/comments"),
     app = express();

// Fixing the ennoying bugs
// mongoose.Promise = global.Promise;

// var url = process.env.DATABASEURL || "mongodb://localhost/posts"
// mongoose.connect(url);
mongoose.connect("mongodb://angel:Angelle212@ds115768.mlab.com:15768/angelblog");


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(flash());
app.use(methodOverride("_method"));

// Passport Configuration
app.use(session({
	secret: "This is the requirement for the Passport",
	// cookies: { maxAge: 6000},
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Passing to every route
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use("/", indexPageRoutes);
app.use("/IndexPage/:id/comments",commentRoutes);




app.listen(process.env.PORT || "3000", function (req, res) {
	console.log("Server Started on port 3000");
})
