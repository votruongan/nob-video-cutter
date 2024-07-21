import React, { CSSProperties } from "react";
import {Property} from "csstype";

const BASE = {
    minLeft: 19,
    maxLeft: 95,
}

const BASE_STYLE: CSSProperties = {
    position: "absolute",
    width: "1vw",
    height: "17vh",
    top: "72.3%",
    backgroundImage: 'url("stop.svg")',
    backgroundRepeat: "no-repeat", 
}

const BASE_START_STYLE: CSSProperties = {
    ...BASE_STYLE,
    transform: "rotateY(60deg)",
}

const BASE_END_STYLE: CSSProperties = {
    ...BASE_STYLE,
    transform: "rotateY(120deg)",
}

interface TimeLineStopProps {
    isEndStop?: boolean;
    initialTime: number;
}
  
function getNewLeftStyle(position: number) {
    const res = Math.round(BASE.minLeft + position / 10000 * (BASE.maxLeft - BASE.minLeft)) + "%"
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
        <img src="stop.svg" alt="stop" style={computedStyle} />
    );

}

export default TimeLineStop;