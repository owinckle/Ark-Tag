// Modules
import React, { Component } from "react";
import { render } from "react-dom";
import * as XLSX from "xlsx";

// Material Icons
import Download from '@mui/icons-material/Download';
import DarkMode from '@mui/icons-material/DarkMode';
import LightMode from '@mui/icons-material/LightMode';
import Add from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';

// CSS
import "./assets/app.css";
import "./assets/dark.css";

// Components
import Wrapper from "./layout/Wrapper";
import Container from "./layout/Container";
import Grid from "./layout/Grid";
import Navbar from "./components/Navbar/Navbar";
import Card from "./components/Card/Card";
import CardTable from "./components/Card/CardTable";

export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			darkMode: true,
			data: null,
			search: "",
			selectedItems: []
		}

		this.updateState	= this.updateState.bind(this);
		this.lightSwitch	= this.lightSwitch.bind(this);
		this.import			= this.import.bind(this);
		this.formatData		= this.formatData.bind(this);
		this.changeHandler	= this.changeHandler.bind(this);
		this.selectItem 	= this.selectItem.bind(this);
		this.removeItem = this.removeItem.bind(this);
		this.quantityHandler = this.quantityHandler.bind(this);
	}

	updateState(target, value) {
		this.setState({
			[target]: value
		});
	}

	changeHandler(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	lightSwitch() {
		this.setState({
			darkMode: this.state.darkMode ? false : true
		});
	}

	import() {
		let input = document.createElement("input");
		input.type = "file";
		input.onchange = _ => {
			const file = input.files[0];
			const reader = new FileReader();
			reader.onload = (evt) => {
				const bstr = evt.target.result;
				const wb = XLSX.read(bstr, {type : "binary"});
				const wsname = wb.SheetNames[0];
				const ws = wb.Sheets[wsname];
				const data = XLSX.utils.sheet_to_csv(ws, { header: 1});
				this.setState({
					data: this.formatData(data)
				});
			}
			reader.readAsBinaryString(file);
		}
		
		input.click();
	}

	formatData(csv) {
		var lines = csv.split("\n");
		var result = [];
		var headers = lines[0].split(",");
		
		for (var i = 1; i < lines.length; i++) {
			var obj = {};
			var currentline = lines[i].split(",");
			
			for (var j = 0; j < headers.length; j++) {
				obj[headers[j].trim()] = currentline[j];
			}
			result.push(obj);
		}
		return result;
	}

	selectItem(item) {
		const selectedItems = this.state.selectedItems;

		item["quantity"] = 0;
		selectedItems.push(item);
		this.setState({
			selectedItems: selectedItems
		});
	}

	removeItem(index) {
		const selectedItems = this.state.selectedItems;

		selectedItems.splice(index, 1);
		this.setState({
			selectedItems: selectedItems
		});
	}

	quantityHandler(e) {

	}

	render() {
		const data = this.state.data;
		const selectedItems = this.state.selectedItems;

		let items = [];
		if (data) {
			for (let i = 0; i < data.length; i++) {
				if (data[i].Référence) {
					items.push(
						<div key={i} className="table-row grid _6-grid">
							<div>{data[i]["Référence"]}</div>
							<div>{data[i]["Désignation"]}</div>
							<div>{data[i]["Tarif 1"]}</div>
							<div>{data[i]["Tarif 2"]}</div>
							<div>{data[i]["Tarif pro"]}</div>
							<Add className="center success" onClick={() => this.selectItem(data[i])} />
						</div>
					);
				}
			}
		}

		let selectedItemList = [];
		for (let i = 0; i < selectedItems.length; i++) {
			selectedItemList.push(
				<div key={i} className="table-row grid _3-grid">
					<div>{selectedItems[i]["Référence"]}</div>
					<input
						type="number"
						value={selectedItems[i].quantity}
						onChange={ (e) => this.quantityHandler(e)}
					/>
					<Delete className="center danger" onClick={() => this.removeItem(i)} />
				</div>
			)
		}

		return(
			<React.StrictMode>
				<Wrapper classes={ this.state.darkMode ? "wrapper dark" : "wrapper"}>
					<Navbar>
						<div>v1.0.0</div>
						<div className="icon-div">
							{this.state.darkMode ? <DarkMode onClick={this.lightSwitch} /> : <LightMode onClick={this.lightSwitch} />}
							<Download onClick={ this.import } />
						</div>
					</Navbar>
					<Container>
						<Grid size="2">
							<Card title="Sélections">
								<Grid size="3" extras="table-head">
									<div className="label">Référence</div>
									<div className="label">Quantité</div>
									<div className="label center">Action</div>
								</Grid>
								{selectedItemList}
							</Card>
							<Card title="Étiquettes">
							</Card>
						</Grid>

						<CardTable title="Données" placeholder="Recherche" searchName="search" searchValue={this.state.search} change={this.changeHandler}>
							<Grid size="6" extras="table-head">
								<div className="label">Référence</div>
								<div className="label">Désignation</div>
								<div className="label">T1</div>
								<div className="label">T2</div>
								<div className="label">T3</div>
								<div className="label center">Action</div>
							</Grid>
							{items}
						</CardTable>
					</Container>
				</Wrapper>
			</React.StrictMode>
		)
	}
}

render(<App />, document.getElementById("app"));