export default function Card(props) {
    return (
        <div className="card">
            <div className="card-head">
                <div className="title">{props.title}</div>
                {props.btn}
            </div>
            {props.children}
        </div>
    );
}