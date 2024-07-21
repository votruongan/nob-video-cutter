import React, { CSSProperties, useState } from "react"
import "../../../styles/TimeLineInput.css"
import TimeLineStop from "./TimeLineStop";
import { TIMELINE_MAXIMUM_INTERVAL, TimeLineStopData } from 'models/TimeLineModels';

const styles: CSSProperties = {
    width: "auto",
    height: "100%"
}

const inputStyles: CSSProperties = {
    width: "100%",
    height: "100%",
    margin: "0px",
}

interface TimeLineManagerProps {
    allStops: Map<string, TimeLineStopData>;
    onAllStopsChanged: (m: Map<string, TimeLineStopData>) => void
    onChangeDisplayFrame: (t: number) => void;
}

function TimeLineManager (props: TimeLineManagerProps) {
    let [currentTime, setCurrentTime] = useState(500);
    let [currentStop, setCurrentStop] = useState<TimeLineStopData>({});
    let [currentStopName, setCurrentStopName] = useState("stop-1");

    const handleNewStopStart: React.FormEventHandler<HTMLInputElement>  = (event) => {
        const rawPosition = event.currentTarget.value;
        const newPosition = parseInt(rawPosition)
        if (currentStop.start) {
            setCurrentStop({
                start: currentStop.start,
                end: newPosition
            })
        } else {
            setCurrentStop({
                start: newPosition,
            })
        }
        console.log(currentStop)
        props.onChangeDisplayFrame(newPosition);
    }

    const handleFinishSetStop: React.FormEventHandler<HTMLInputElement>  = (event) => {
        // const rawPosition = event.currentTarget.value;
        // const newPosition = parseInt(rawPosition);
        // setCurrentStop({
        //     start: newPosition,
        //     end: newPosition
        // })
        // props.onAllStopsChanged(props.allStops.set(
        //     currentStopName,
        //     currentStop
        // ))
        // props.onChangeDisplayFrame(newPosition);
        setCurrentStop({})
    }

    const handleCancelSetStop: React.FormEventHandler<HTMLInputElement>  = (event) => {
        setCurrentStop({})
    }


    const stopList: JSX.Element[] = []
    props.allStops.forEach((stopData, stopName) => {
        const {start, end} = stopData
        console.log(start,end)
        if (start)
            stopList.push(<TimeLineStop key={`${stopName}-start`} initialTime={start}/>)
        if (end)
            stopList.push(<TimeLineStop key={`${stopName}-end`} initialTime={end} isEndStop={true} />)
    })
    return (
        <div style={styles}>
            <input type="range" id="timeline-wrapper"
                defaultValue={currentTime}
                min="0" max={`${TIMELINE_MAXIMUM_INTERVAL}`}
                style={inputStyles}
                onMouseLeave={handleCancelSetStop}
                onMouseUp={handleFinishSetStop}
                onInput={handleNewStopStart}
            />
            {stopList}
        </div>
    );
}

export default TimeLineManager;
