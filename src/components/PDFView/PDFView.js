// Modules
import { Component } from "react";
import ReactDOM from "react-dom";

export default class PDFView extends Component {
    constructor(props) {
        super(props);

        this.containerEl = document.createElement("div");
        this.externalWindow = null;
    }

    componentDidMount() {
        this.externalWindow = window.open("", "PDFView");

        if (this.externalWindow) {
            this.externalWindow.document.body.appendChild(this.containerEl);
            this.externalWindow.document.body.style.margin = "0px";
            this.externalWindow.document.body.style.overflowX = "hidden";

            var style = this.externalWindow.document.createElement("style");
            style.type = "text/css";
            style.appendChild(this.externalWindow.document.createTextNode(`
                @page{margin:0}
                .ref{font-size: 12px}
                .name{font-size: 9px}
                .label{font-size: 10px}
                .row {
                    display: flex;
                    position: relative;
                    flex-wrap: wrap;
                    left: 1px;
                    fontfamily: 'Calibri', sans-serif;
                    letterSpacing: 1px;
                }
                .tag {
                    text-align: center;
                    outline: 1px dotted #000;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }
                .tag.chaines {
                    width: 5.25cm;
                    height: 2.97cm;
                }
                .tag.gros {
                    width: 6.35cm;
                    height: 3.81cm;
                    margin-top: 1.51cm;
                    margin-left: 0.72cm;
                }
                .tag.gros:nth-child(3n+1) {
                    margin-left: 0cm;
                }
                .tag.gros:nth-child(1),
                .tag.gros:nth-child(2),
                .tag.gros:nth-child(3) {
                    margin-top: 0px;
                }

                .tag.lots {
                    width: 3.8cm;
                    height: 2.12cm;
                    margin-top: 1.07cm;
                    margin-left: .5cm;
                }
                .tag.lots:nth-child(5n+1) {
                    margin-left: 0cm;
                }
                .tag.lots:nth-child(1),
                .tag.lots:nth-child(2),
                .tag.lots:nth-child(3),
                .tag.lots:nth-child(4),
                .tag.lots:nth-child(5) {
                    margin-top: 0px;
                }

                .tag.bacs {
                    width: 4.84cm;
                    height: 2.54cm;
                    margin-top: 0.85cm;
                    margin-left: 0.52cm;
                }
                .tag.bacs:nth-child(4n+1) {
                    margin-left: 0cm;
                }
                .tag.bacs:nth-child(1),
                .tag.bacs:nth-child(2),
                .tag.bacs:nth-child(3),
                .tag.bacs:nth-child(4) {
                    margin-top: 0px;
                }
            `));
            this.externalWindow.document.getElementsByTagName('head')[0].appendChild(style);

            this.externalWindow.onunload = () => this.props.onClose();
        }
    }

    render() {
        const tags = this.props.tags;
        const template = this.props.template;

        let tagList = [];
        for (let i = 0; i < tags.length; i++) {
            for (let y = 0; y < tags[i].quantity; y++) {
                if (template == "chaines" || template == "gros" || template == "bacs") {
                    let ref = this.props.data.ref.replace("{ref}", tags[i]["Référence"]);
                    let produit = this.props.data.produit.replace("{produit}", tags[i]["Désignation"]);
                    let t1 = this.props.data.t1.replace("{t1}", tags[i]["Tarif 1"]);
                    let t2 = this.props.data.t2.replace("{t2}", tags[i]["Tarif 2"]);
                    let t3 = this.props.data.t3.replace("{t3}", tags[i]["Tarif pro"]);
                    tagList.push(
                        <div key={i + y} className={"tag " + this.props.template}>
                            <div className="ref">{ref}</div>
                            <div className="name">{produit}</div>
                            <div className="label">{t1}</div>
                            <div className="label">{t2}</div>
                            <div className="label">{t3}</div>
                        </div>
                    );
                } else {
                    let ref = this.props.data.ref.replace("{ref}", tags[i]["Référence"]);
                    let produit = this.props.data.produit.replace("{produit}", tags[i]["Désignation"]);
                    let t1 = this.props.data.t1.replace("{t1}", tags[i]["Tarif 1"]);
                    tagList.push(
                        <div key={i + y} className={"tag " + this.props.template}>
                            <div className="ref">{ref}</div>
                            <div className="name">{produit}</div>
                            <div className="label">{t1}</div>
                        </div>
                    );
                }
            }
        }

        const content = <div className="row">
            {tagList}
        </div>

        return ReactDOM.createPortal(content, this.containerEl);
    }
}