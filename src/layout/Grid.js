export default function Grid(props) {
    const gridClass = "grid _" + props.size + "-grid";

    return (
        <div className={gridClass + " " + props.extras}>
            {props.children}
        </div>
    );
}