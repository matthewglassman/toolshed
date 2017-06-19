import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	NavLink,
	Switch
} from 'react-router-dom';
import ReactDOM from 'react-dom';

// Navbar Pages
import MyTools from "./MyTools";
import AddTool from "./AddTool";
import BorrowTool from "./BorrowTool";
import ReturnTool from "./ReturnTool";
// import ReplaceTool from "./ReplaceTool";

import SignUp from './SignUp';
import Greeting from './Greeting';

// import App from './App';

// import CreateGroup from "./CreateGroup";

//import createBrowserHistory from 'history/createBrowserHistory';
//const history = createBrowserHistory();

ReactDOM.render(
	
  <Router>

    <div>
		<nav className="navbar navbar-default">
			<div className="container-fluid container">
			    <div className="navbar-header">
			      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
			        <span className="sr-only">Toggle navigation</span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>      
			      </button>
			      <a className="navbar-brand" href="/"><span className="logo1">Tool</span><span className="logo2">Share</span></a>
			    </div>
			    <div id="navbar" className="navbar-collapse collapse">
			      <ul className="nav navbar-nav pull-right">
			        <li><NavLink activeClassName="activeNav" to="/getMyTools">My Tools</NavLink></li>
			        <li><NavLink activeClassName="activeNav" to="/addtool">Add a Tool</NavLink></li>
			        <li><NavLink activeClassName="activeNav" to="/borrowtool">Borrow a Tool</NavLink></li>
			        <li><NavLink activeClassName="activeNav" to="/returntool">Return a Tool</NavLink></li>
			        {/*<li><NavLink to="">Welcome {WelcomeName}</NavLink></li>*/}
			      </ul>
			    </div>
			</div>
		</nav>

		<Switch>
			<Route exact path="/" component={Greeting}> ></Route>
			<Route path="/submitUser" component={SignUp} history={history} ></Route>

			{/*<Route path="/createGroup" component={CreateGroup}></Route>*/}
			<Route path="/addtool" component={AddTool}></Route>
			<Route path="/borrowtool" component={BorrowTool}></Route>
			<Route path="/getMyTools" component={MyTools}></Route>
			<Route path="/returntool" component={ReturnTool}></Route>
      		{/*<Route path="/replacetool" component={ReplaceTool}></Route>*/}
		    
 		</Switch>
    </div>

  </Router>

	,
	document.getElementById('root')
);
