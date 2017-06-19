import React, { Component } from 'react';
import Available from "./Available";

class BorrowTool extends Component {
	render(){
		return(
			<div className="BorrowTool container overlay">
				<h1>The Toolshed</h1>
				<Available />
			</div>
		);
	}
}

export default BorrowTool;