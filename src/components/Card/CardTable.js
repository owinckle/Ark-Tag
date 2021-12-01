export default function CardTable(props) {
    return (
        <div className="card-table">
            <div className="head">
                <div className="title">{props.title}</div>
                <input
                    name={props.searchName}
                    placeholder={props.placeholder}
                    value={props.searchValue}
                    onChange={props.change}
                />
            </div>
            {props.children}
        </div>
    );
}