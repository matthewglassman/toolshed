var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt-nodejs");
var hash;

var UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  confirmPassword: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  toolsOwned: [{

    type: Schema.Types.ObjectId,
    ref: "Tool"
  }], 
  groupId: {
    type: String
    // use Group ID from the Group table
  },
  userCreatedDate: {
    type:Date
  }
});

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.pre("save", function(next) {
  const user = this;

  // runs only if pw is modified or user is new
  if (!user.isModified("password")) {
    return next();
  }

  bcrypt.hash(user.password, null, null, function(err, hash) {
    if (err) {
      next()
    }
    user.password = hash;
    next();
  })
});


// Create user model
var User = mongoose.model("User", UserSchema);
module.exports = User;
