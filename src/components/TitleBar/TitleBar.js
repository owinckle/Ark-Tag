import { useState } from "react";

export default function TitleBar(props) {
    const { ipcRenderer } = window.require("electron");

    const [isMaximized, setMaximized] = useState(false);

    const closeApp = () => {
        ipcRenderer.send("closeApp");
    }

    const minimizeApp = () => {
        ipcRenderer.send("minimizeApp");
    }

    const maximizeApp = () => {
        if (isMaximized) {
            setMaximized(false);
            ipcRenderer.send("maximizeApp");
        } else {
            setMaximized(true);
            ipcRenderer.send("restoreApp");
        }
    }

    return (
        <div className="title-bar">
            <div className="title">
                <img src={props.favicon} />
                <div className="app-name">{props.title}</div>
            </div>
            <div className="buttons">
                <div className="btn-container" onClick={minimizeApp}>
                    <svg aria-hidden="false" width="12" height="12" viewBox="0 0 12 12"><rect fill="currentColor" width="10" height="1" x="1" y="6"></rect></svg>
                </div>
                <div className="btn-container" onClick={maximizeApp}>
                    <svg aria-hidden="false" width="12" height="12" viewBox="0 0 12 12"><rect width="9" height="9" x="1.5" y="1.5" fill="none" stroke="currentColor"></rect></svg>
                </div>
                <div className="btn-container close" onClick={closeApp}>
                    <svg aria-hidden="false" width="12" height="12" viewBox="0 0 12 12"><polygon fill="currentColor" fillRule="evenodd" points="11 1.576 6.583 6 11 10.424 10.424 11 6 6.583 1.576 11 1 10.424 5.417 6 1 1.576 1.576 1 6 5.417 10.424 1"></polygon></svg>
                </div>
            </div>
        </div>
    );
}