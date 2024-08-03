import React, { CSSProperties } from "react";
import {Property} from "csstype";
import { TIMELINE_MAXIMUM_INTERVAL } from "models/TimeLineModels";

const BASE = {
    minLeft: 15,
    maxLeft: 99.5,
}

const BASE_STYLE: CSSProperties = {
    position: "absolute",
    width: "0.5vw",
    height: "30vh",
    top: "70%",
    backgroundImage: 'url("stop.svg")',
    backgroundRepeat: "no-repeat", 
}

const BASE_START_STYLE: CSSProperties = {
    ...BASE_STYLE,
}

const BASE_END_STYLE: CSSProperties = {
    ...BASE_STYLE,
}

interface TimeLineStopProps {
    isEndStop?: boolean;
    initialTime: number;
}
  
function getNewLeftStyle(position: number) {
    const res = BASE.minLeft + position / TIMELINE_MAXIMUM_INTERVAL * (BASE.maxLeft - BASE.minLeft) + "%"
    return res;
}

function TimeLineStop(props: TimeLineStopProps) {
    const baseStyle = props.isEndStop ? BASE_END_STYLE : BASE_START_STYLE

    // handleSeekPlayTime = event => {
    //     const newTime = event.target.value;
    //     props.onChangeDisplayFrame(newTime);
    // } 
    const computedStyle = { ...baseStyle, left: getNewLeftStyle(props.initialTime) }

    return (
        <img src="stop.svg" draggable="false" alt="stop" style={computedStyle} />
    );

}

export default TimeLineStop;