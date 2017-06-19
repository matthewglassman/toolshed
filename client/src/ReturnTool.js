import React, { Component } from 'react';
import axios from 'axios';
import { 
	Button,
	ButtonGroup
} from 'react-bootstrap/lib/';

class ReturnTool extends Component {

	constructor(props) {
		super(props);

		this.state= {
			returnableTools: [],
			update: false
		};

		this.componentDidMount = this.componentDidMount.bind(this);
		this.componentDidUpdate = this.componentDidUpdate.bind(this);
		this.getReturnable = this.getReturnable.bind(this);
		this.returnTool = this.returnTool.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount () {
		this.getReturnable();
	}

	componentWillMount(){

		console.log("inside Component Did Mount Return tool");
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

	componentDidUpdate (prevState, prevProps) {

		if(this.state.update){
			this.getReturnable();
			this.setState({ update: false });
		}

	}

	getReturnable () {
		var returnable = [];

		axios.get("/returnableTools", {}).then((response)=>{

			for(var i=0; i<response.data.length; i++){
				returnable.push(response.data[i]);
			}
			// console.log("getReturnable result: " +JSON.stringify(returnable));
			this.setState({ returnableTools: returnable });
			// console.log(this.state.returnableTools);			
		});
	}	

	returnTool (tool) {

		axios.post("returnableTools", {id: tool._id})
			.then(function(response){
				console.log(response);
			}).catch(function(err){
				console.log(err);
			})
	
	}

	handleClick (i) {

		var tools = this.state.returnableTools;
		var toolToReturn = tools[i];
		this.returnTool(toolToReturn);
		this.setState({ update: true });


	}

	render(){
		return(
			<div className="ReturnTool container overlay">
				<h1>Return A Tool</h1> <br/>
				<div className="thumbnails">
					{this.state.returnableTools.map(function(search, i){
						return (
							<div className="col-md-4 col-xs-6">
								<div className="thumbnail">
									<div className="img-container">
										<img src={search.toolUrl} className="img-responsive" alt={search.toolName} />
									</div>
									<div className="caption">
										<h3>{search.toolName}</h3>
										<p>Owner: {search.toolOwnerName}</p>
										<p>Condition: {search.toolCondition}</p>
										<ButtonGroup >
											<Button
												bsStyle="primary"
												value={i}
												onClick={() => this.handleClick(i)}
											>
												Return
											</Button>	
										</ButtonGroup>
									</div>		
								</div>
							</div>
						)
					}, this)}
				</div>				
			</div>
		);
	}
}

export default ReturnTool;