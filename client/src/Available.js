import React, { Component } from 'react';
import axios from 'axios';
import Unavailable from "./Unavailable";

import { 
	Modal,
	Button,
	ButtonGroup,
	ListGroup,
	ListGroupItem,
	Thumbnail
} from 'react-bootstrap/lib/';


class Available extends Component {

	constructor(props) {
		super(props);

		this.state= {
			availableTools: [],
			unavailableTools: [],
			update: false,
			showModal: false,
			currentTool: {
				toolUrl: '',
				toolOwnerName: '',
				toolCondition: '',
				toolMaxDays: '',
				toolName: '',
				toolPrice: ''
			}
		};

		this.componentDidMount = this.componentDidMount.bind(this);
		this.componentDidUpdate = this.componentDidUpdate.bind(this);
		this.getAvailable = this.getAvailable.bind(this);
		this.getUnavailable = this.getUnavailable.bind(this);
		this.borrowTool = this.borrowTool.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.open = this.open.bind(this);
    	this.close = this.close.bind(this);
	}	

	componentDidMount () {
		this.getAvailable();
		this.getUnavailable();
	}

	getAvailable () {
		var available = [];

		axios.get("/getTools", {}).then((response)=>{
			for(var i=0; i<response.data.length; i++){
				if(response.data[i].toolStatus){
					available.push(response.data[i]);
				}
			}

			console.log("getAvailable result: " +JSON.stringify(available));
			this.setState({ availableTools: available });
			console.log("this.state.availableTools: ")
			console.log(this.state.availableTools);
		});
	
	}

	getUnavailable () {
		var unavailable = [];

		axios.get("/getTools", {}).then((response)=>{
			//console.log(response);
			for(var i=0; i<response.data.length; i++){
				if(!response.data[i].toolStatus){
					unavailable.push(response.data[i]);
				}
			}
			console.log("getUnavailable result: " +JSON.stringify(unavailable));
			this.setState({ unavailableTools: unavailable });
			console.log(this.state.unavailableTools);
		});	
	}

	componentDidUpdate (prevState, prevProps) {

		if(this.state.update){
			this.getAvailable();
			this.getUnavailable();
			this.setState({ update: false });
		}

	}

	handleClick (i) {

		var tools = this.state.availableTools;

		var toolToBorrow = tools[i];

		this.borrowTool(toolToBorrow);
		this.setState({ update: true });
	}

	borrowTool (tool) {

		axios.post("/borrowTool", {id: tool._id})
			.then(function(response){
				console.log(response);
			}).catch(function(err){
				console.log(err);
			})

	}

	open(event) {

		var value = event.target.value;
		var currentToolObj = this.state.availableTools[value];
		
		this.setState({toolUrl: currentToolObj.toolUrl});
		this.setState({toolOwnerName: currentToolObj.toolOwnerName});
		this.setState({toolCondition: currentToolObj.toolCondition});
		this.setState({toolMaxDays: currentToolObj.toolMaxDays});
		this.setState({toolName: currentToolObj.toolName});
		this.setState({toolPrice: currentToolObj.toolPrice});

        this.setState({showModal: true});
    }

    close() {
        this.setState({showModal: false});
    }

 
	render(){
		return(
			<section>
				<div className="available container row thumbnail">
					<h2>Available Tools</h2>
						{this.state.availableTools.map(function(search, i){
							return (
								<div className="col-md-4 col-xs-6">
									<div className="thumbnail">
										<div className="img-container">
											<img src={search.toolUrl} className="img-responsive" alt={search.toolName}/>
										</div>
										<div className="caption">
											<h3>{search.toolName}</h3>
											<p>Owner: {search.toolOwnerName}</p>
											{/*<p>Condition: {search.toolCondition}</p>*/}
											<ButtonGroup>
												<Button
													bsStyle="primary"
													value={i}
													onClick={() => this.handleClick(i)}
												>
													Borrow
												</Button>	
												<Button
													value={i}
													onClick={this.open}
												>
													More Info
												</Button>
											</ButtonGroup>
										</div>		
									</div>	
								</div>
							)
						}, this)}
				</div>
				<Modal show={this.state.showModal} onHide={this.close} bsSize="small" aria-labelledby="contained-modal-title-sm">
					<Modal.Header>
						<h2 className="black">{this.state.toolName}</h2>
					</Modal.Header>
					<Modal.Body>
						<ListGroup className="left">
							<ListGroupItem><Thumbnail src={this.state.toolUrl} /></ListGroupItem>
							<ListGroupItem><u>Owner</u> <br/>
								{this.state.toolOwnerName}</ListGroupItem>
							<ListGroupItem><u>Condition</u> <br/>
								{this.state.toolCondition}</ListGroupItem>
						    <ListGroupItem><u>Damage/Lost Price</u> <br/>
						    	${this.state.toolPrice}</ListGroupItem>
						    <ListGroupItem><u>Max # of Days To Rent</u> <br/>
						    	{this.state.toolMaxDays}</ListGroupItem>
						</ListGroup>
						<Button onClick={this.close}>Close</Button>
                    </Modal.Body>
				</Modal>

				<Unavailable unavailableTools={this.state.unavailableTools} />
			</section>	
		);
	}
}

export default Available;