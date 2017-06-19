import React, { Component } from 'react';
import './CreateGroup.css';
import axios from "axios";

class CreateGroup extends Component {
	constructor (props) {
		super(props);
		this.state = { groupNameRecd:"" };
		this.handleGroupNameChange = this.handleGroupNameChange.bind(this);
		this.createGroupInDb = this.createGroupInDb.bind(this);
	}

	handleGroupNameChange(e) {
		this.setState({ groupNameRecd: e.target.value });
	}

  createGroupInDb() {

	  console.log("button clicked to create group ");
	  return axios.post("/createGroup", {
	      groupName: this.state.groupNameRecd
	  })
	  .then(function (response) {
	   	console.log(response);
	  })
	  .catch(function (error) {
	    console.log("error", error);
	  });
}

	render() {
		let groupNameEntered;
    return (
      <div className="SignUp">
      	<h2> Enter Group Name </h2>
        <fieldset className="signUpTexts">
          <legend> Please enter here </legend>
          <input value={groupNameEntered} onChange={this.handleGroupNameChange} placeholder="group name" />
          <br/><br/>
        </fieldset>
        <br/>
        <div className="col-sm-06 buttonColumn">
          <button className="buttonClass" onClick={this.createGroupInDb}>Submit</button>
        </div>
      </div>
    );
	}
}

export default CreateGroup;