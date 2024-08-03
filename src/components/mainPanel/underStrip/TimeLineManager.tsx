import React, { CSSProperties, useState } from "react"
import "../../../styles/TimeLineInput.css"
import TimeLineStop from "./TimeLineStop";
import { TIMELINE_MAXIMUM_INTERVAL, TimeLineStopData } from 'models/TimeLineModels';

const styles: CSSProperties = {
    width: "auto",
    height: "100%",
    background: `linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(9,9,121,0.12) 40%, rgba(0,212,255,0.1) 100%)`,
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

function getPosition(event: React.FormEvent<HTMLInputElement>) {
    const rawPosition = event.currentTarget.value;
    const newPosition = parseInt(rawPosition)
    return newPosition
}

function TimeLineManager(props: TimeLineManagerProps) {
    let [anchorStart, setAnchorStart] = useState(-1);
    let [currentStop, setCurrentStop] = useState<TimeLineStopData>({});
    let [currentStopName, setCurrentStopName] = useState("stop-1");
    let [autoIncrease, setAutoIncease] = useState(2);


    const handleNewMousePosition: React.FormEventHandler<HTMLInputElement> = (event) => {
        const newPosition = getPosition(event)
        if (anchorStart < 0) return setAnchorStart(newPosition);
        if (currentStop.start) {
            if (currentStop.start > newPosition) {
                setCurrentStop({
                    start: newPosition,
                    end: anchorStart
                })
            } else {
                setCurrentStop({
                    start: anchorStart,
                    end: newPosition
                })
            }
        } else {
            setCurrentStop({
                start: anchorStart,
            })
            setCurrentStopName(`stop-${autoIncrease}`)
        }
        console.log(currentStop)
        props.onChangeDisplayFrame(newPosition);
    }

    const handleFinishSetStop: React.FormEventHandler<HTMLInputElement> = (event) => {
        setAutoIncease(++autoIncrease)
        props.onAllStopsChanged(props.allStops.set(
            currentStopName,
            currentStop
        ))
        handleCancelSetStop(event)
    }

    const handleCancelSetStop: React.FormEventHandler<HTMLInputElement> = () => {
        setAnchorStart(-1)
        setCurrentStop({})
    }


    const stopList: JSX.Element[] = []
    props.allStops.forEach((stopData, stopName) => {
        const { start, end } = stopData
        console.log(stopName, start, end)
        if (start)
            stopList.push(<TimeLineStop key={`${stopName}-start`} initialTime={start} />)
        if (end)
            stopList.push(<TimeLineStop key={`${stopName}-end`} initialTime={end} isEndStop={true} />)
    })
    return (
        <div style={styles}>
            <input type="range" id="timeline-wrapper"
                min="0" max={`${TIMELINE_MAXIMUM_INTERVAL}`}
                style={inputStyles}
                onMouseUp={handleFinishSetStop}
                onInput={handleNewMousePosition}
            />
            {stopList}
        </div>
    );
}

export default TimeLineManager;
