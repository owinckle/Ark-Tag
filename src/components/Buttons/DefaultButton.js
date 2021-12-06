export default function DefaultButton(props) {
    return (
        <div className="button" onClick={props.action}>{props.label}</div>
    );
}