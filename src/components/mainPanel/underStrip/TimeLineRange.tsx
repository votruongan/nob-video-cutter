import React, { CSSProperties } from "react";
import TimeLineUtils from "utils/timeLineUtils";


const baseStyle: CSSProperties = {
    position: "absolute",
    height: "29.2vh",
    top: "70%",
    border: "4px solid white",
}

const activeGradient = `linear-gradient(90deg, rgba(0,217,141,0.7) 0%, rgba(131,255,197,0.5) 4%, rgba(255,255,255,0) 8%, rgba(255,255,255,0) 94%, rgba(131,255,197,0.5) 98%, rgba(0,217,141,0.7) 100%)`
const normalGradient = `linear-gradient(90deg, rgba(0,117,101,0.7) 0%, rgba(101,155,137,0.5) 4%, rgba(255,255,255,0) 8%, rgba(255,255,255,0) 94%, rgba(101,155,137,0.5) 98%, rgba(0,117,101,0.7) 100%)`

interface TimeLineRangeProps {
    startTime: number;
    endTime: number;
    isActiveRange: boolean;
    onRemoveRange?: () => void;
}

function TimeLineRange(props: TimeLineRangeProps) {
    const start = TimeLineUtils.calculatePosition(props.startTime);
    const width = TimeLineUtils.calculatePosition(props.endTime) - start
    const computedStyle: CSSProperties = {
        ...baseStyle, left: start + "%", width: width + "%",
        borderColor: props.isActiveRange ? "yellow" : "white",
        background: props.isActiveRange ? activeGradient : normalGradient,
    }

    return (
        <div style={computedStyle}>
            <div style={{
                width: "100%",
                height: "100%",
            }} onClick={props.onRemoveRange}>
                {props.isActiveRange 
                    ? null 
                    : <span style={{ width: "100%", overflow: "hidden", color: "#DADADAAA", fontSize: "0.8em" }}>click to discard</span>}
            </div>;
        </div>
    );

}

export default TimeLineRange;