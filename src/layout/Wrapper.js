export default function Wrapper(props) {
    return (
        <div className={props.classes}>
            {props.children}
        </div>
    );
}