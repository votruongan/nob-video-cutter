import React, { CSSProperties } from "react";
import { TIMELINE_MAXIMUM_INTERVAL } from "models/TimeLineModels";

const BASE = {
    minLeft: 15,
    maxLeft: 99.5,
}

const styles: CSSProperties = {
    position: "absolute",
    width: "0.5vw",
    height: "30vh",
    top: "70%",
    backgroundImage: 'url("stop.svg")',
    backgroundRepeat: "no-repeat", 
}

interface TimeLineStopProps {
    initialTime: number;
}
  
function getNewLeftStyle(position: number) {
    const res = BASE.minLeft + position / TIMELINE_MAXIMUM_INTERVAL * (BASE.maxLeft - BASE.minLeft) + "%"
    return res;
}

function TimeLineStop(props: TimeLineStopProps) {

    // handleSeekPlayTime = event => {
    //     const newTime = event.target.value;
    //     props.onChangeDisplayFrame(newTime);
    // } 
    const computedStyle = { ...styles, left: getNewLeftStyle(props.initialTime) }

    return (
        <img src="stop.svg" draggable="false" alt="stop" style={computedStyle} />
    );

}

export default TimeLineStop;