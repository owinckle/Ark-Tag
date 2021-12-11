export default function Tags(props) {
    if (props.template == "chaines") {
        const modalClasses = props.show ? "tags-modal show" : "tags-modal";
        const tags = props.tags;

        let tagList = [];
        for (let i = 0; i < tags.length; i++) {
            for (let y = 0; y < tags[i].quantity; y++) {
                let ref = props.templateData.ref.replace("{ref}", tags[i]["Référence"]);
                let produit = props.templateData.produit.replace("{produit}", tags[i]["Désignation"]);
                let t1 = props.templateData.t1.replace("{t1}", tags[i]["Tarif 1"]);
                let t2 = props.templateData.t2.replace("{t2}", tags[i]["Tarif 2"]);
                let t3 = props.templateData.t3.replace("{t3}", tags[i]["Tarif pro"]);
                tagList.push(
                    <div key={i + y} className={"tag " + props.template}>
                        <div className="ref">{ref}</div>
                        <div className="name">{produit}</div>
                        <div className="label">{t1}</div>
                        <div className="label">{t2}</div>
                        <div className="label">{t3}</div>
                    </div>
                );
            }
        }

        return (
            <div className={modalClasses}>
                <div className="head">
                    <div className="title">Aperçu</div>
                    { props.icon }
                </div>
                <div className="tags-container">
                    <div className="row">
                        {tagList}
                    </div>
                </div>
            </div>
        );
    } else if (props.template == "gros") {
        const modalClasses = props.show ? "tags-modal show" : "tags-modal";
        const tags = props.tags;

        let tagList = [];
        for (let i = 0; i < tags.length; i++) {
            for (let y = 0; y < tags[i].quantity; y++) {
                let ref = props.templateData.ref.replace("{ref}", tags[i]["Référence"]);
                let produit = props.templateData.produit.replace("{produit}", tags[i]["Désignation"]);
                let t1 = props.templateData.t1.replace("{t1}", tags[i]["Tarif 1"]);
                let t2 = props.templateData.t2.replace("{t2}", tags[i]["Tarif 2"]);
                let t3 = props.templateData.t3.replace("{t3}", tags[i]["Tarif pro"]);
                tagList.push(
                    <div key={i + y} className={"tag " + props.template}>
                        <div className="ref">{ref}</div>
                        <div className="name">{produit}</div>
                        <div className="label">{t1}</div>
                        <div className="label">{t2}</div>
                        <div className="label">{t3}</div>
                    </div>
                );
            }
        }

        return (
            <div className={modalClasses}>
                <div className="head">
                    <div className="title">Aperçu</div>
                    {props.icon}
                </div>
                <div className="tags-container">
                    <div className="row">
                        {tagList}
                    </div>
                </div>
            </div>
        );
    } else if (props.template == "lots") {
        const modalClasses = props.show ? "tags-modal show" : "tags-modal";
        const tags = props.tags;

        let tagList = [];
        for (let i = 0; i < tags.length; i++) {
            for (let y = 0; y < tags[i].quantity; y++) {
                let ref = props.templateData.ref.replace("{ref}", tags[i]["Référence"]);
                let produit = props.templateData.produit.replace("{produit}", tags[i]["Désignation"]);
                let t1 = props.templateData.t1.replace("{t1}", tags[i]["Tarif 1"]);
                tagList.push(
                    <div key={i + y} className={"tag " + props.template}>
                        <div className="ref">{ref}</div>
                        <div className="name">{produit}</div>
                        <div className="label">{t1}</div>
                    </div>
                );
            }
        }

        return (
            <div className={modalClasses}>
                <div className="head">
                    <div className="title">Aperçu</div>
                    {props.icon}
                </div>
                <div className="tags-container">
                    <div className="row">
                        {tagList}
                    </div>
                </div>
            </div>
        );
    } else if (props.template == "bacs") {
        const modalClasses = props.show ? "tags-modal show" : "tags-modal";
        const tags = props.tags;

        let tagList = [];
        for (let i = 0; i < tags.length; i++) {
            for (let y = 0; y < tags[i].quantity; y++) {
                let ref = props.templateData.ref.replace("{ref}", tags[i]["Référence"]);
                let produit = props.templateData.produit.replace("{produit}", tags[i]["Désignation"]);
                let t1 = props.templateData.t1.replace("{t1}", tags[i]["Tarif 1"]);
                let t2 = props.templateData.t2.replace("{t2}", tags[i]["Tarif 2"]);
                let t3 = props.templateData.t3.replace("{t3}", tags[i]["Tarif pro"]);
                tagList.push(
                    <div key={i + y} className={"tag " + props.template}>
                        <div className="ref">{ref}</div>
                        <div className="name">{produit}</div>
                        <div className="label">{t1}</div>
                        <div className="label">{t2}</div>
                        <div className="label">{t3}</div>
                    </div>
                );
            }
        }

        return (
            <div className={modalClasses}>
                <div className="head">
                    <div className="title">Aperçu</div>
                    {props.icon}
                </div>
                <div className="tags-container">
                    <div className="row">
                        {tagList}
                    </div>
                </div>
            </div>
        );
    } else {
        return null;
    }
    
}
