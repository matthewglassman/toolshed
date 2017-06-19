import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import axios from "axios";

import Greeting from './Greeting';

// import '../node_modules/elemental/less/elemental.less'
// import { Button, Alert, Spinner } from 'elemental' 

class App extends Component {

	render() {
		return <Greeting />
			
		// const isLoggedIn = this.props.isLoggedIn;
		// console.log(isLoggedIn)
    // 	if (this.props.isLoggedIn) {
    // 		return <MyTools />;
  		// return this.props.children


  		// <div> <Button onClick={this.toggleModal}>Launch Modal</Button>
  		// <Greeting /></div>
  	}
}

export default App;
