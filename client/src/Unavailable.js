import React, { Component } from 'react';

class Unavailable extends Component {

	constructor(props) {
		super(props);

		this.state= {
			unavailableTools: this.props.unavailableTools
		};

		this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
	}

	componentWillReceiveProps (nextProps) {
		if(nextProps.unavailableTools !== this.state.unavailableTools){
			this.setState({ unavailableTools: nextProps.unavailableTools });
		}
	}

	
	render(){
		return(
			<div className="unavailable container col-md-12">
				<h2>Rented Tools</h2>
					<div className="thumbnails">
						{this.state.unavailableTools.map(function(search, i){
							return (
								<div className="col-md-4 col-xs-6">
									<div className="thumbnail">
										<div className="img-container">
											<img src={search.toolUrl} className="img-responsive" alt={search.toolName} />
										</div>
										<div className="caption">
											<h3>{search.toolName}</h3>
											<p>Owner: {search.toolOwnerName}</p>
											{/*<p>Condition: {search.toolCondition}</p>*/}
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

export default Unavailable;