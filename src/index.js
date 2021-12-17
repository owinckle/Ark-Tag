// Modules
import React, { Component } from "react";
import { render } from "react-dom";
import * as XLSX from "xlsx";

// Material Icons
import Upload from '@mui/icons-material/Upload';
import DarkMode from '@mui/icons-material/DarkMode';
import LightMode from '@mui/icons-material/LightMode';
import Add from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';
import Close from '@mui/icons-material/Close';
import Edit from '@mui/icons-material/Edit';

// CSS
import "./assets/app.css";
import "./assets/tags.css";
import "./assets/dark.css";

// Components
import TitleBar from "./components/TitleBar/TitleBar";
import Wrapper from "./layout/Wrapper";
import Container from "./layout/Container";
import Grid from "./layout/Grid";
import Navbar from "./components/Navbar/Navbar";
import Card from "./components/Card/Card";
import CardTable from "./components/Card/CardTable";
import Tags from "./components/Tags/Tags";
import DefaultButton from "./components/Buttons/DefaultButton";
import PDFView from "./components/PDFView/PDFView";
import TemplateChaines from "./components/Templates/TemplateChaines";
import TemplateGros from "./components/Templates/TemplateGros";
import TemplateLots from "./components/Templates/TemplateLots";
import TemplateBacs from "./components/Templates/TemplateBacs";

export default class App extends Component {
	constructor() {
		super();

		this.state = {
			darkMode: false,
			data: null,
			search: "",
			selectedItems: [],
			tagsPreview: false,
			selectedTemplate: "chaines",
			pdfView: false,
			templateChaines: {
				ref: "{ref}",
				refFont: "12",
				produit: "{produit}",
				prodFont: "9",
				labelFont: "9",
				t1: "{prix}€ TTC la pièce",
				t2: "À partir de {qty} pièces {prix}€ TTC la pièce",
				t3: "À partir de {qty} pièces {prix}€ TTC la pièce",
			},
			templateGros: {
				ref: "{ref}",
				refFont: "12",
				produit: "{produit}",
				prodFont: "9",
				labelFont: "10",
				t1: "{prix}€ TTC la pièce",
				t2: "À partir de {qty} pièces {prix}€ TTC la pièce",
				t3: "À partir de {qty} pièces {prix}€ TTC la pièce"
			},
			templateLots: {
				ref: "{ref}",
				refFont: "12",
				produit: "{produit}",
				prodFont: "9",
				labelFont: "9",
				t1: "{prix}€ TTC la pièce",
			},
			templateBacs: {
				ref: "{ref}",
				refFont: "12",
				produit: "{produit}",
				prodFont: "9",
				labelFont: "9",
				t1: "{prix}€ TTC la pièce",
				t2: "À partir de {qty} pièces {prix}€ TTC la pièce",
				t3: "À partir de {qty} pcs {prix}€ TTC/pc"
			},
			editTemplate: false
		}

		this.lightSwitch	= this.lightSwitch.bind(this);
		this.import			= this.import.bind(this);
		this.formatData		= this.formatData.bind(this);
		this.changeHandler	= this.changeHandler.bind(this);
		this.selectItem 	= this.selectItem.bind(this);
		this.removeItem = this.removeItem.bind(this);
		this.quantityHandler = this.quantityHandler.bind(this);
		this.tagsPreviewSwitch = this.tagsPreviewSwitch.bind(this);
		this.updateState	= this.updateState.bind(this);
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
				const data = XLSX.utils.sheet_to_json(ws, { header: 1});
				this.setState({
					data: this.formatData(data)
				});
			}
			reader.readAsBinaryString(file);
		}
		
		input.click();
	}

	formatData(data) {
		let newData = [];

		for (let i = 1; i < data.length - 2; i += 3) {
			newData.push({
				ref: data[i][0],
				name: data[i][1],
				quantities: [data[i][2], data[i + 1][2], data[i + 2][2]],
				prices: [data[i][3], data[i + 1][3], data[i + 2][3]],
			});
		}

		return (newData);
	}

	selectItem(item) {
		const selectedItems = this.state.selectedItems;

		item.quantity = 0;
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

	quantityHandler(e, i) {
		let selectedItems = this.state.selectedItems;

		selectedItems[i].quantity = e.target.value;
		this.setState({
			selectedItems: selectedItems
		});
	}

	tagsPreviewSwitch() {
		let tagsPreview = this.state.tagsPreview;

		this.setState({
			tagsPreview: tagsPreview ? false : true
		});
	}

	render() {
		const data = this.state.data;
		const selectedItems = this.state.selectedItems;

		let selectedItemList = [];
		let selectedRef = [];
		for (let i = 0; i < selectedItems.length; i++) {
			selectedRef.push(selectedItems[i]["ref"]);
			selectedItemList.push(
				<div key={"selected-" + i.toString()} className="table-row grid _3-grid">
					<div>{selectedItems[i]["ref"]}</div>
					<input
						type="number"
						value={selectedItems[i].quantity}
						onChange={(e) => this.quantityHandler(e, i)}
					/>
					<Delete className="center danger" onClick={() => this.removeItem(i)} />
				</div>
			)
		}

		let items = [];
		if (data) {
			for (let i = 0; i < data.length; i++) {
				if (!selectedRef.includes(data[i]["ref"])) {
					if (data[i]["ref"].toLowerCase().includes(this.state.search.toLowerCase()) || this.state.search == "") {
						items.push(
							<div key={"product-" + i.toString()} className="table-row grid _6-grid">
								<div>{data[i]["ref"]}</div>
								<div>{data[i]["name"]}</div>
								<div>{data[i]["prices"][0]}</div>
								<div>{data[i]["prices"][1]}</div>
								<div>{data[i]["prices"][2]}</div>
								<Add className="center success" onClick={() => this.selectItem(data[i])} />
							</div>
						);
					}
				}
			}
		}

		let templateData = this.state.templateChaines;
		if (this.state.selectedTemplate == "gros") {
			templateData = this.state.templateGros;
		} else if (this.state.selectedTemplate == "lots") {
			templateData = this.state.templateLots;
		} else if (this.state.selectedTemplate == "bacs") {
			templateData = this.state.templateBacs;
		}

		return(
			<React.StrictMode>
				<Wrapper classes={ this.state.darkMode ? "wrapper dark" : "wrapper"}>
					<TitleBar title="El Etiquetor" />
					<Navbar>
						<div>v1.0.0</div>
						<div className="icon-div">
							{this.state.darkMode ? <DarkMode onClick={this.lightSwitch} /> : <LightMode onClick={this.lightSwitch} />}
							<Upload onClick={ this.import } />
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
								<div className="template-select">Template</div>
								<Wrapper classes="flex template-select-container">
									<select className="template" name="selectedTemplate" value={this.state.selectedTemplate} onChange={this.changeHandler}>
										<option value="chaines">Chaines</option>
										<option value="gros">Gros</option>
										<option value="lots">Lots</option>
										<option value="bacs">Bacs</option>
									</select>
									<Edit onClick={() => this.setState({editTemplate: true})} />
								</Wrapper>
								<Wrapper classes="flex">
									<DefaultButton action={this.tagsPreviewSwitch} label="Aperçu" />
									<DefaultButton action={() => this.setState({ pdfView: true })} label="Générer" />
								</Wrapper>
							</Card>
						</Grid>

						<CardTable title="Produits" placeholder="Recherche" searchName="search" searchValue={this.state.search} change={this.changeHandler}>
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

					<Tags
						icon={<Close onClick={this.tagsPreviewSwitch}/>}
						show={this.state.tagsPreview}
						tags={this.state.selectedItems}
						template={this.state.selectedTemplate}
						templateData={templateData}
					/>

					{this.state.editTemplate && this.state.selectedTemplate == "chaines" ?
						<TemplateChaines
							onClose={() => this.setState({editTemplate: false})}
							data={templateData}
							save={this.updateState} />
						: null
					}

					{this.state.editTemplate && this.state.selectedTemplate == "gros" ?
						<TemplateGros
							onClose={() => this.setState({ editTemplate: false })}
							data={templateData}
							save={this.updateState} />
						: null
					}

					{this.state.editTemplate && this.state.selectedTemplate == "lots" ?
						<TemplateLots
							onClose={() => this.setState({ editTemplate: false })}
							data={templateData}
							save={this.updateState} />
						: null
					}

					{this.state.editTemplate && this.state.selectedTemplate == "bacs" ?
						<TemplateBacs
							onClose={() => this.setState({ editTemplate: false })}
							data={templateData}
							save={this.updateState} />
						: null
					}
				</Wrapper>
				{this.state.pdfView ?
					<PDFView
						onClose={() => this.setState({pdfView: false})}
						tags={this.state.selectedItems}
						data={templateData}
						template={this.state.selectedTemplate}
					/>
					: null
				}
			</React.StrictMode>
		)
	}
}

render(<App />, document.getElementById("app"));