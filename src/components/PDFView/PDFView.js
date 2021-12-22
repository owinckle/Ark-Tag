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
                    font-family: 'Calibri', sans-serif;
                    letter-spacing: 1px;
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
                    outline: none;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }
                .tag>div {
                    margin-bottom: 5px;
                }
                .tag>div:last-child {
                    margin-bottom: 0px;
                }
                .tag .ref {
                    font-weight: 600 !important;
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
        const data = this.props.data;

        let tagList = [];
        for (let i = 0; i < tags.length; i++) {
            for (let y = 0; y < tags[i].quantity; y++) {
                // Titles
                let ref = data.ref.replace("{ref}", tags[i]["ref"]);
                let produit = data.produit.replace("{produit}", tags[i]["name"]);

                // Labels
                let t1 = data.t1.replace("{prix}", parseFloat(tags[i]["prices"][0]).toFixed(2).replace(".", ","));
                let t2, t3;
                t1 = t1.replace("{qty}", parseInt(tags[i]["quantities"][0]));
                if(template != "lots") {
                    t2 = data.t2.replace("{prix}", parseFloat(tags[i]["prices"][1]).toFixed(2).replace(".", ","));
                    t3 = data.t3.replace("{prix}", parseFloat(tags[i]["prices"][2]).toFixed(2).replace(".", ","));
                    t2 = t2.replace("{qty}", parseInt(tags[i]["quantities"][1]));
                    t3 = t3.replace("{qty}", parseInt(tags[i]["quantities"][2]));
                }

                if (template != "lots") {
                    tagList.push(
                        <div key={i + y} className={"tag " + this.props.template}>
                            <div style={{ fontSize: data.refFont + "px" }} className="ref">{ref}</div>
                            <div style={{ fontSize: data.prodFont + "px" }} className="name">{produit}</div>
                            <div>
                                <div style={{ fontSize: data.labelFont + "px" }} className="label">{t1}</div>
                                <div style={{ fontSize: data.labelFont + "px" }} className="label">{t2}</div>
                                <div style={{ fontSize: data.labelFont + "px" }} className="label highlight">{t3}</div>
                            </div>
                        </div>
                    );
                } else {
                    tagList.push(
                        <div key={i + y} className={"tag " + this.props.template}>
                            <div style={{ fontSize: data.refFont + "px" }} className="ref">{ref}</div>
                            {produit != "" ?
                                <div style={{ fontSize: data.prodFont + "px" }} className="name">{produit}</div>
                                : null}
                            {t1 != "" ?
                                <div style={{ fontSize: data.labelFont + "px" }} className="label">{t1}</div>
                                : null}
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