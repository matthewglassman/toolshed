// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** // Include Server Dependencies
// =============================================================
var express  = require ("express");
var bodyParser  = require ("body-parser");
var logger  = require ("morgan");
var mongoose  = require ("mongoose");
var session  = require ("express-session");
var passport = require ("passport");
var flash = require ('connect-flash');
var expressValidator = require ('express-validator');

// Require User Schema
var User = require ('./models/User.js');
var Group = require ('./models/Group.js');

//Require Tool Schema
var Tool = require ('./models/Tool.js');

// Create Instance of Express
var app = express();
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 8080;
// var PORT = 8080;

// ensure that public folder is the default for files
app.use(express.static("./public"));

// Run Morgan for Logging middleware
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


// MongoDB Configuration configuration
mongoose.connect("mongodb://localhost/toolshare");
var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// -------------------------------------------------

// Initialize Passport
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

//Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;
 
    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//connect flash - Flash is a special area of session used for storing meassages. Messages are written to the flash and cleared after being displayed to the user. 
app.use(flash());
app.use(function(req, res, next){
  //setting global vars
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();

  // Here we'll save the location based on the JSON input.
  // We'll use Date.now() to always get the current date time
  
});


require('./routes.js')(app);




// -------------------------------------------------
// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});