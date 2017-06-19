
// Require User Schema
var User  = require ( './models/User');
var Group  = require ( './models/Group');

//Require Tool Schema
var Tool  = require ( './models/Tool');
var passport = require ( "./src/config/passport.js");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("./src/config/isAuthenticated");

module.exports = function (app) {

  // Main "/" Route. This will redirect the user to our rendered React application
  app.get('/', function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
  });

  // ---------- Home Page ----------
  // SIGNING IN
  // This is the route we will send POST requests for logging in.
  app.post("/checkLogin", passport.authenticate("local"), function(req, res, next) {
    if (req.user.id) {
      res.json(req.user.id);
    }
    else {
      res.json(false)
    }
  });

  app.get("/checkLogin", function(req, res) {

    if (req.user) {
      return req.user;
    }
  });

  // Not working
  // app.get('/logout', function(req, res){
  //   req.logout();
  //   console.log(req.user)
  // });

  // We will call this route the moment our page gets rendered (used in all pgs)
  app.post("/isUserLoggedIn", function(req, res) {
    console.log("inside isUserLoggedIn");
    if (req.user) {
      res.json(true);
    } else {
      res.json(false);
    }
  });

  // Duplicate code
  // app.post("/isUserLoggedIn", (req, res) => {
  //   console.log("inside isUserLoggedIn in routes ");
  //   if (req.user) {
  //     console.log("user is logged in");
  //     res.json(true);
  //   } else {
  //     console.log("no user ");
  //     res.json(false);
  //   }
  // });

  // SIGNING UP
  // This is the route we will send POST requests to save user data to db.
  app.post("/submitUser", (req, res) => {
    console.log("BODY: ", req.body);
    console.log(req.body.groupNew);
    console.log(req.body.groupName);
    var groupIdReceived;
    // check to see if this is a new Group Name
    if (req.body.groupNew) {
      console.log("new group requested " + req.body.groupName);
      Group.create({
        groupName: req.body.groupName,
        date: Date.now()
      }, (err, createdGroup) => {
        if (err) {
          console.log("error creating group ", err);
        }
        else {
          console.log("newly created group");
          console.log(createdGroup);
          User.create({
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            groupId:createdGroup._id,
            userCreatedDate: Date.now()
          }, (err, createdUser) => {
            if (err) {
              console.log("error saving user ", err);
            }
            else {
              console.log("passport is in sign up for new group")
              passport.authenticate('local')(req, res, function () {
                res.json(createdUser);
              });
              
            }
          });
        }
      });
    }
    else {
      Group.find({
        "groupName": req.body.groupName
      }).exec( (err, group) => {
        if(err){
          console.log("error finding group");
        }
        else {
          console.log("group[0]._id");
          console.log(group);
          console.log(group[0]._id);
          groupIdReceived = group[0]._id;

          User.create({
              email: req.body.email,
              password: req.body.password,
              confirmPassword: req.body.confirmPassword,
              firstName:req.body.firstName,
              lastName:req.body.lastName,
              groupId:groupIdReceived, // dummy data
              userCreatedDate: Date.now()
          }, (err) => {
            if (err) {
              console.log("error saving user ", err);
            }
            else {
              console.log("passport in old group");
              passport.authenticate('local')(req, res, function () {
                console.log("inside old group, passport")
                console.log(req.user)
                res.send("Saved User");
              });
              
            }
          });
        }
      })
    }
  });

  // This is the route we will send POST requests to save a group name to db.
  app.post("/createGroup", function(req, res) {
    // console.log("BODY: " + req.body);
    // console.log("req.user.id");
    // console.log(req.user.id);

    // Here we'll save the group name based on the JSON input.
    // We'll use Date.now() to always get the current date time
    Group.create({
      groupName: req.body.groupName,
      date: Date.now()
    }, function(err) {
      if (err) {
        console.log(err);
      }
      else {
        res.send("Saved Group Name");
      }
    });
  });

  // This is the route we will send GET list of groups in the Data Base.
  app.get("/getGroups", function(req, res) {
    console.log("got into getGroups GET in Server");
    // We'll use Date.now() to always get the current date time
    Group.find({}, function(err, groups) {
      if (err) {
        res.json(err);
      }
      else {
        res.json(groups);
      }
    });
  });

  // ---------- ADD A TOOL ----------
  //Add tool to database
  app.post("/submitTool", function(req, res){
    // console.log("addTool BODY: ");
    // console.log(req.body);
    // console.log("inside submit tool");
    // console.log(req.user.firstName)

    // var user = "e201";

    Tool.create({
      toolName: req.body.toolName,
      toolPrice: req.body.toolPrice,
      toolCondition: req.body.toolCondition,
      toolStatus: true,
      toolHeldBy: req.user.id,
      toolMaxDays: req.body.toolMaxDays,
      toolUrl: req.body.toolUrl,
      toolOwner: req.user.id,
      toolOwnerName: req.user.firstName,
      toolCreateDate: Date.now()   
    }, function(err){
      if(err) {
        console.log(err);
      } else {
        res.send("Saved Tool")
      }
    })

  });

  // ---------- AVAILABLE.JS ----------
  app.get("/getTools", function(req, res){
    Tool.find({}).exec(function(err, doc){
      if(err){
        console.log(err);
      }else{
        console.log(doc);
        res.send(doc);
      }
    });
  });  

  app.post("/borrowTool", function(req, res){
    var id = req.body.id;
    var user = req.user.id;
    console.log("User");
    console.log(user);
    console.log("Tool ID " +id);

    Tool.findOneAndUpdate({
      _id: id
    }, { $set: {
      toolHeldBy: user,
      toolStatus: false
    }}, function(err, doc){
      if(err){
        console.log(err);
      } else {
        console.log(doc);
      }
    });
  });

  // ---------- MY TOOLS ----------
  // This is the route we will send GET list of tools in the Data Base.
  app.get("/getMyTools", function(req, res) {
    // console.log("got into getMytools GET in Server");
    // We'll use Date.now() to always get the current date time
    // console.log(req.user.id);
    Tool.find({
      toolOwner : req.user.id
    }, function(err, tools) {
      if (err) {
        console.log("error finding tools");
        res.json(err);
      }
      else {
        console.log("sending tools");
        console.log(tools);
        res.json(tools);
      }
    });
  });

  // ---------- RETURN A TOOL ----------
  app.get("/returnableTools", function(req, res){
    var user = req.user.id;

    Tool.find({
      toolHeldBy: user,
      toolStatus: false
    }).exec(function(err, doc){
      if(err){
        res.json(err);
      }else{
        res.send(doc);
      }
    })
  });

  app.post("/returnableTools", function(req, res){
    var id = req.body.id;

    Tool.findOneAndUpdate({
      _id: id
    }, {$set:{
      toolHeldBy: this.toolOwner,
      toolStatus: true
    }}, function(err, doc){
      if(err){
        console.log(err);
      } else {
        console.log(doc);
      }      
    });    
  });

}