export default function Tags(props) {
    const template = props.template;
    const modalClasses = props.show ? "tags-modal show" : "tags-modal";
    const tags = props.tags;
    const templateData = props.templateData;
    let tagList = [];

    for (let i = 0; i < tags.length; i++) {
        for (let y = 0; y < tags[i].quantity; y++) {
            // Titles
            let ref = templateData.ref.replace("{ref}", tags[i]["ref"]);
            let produit = templateData.produit.replace("{produit}", tags[i]["name"]);

            // Labels
            let t1 = templateData.t1.replace("{prix}", parseFloat(tags[i]["prices"][0].replace(/,/g, ".")).toFixed(2));
            let t2, t3;
            t1 = t1.replace("{qty}", tags[i]["quantities"][0]);
            if (template != "lots") {
                t2 = templateData.t2.replace("{prix}", parseFloat(tags[i]["prices"][1].replace(/,/g, ".")).toFixed(2));
                t3 = templateData.t3.replace("{prix}", parseFloat(tags[i]["prices"][2].replace(/,/g, ".")).toFixed(2));
                t2 = t2.replace("{qty}", tags[i]["quantities"][1]);
                t3 = t3.replace("{qty}", tags[i]["quantities"][2]);
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
