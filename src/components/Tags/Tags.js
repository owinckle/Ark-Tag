export default function Tags(props) {
    const modalClasses = props.show ? "tags-modal show" : "tags-modal";
    const tags = props.tags;
    const tagClass = props.template;

    let tagList = [];
    for (let i = 0; i < tags.length; i++) {
        for (let y = 0; y < tags[i].quantity; y++) {
            tagList.push(
                <div key={i + y}className={"tag " + tagClass}>
                    <div className="ref">{tags[i]["Référence"]}</div>
                    <div className="name">{tags[i]["Désignation"]}</div>
                    <div className="label">{tags[i]["Tarif 1"]}€ TTC la pièce</div>
                    <div className="label">À partir de 5 pièces {tags[i]["Tarif 2"]}€ T2 TTC la pièce</div>
                    <div className="label">À partir de 15 pièces {tags[i]["Tarif pro"]}€ T3 TTC la pièce</div>
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
}
