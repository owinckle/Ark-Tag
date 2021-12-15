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
                .row.gros {
                    padding: 1.51cm 0.72cm;
                    justify-content: space-between;
                }

                .row.lots {
                    padding: 1.07cm .5cm;
                    justify-content: space-between;
                }

                .row.bacs {
                    padding: 0.85cm 0.55cm;
                    justify-content: space-between;
                }
                .tag {
                    text-align: center;
                    outline: 1px dotted #000;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }
                .tag .label.highlight {
                    background: #ffff00;
                }
                .tag.chaines {
                    width: 5.25cm;
                    height: 2.97cm;
                }
                .tag.gros {
                    width: 6.35cm;
                    height: 3.81cm;
                }
                .tag.lots {
                    width: 3.8cm;
                    height: 2.12cm;
                }
                .tag.bacs {
                    width: 4.84cm;
                    height: 2.54cm;
                }
                .tag.extra {
                    outline: none;
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
                    let ref = this.props.data.ref.replace("{ref}", tags[i]["ref"]);
                    let produit = this.props.data.produit.replace("{produit}", tags[i]["name"]);
                    let t1 = this.props.data.t1.replace("{t1}", tags[i]["prices"][0]);
                    let t2 = this.props.data.t2.replace("{t2}", tags[i]["prices"][1]);
                    let t3 = this.props.data.t3.replace("{t3}", tags[i]["prices"][2]);
                    tagList.push(
                        <div key={i + y} className={"tag " + this.props.template}>
                            <div className="ref">{ref}</div>
                            <div className="name">{produit}</div>
                            <div className="label">{t1}</div>
                            <div className="label">{t2}</div>
                            <div className="label highlight">{t3}</div>
                        </div>
                    );
                } else {
                    let ref = this.props.data.ref.replace("{ref}", tags[i]["ref"]);
                    let produit = this.props.data.produit.replace("{produit}", tags[i]["name"]);
                    let t1 = this.props.data.t1.replace("{t1}", tags[i]["prices"][0]);
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

        let ec = 0;
        if (template == "gros") {
            ec = tagList.length % 3 != 0 ? 3 - (tagList.length % 3) : 0;
        } else if (template == "lots") {
            ec = tagList.length % 5 != 0 ? 5 - (tagList.length % 5) : 0;
        } else if (template == "bacs") {
            ec = tagList.length % 4 != 0 ? 4 - (tagList.length % 4) : 0;
        }
        let extras = Array(ec).fill(<div className={"tag extra " + template}></div>);

        const content = (<div className={"row " + template}>
            {tagList}
            {extras}
        </div>);

        return ReactDOM.createPortal(content, this.containerEl);
    }
}