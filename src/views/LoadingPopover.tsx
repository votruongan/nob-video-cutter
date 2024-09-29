import React, { CSSProperties } from "react"
import "styles/Spinner.css"

const containerStyles: CSSProperties = {
    width: "100vw",
    height: "100vh",
    position: "fixed",
    backgroundColor: "#2a2a2abb",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2810,
}

interface LoadingPopoverProps {
    isLoading: boolean,
    loadingMessage: string
}

function getDisplay(condition: boolean, whenTrue: string = "block"): string {
    return condition ? whenTrue : "none";
}

export default function LoadingPopover(props: LoadingPopoverProps) {
    return (
        <div style={{ ...containerStyles, display: getDisplay(props.isLoading, "flex") }}>
            <div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div className="spinner"></div>
                </div>
                <div style={{ marginTop: "16px", color: "whitesmoke", display: getDisplay(props.loadingMessage != "") }}>
                    {props.loadingMessage}
                </div>
            </div>
        </div>
    );
}
