export default function Card(props) {
    return (
        <div className="card">
            <div className="title">{props.title}</div>
            {props.children}
        </div>
    );
}