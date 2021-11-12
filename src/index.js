import React, { Component } from "react";
import { render } from "react-dom";
import "./assets/app.css";
import "./assets/utils.css";

export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeModule: "dashboard"
		}

		this.updateState	= this.updateState.bind(this);
	}

	updateState(target, value) {
		this.setState({
			[target]: value
		});
	}

	render() {
		return(
			<React.StrictMode>
				<div className="module grid-layout _2-grid">

					<div className="content">
						<div className="header">
							<div className="title">All Items</div>
							<span className="material-icons">add</span>
						</div>
						<div className="body">
							<input
								className="text-field"
								placeholder="Search..."
							/>
						</div>
					</div>

					<div className="content">
						<div className="header">
							<div className="title">Selected Items</div>
							<span className="material-icons">save</span>
						</div>
					</div>
				</div>
			</React.StrictMode>
		)
	}
}

render(<App />, document.getElementById("app"));