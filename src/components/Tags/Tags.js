export default function Tags(props) {
	const template = props.template;
	const modalClasses = props.show ? "tags-modal show" : "tags-modal";
	const tags = props.tags;
	const templateData = props.templateData;
	let tagList = [];
	let pages = [];
	let itemCounter = 0;

	for (let i = 0; i < tags.length; i++) {
		for (let y = 0; y < tags[i].quantity; y++) {
			itemCounter++;

			// Titles
			let ref = templateData.ref.replace("{ref}", tags[i]["ref"]);
			let produit = templateData.produit.replace("{produit}", tags[i]["name"]);

			// Labels
			let t1 = templateData.t1.replace("{prix}", tags[i]["prices"][0].replace(".", ","));
			let t2, t3;
			t1 = t1.replace("{qty}", parseInt(tags[i]["quantities"][0]));
			if (template != "lots") {
				t2 = templateData.t2.replace("{prix}", tags[i]["prices"][1].replace(".", ","));
				t3 = templateData.t3.replace("{prix}", tags[i]["prices"][2].replace(".", ","));
				t2 = t2.replace("{qty}", parseInt(tags[i]["quantities"][1]));
				t3 = t3.replace("{qty}", parseInt(tags[i]["quantities"][2]));
			}

			// Tags creation
			if (template != "lots") {
				tagList.push(
					<div key={i.toString() + "-" + y.toString()} className={"tag " + template}>
						<div style={{fontSize: templateData.refFont + "px"}} className="ref">{ref}</div>
						<div style={{fontSize: templateData.prodFont + "px"}} className="name">{produit}</div>
						<div>
							<div style={{fontSize: templateData.labelFont + "px"}} className="label">{t1}</div>
							<div style={{fontSize: templateData.labelFont + "px"}} className="label">{t2}</div>
							<div style={{fontSize: templateData.labelFont + "px"}} className="label highlight">{t3}</div>
						</div>
					</div>
				);
			} else {
				tagList.push(
					<div key={i.toString() + "-" + y.toString()} className={"tag " + template}>
						<div style={{ fontSize: templateData.refFont + "px" }} className="ref">{ref}</div>
						{produit != "" ?
							<div style={{ fontSize: templateData.prodFont + "px" }} className="name">{produit}</div>
						: null}
						{t1 != "" ?
							<div style={{ fontSize: templateData.labelFont + "px" }} className="label">{t1}</div>
						: null}
					</div>
				);
			}

			// Generate Page
			const pageChaines = itemCounter == 40 && template == "chaines";
			const pageGros = itemCounter == 21 && template == "gros";
			const pageLots = itemCounter == 65 && template == "lots";
			const pageBacs = itemCounter == 44 && template == "bacs";
			if (pageChaines || pageGros || pageLots || pageBacs) {
				pages.push(
					<div className="tags-container">
						<div className={"row " + template}>
							{tagList}
						</div>
					</div>
				);
				itemCounter = 0;
				tagList = [];
			}
		}
	}

	// Generate last page
	const lastChaines = itemCounter < 40 && template == "chaines";
	const lastGros = itemCounter < 21 && template == "gros";
	const lastLots = itemCounter < 65 && template == "lots";
	const lastBacs = itemCounter < 44 && template == "bacs";

	let ec = 0;
	if (template == "gros") {
		ec = tagList.length % 3 != 0 ? 3 - (tagList.length % 3) : 0;
	} else if (template == "lots") {
		ec = tagList.length % 5 != 0 ? 5 - (tagList.length % 5) : 0;
	} else if (template == "bacs") {
		ec = tagList.length % 4 != 0 ? 4 - (tagList.length % 4) : 0;
	}
	let extras = Array(ec).fill(<div className={"tag extra " + template}></div>);

	if (((lastChaines || lastGros || lastLots || lastBacs) && itemCounter != 0) || tagList.length == 0) {
		pages.push(
			<div className="tags-container">
				<div className={"row " + template}>
					{tagList}
					{extras}
				</div>
			</div>
		);
	}

	return (
		<div className={modalClasses}>
			<div className="head">
				<div className="title">Aperçu</div>
				{props.icon}
			</div>
			{pages}
		</div>
	);
		
}
