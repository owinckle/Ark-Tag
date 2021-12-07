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
            style.appendChild(this.externalWindow.document.createTextNode('@page{margin:0}'));
            this.externalWindow.document.getElementsByTagName('head')[0].appendChild(style);

            this.externalWindow.onunload = () => this.props.onClose();
        }
    }

    render() {
        const tags = this.props.tags;
        // const tagClass = props.template;

        const rowClass = {
            "display": "flex",
            "position": "relative",
            "flex-wrap": "wrap",
            "left": "1px",
            "font-family": '"Calibri", sans-serif',
            "letter-spacing": "1px"
        }
        const tagClass = {
            "width": "5.25cm",
            "height": "2.97cm",
            "text-align": "center",
            "outline": "1px dotted #000",
            "display": "flex",
            "flex-direction": "column",
            "justify-content": "center"
        }
        const refClass = {"font-size": "12px"}
        const nameClass = {"font-size": "9px"}
        const labelClass = {"font-size": "10px"}

        let tagList = [];
        for (let i = 0; i < tags.length; i++) {
            for (let y = 0; y < tags[i].quantity; y++) {
                tagList.push(
                    <div key={i + y} style={tagClass}>
                        <div style={refClass}>{tags[i]["Référence"]}</div>
                        <div style={nameClass}>{tags[i]["Désignation"]}</div>
                        <div style={labelClass}>{tags[i]["Tarif 1"]}€ TTC la pièce</div>
                        <div style={labelClass}>À partir de 5 pièces {tags[i]["Tarif 2"]}€ T2 TTC la pièce</div>
                        <div style={labelClass}>À partir de 15 pièces {tags[i]["Tarif pro"]}€ T3 TTC la pièce</div>
                    </div>
                );
            }
        }

        const content = <div style={rowClass}>
            {tagList}
        </div>

        return ReactDOM.createPortal(content, this.containerEl);
    }
}