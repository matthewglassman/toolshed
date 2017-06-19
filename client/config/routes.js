// Inclue the React library
var React = require("react");

// Include the react-router module
var router = require("react-router");

// Include the Route component for displaying individual routes
var Route = router.Route;

// Include the Router component to contain all our Routes
// Here where we can pass in some configuration as props
var Router = router.Router;

// Include the hashHistory prop to handle routing client side without a server
// https://github.com/ReactTraining/react-router/blob/master/docs/guides/Histories.md#hashhistory
var hashHistory = router.hashHistory;

// Include the IndexRoute (catch-all route)
var IndexRoute = router.IndexRoute;

//Reference the high level components
var Login = require("../src/Login");
var SignUp = require("../src/SignUp");
var SignUpPossible = require("../src/SignUpPossible");
var Borrow = require("../src/Borrow");
var AddTool = require("../src/AddTool");
var MyTools = require("../src/MyTools");
var BorrowModal = require("../src/BorrowerModal");
var AddToolModal = require("../src/AddToolModal");

module.exports = (

	<Router history={hashHistory}>
		


	</Router>

);