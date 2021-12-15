export default function Tags(props) {
    const template = props.template;
    const modalClasses = props.show ? "tags-modal show" : "tags-modal";
    const tags = props.tags;
    let tagList = [];

    if (template == "chaines" || template == "gros" || template == "bacs") {
        for (let i = 0; i < tags.length; i++) {
            for (let y = 0; y < tags[i].quantity; y++) {
                let ref = props.templateData.ref.replace("{ref}", tags[i]["ref"]);
                let produit = props.templateData.produit.replace("{produit}", tags[i]["name"]);
                let t1 = props.templateData.t1.replace("{t1}", tags[i]["prices"][0]);
                let t2 = props.templateData.t2.replace("{t2}", tags[i]["prices"][1]);
                let t3 = props.templateData.t3.replace("{t3}", tags[i]["prices"][2]);
                tagList.push(
                    <div key={i + y} className={"tag " + template}>
                        <div className="ref">{ref}</div>
                        <div className="name">{produit}</div>
                        <div className="label">{t1}</div>
                        <div className="label">{t2}</div>
                        <div className="label highlight">{t3}</div>
                    </div>
                );
            }
        }
    } else if (template == "lots") {
        for (let i = 0; i < tags.length; i++) {
            for (let y = 0; y < tags[i].quantity; y++) {
                let ref = props.templateData.ref.replace("{ref}", tags[i]["ref"]);
                let produit = props.templateData.produit.replace("{produit}", tags[i]["name"]);
                let t1 = props.templateData.t1.replace("{t1}", tags[i]["prices"][0]);
                tagList.push(
                    <div key={i + y} className={"tag " + template}>
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

    return (
        <div className={modalClasses}>
            <div className="head">
                <div className="title">Aperçu</div>
                {props.icon}
            </div>
            <div className="tags-container">
                <div className={"row " + template}>
                    {tagList}
                    {extras}
                </div>
            </div>
        </div>
    );
    
}
