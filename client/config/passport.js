var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var User = require("../../models/User");

// Telling passport we want to use a Local Strategy. In other words, we want to login with email and password
passport.use(new LocalStrategy(
  // Our user will sign in using an email, rather than a "username"
  {
    usernameField: "email",
    passwordField: "password"
  }
,  function(email, password, done) {
    // When a user tries to sign in this code runs
    User.findOne({email: email}, function(err, User) {
      // console.log("inside passport.js")

      if (err) { return done(err); }

      // If there's no user with the given email
      if (!User) {
      	console.log("User doesn't exist");
        return done(null, false, {
          message: "Email not recognized."
        });
      }

      // If there is a user with the given email, but the password the user gives us is incorrect
      if (!User.validPassword(password)) {
      	console.log("Password failed (inside passport)");
        return done(null, false, {
          message: "Incorrect password."
        });
      }

	   console.log("Password matches!");

      // If none of the above, return the user
      return done(null, User, {
        message: "SUCCESS!"
      });
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

module.exports = passport;