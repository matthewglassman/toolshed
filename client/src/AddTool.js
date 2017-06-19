import React, { Component } from 'react';
import {
	Button
} from 'react-bootstrap/lib/';

import axios from 'axios';

class AddTool extends Component {

	constructor(props) {
		super(props);

		this.state = {
			toolName: "",
			toolPriceInput: "",
			toolCondition: "",
			toolMaxDays: "",
			toolUrl: ""
		};
	
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleName = this.handleName.bind(this);
		this.handlePrice = this.handlePrice.bind(this);
		this.handleCondition = this.handleCondition.bind(this);
		this.handleMaxDays = this.handleMaxDays.bind(this);
		this.handleUrl = this.handleUrl.bind(this);
		this.addTool = this.addTool.bind(this);	
	}

	componentWillMount(){

		console.log("inside Component Did Mount Add tool");
		axios.post("/isUserLoggedIn", {
		})
		.then ((response) => {
			console.log("response to check user log in status = " + response.data);
			if (!response.data) {
				console.log("go back to home page");
				window.location.href = 'http://localhost:3000/';
			}
		})
	}
	
	handleSubmit(event) {
		// event.preventDefault();
		//call addTool function
		this.addTool(this.state.toolName, this.state.toolPrice, this.state.toolCondition, this.state.toolMaxDays, this.state.toolUrl);
		//Reset the state of the component
		this.setState = {
			toolName: "",
			toolPrice: "",
			toolCondition: "",
			toolMaxDays: "",
			toolUrl: ""
		};		
	}

	handleName(event) {
		this.setState({ toolName: event.target.value });
		console.log(this.state.toolName);
	}

	handlePrice(event) {
		this.setState({ toolPrice: event.target.value });
	}

	handleCondition(event) {
		this.setState({ toolCondition: event.target.value });
	}

	handleMaxDays(event) {
		this.setState({ toolMaxDays: event.target.value });
	}

	handleUrl(event) {
		this.setState({ toolUrl: event.target.value });
	}

	addTool(name, price, condition, max, url) {
		console.log("addTool in component ran");
		console.log(name, price, condition);
		axios.post("/submitTool", {
			toolName: name,
			toolPrice: price,
			toolCondition: condition,
			toolMaxDays: max,
			toolUrl: url
		})
		.then(function(response){
			console.log(response);
		})
		.catch(function(err){
			console.log(err);
		})
	}

	render(){
		
		return(
			<div className="AddTool container overlay">
				<h1>Add A Tool</h1>

				<form onSubmit={this.handleSubmit}>
					<div className="form-group" id="half">
						<label for="toolNameInput">Tool</label>
						<input 
							type="text"
							id="toolNameInput"
							className="form-control"
							onChange={this.handleName}
							placeholder="Lawn Mower"
							value={this.state.toolName}
							required
						/>
						<label for="toolPriceInput">Cost To Replace</label>						
						<input 
							type="text"
							className="form-control"
							id="toolPriceInput"
							onChange={this.handlePrice}
							placeholder="$200"
							value={this.state.toolPrice}
							required
						/>	
						<label for="toolConditionInput">Tool Condition</label>						
						<input 
							type="text"
							className="form-control"
							id="toolConditionInput"
							onChange={this.handleCondition}
							placeholder="Lightly Used"
							value={this.state.toolCondition}
							required
						/>	
						<label for="toolMaxInput">Max # of Days To Lend</label>						
						<input 
							type="text"
							className="form-control"
							id="toolMaxInput"
							onChange={this.handleMaxDays}
							placeholder="7"
							value={this.state.toolMaxDays}
							required
						/>
						<label for="toolUrlInput">Image URL</label>						
						<input 
							type="text"
							className="form-control"
							id="toolUrlInput"
							onChange={this.handleUrl}
							placeholder="http://image.jpg"
							value={this.state.toolUrl}
							required
						/>	
						<br/>
						<Button type="submit" bsSize="large" bsStyle="primary">Add Tool</Button>
					</div>
				</form>

			</div>	

		);
	}
}

export default AddTool;