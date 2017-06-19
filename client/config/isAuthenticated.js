module.exports = function(req, res, next) {
  // If the user is logged in, continue with the request to the restricted route
  console.log("in auth: " + req.user);

  if (req.user) {
    return true;
  }

  // If the user isnt' logged in, redirect them to the login page
  return false;
};