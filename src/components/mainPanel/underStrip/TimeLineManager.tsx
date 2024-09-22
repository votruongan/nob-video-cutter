import React, { CSSProperties, useRef, useState } from "react"
import "../../../styles/TimeLineInput.css"
// import TimeLineStop from "./TimeLineStop";
import { TIMELINE_MAXIMUM_INTERVAL, TimeLineCutRange } from 'models/TimeLineModels';
import TimeLineRange from "./TimeLineRange";

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
    allCutRanges: Map<string, TimeLineCutRange>;
    isInteractable: boolean;
    onAllCutRangesChanged: (m: Map<string, TimeLineCutRange>) => void
    onChangeDisplayFrame: (t: number) => void;
}

// function getPosition(event: React.FormEvent<HTMLInputElement>) {
//     const rawPosition = event.currentTarget.value;
//     const newPosition = parseInt(rawPosition)
//     return newPosition
// }

function TimeLineManager(props: TimeLineManagerProps) {
    const [anchorStart, setAnchorStart] = useState(-1);
    const [currentStop, setCurrentStop] = useState<TimeLineCutRange>({});
    const [currentStopName, setCurrentStopName] = useState("stop-1");
    const [autoIncrease, setAutoIncease] = useState(2);

    const [mousePosition, setMousePosition] = useState(0);

    const inputRef = useRef<HTMLInputElement>(null)


    const handleNewMousePosition: React.FormEventHandler<HTMLInputElement> = (event) => {
        // const newPosition = getPosition(event)
        const newPosition = mousePosition
        console.log(anchorStart, newPosition)
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
    }

    const handleFinishSetStop: React.FormEventHandler<HTMLInputElement> = (event) => {
        setAutoIncease(autoIncrease + 1)
        props.onAllCutRangesChanged(props.allCutRanges.set(
            currentStopName,
            currentStop
        ))
        handleCancelSetStop(event)
    }

    const handleSeekVideo: React.MouseEventHandler<HTMLInputElement> = (event) => {
        const inputLeft = inputRef.current ? inputRef.current.offsetLeft : 0
        const inputWidth = inputRef.current ? inputRef.current.offsetWidth : 0
        const maxX = inputLeft + inputWidth
        if (maxX === 0) return;
        let seekRatio = Number(((event.clientX - inputLeft) / inputWidth))
        if (seekRatio > 0.996) seekRatio = 1
        if (seekRatio < 0.004) seekRatio = 0
        setMousePosition(seekRatio * TIMELINE_MAXIMUM_INTERVAL)
        props.onChangeDisplayFrame(seekRatio * TIMELINE_MAXIMUM_INTERVAL);
    }

    const handleCancelSetStop: React.FormEventHandler<HTMLInputElement> = () => {
        setAnchorStart(-1)
        setCurrentStop({})
    }

    const handleRemoveRange = (rangeName: string) => {
        const allCutRanges = new Map(props.allCutRanges.entries())
        console.log(allCutRanges)
        allCutRanges.delete(rangeName)
        console.log("remove range - ", rangeName)
        console.log(allCutRanges)
        props.onAllCutRangesChanged(allCutRanges)
    }


    // const stopList: JSX.Element[] = []
    // props.allCutRanges.forEach((stopData, stopName) => {
    //     const { start, end } = stopData
    //     console.log("re-render", stopName, start, end)
    //     if (start)
    //         stopList.push(<TimeLineStop key={`${stopName}-start`} initialTime={start} />)
    //     if (end)
    //         stopList.push(<TimeLineStop key={`${stopName}-end`} initialTime={end} />)
    // })

    const rangeList: JSX.Element[] = []
    props.allCutRanges.forEach((stopData, stopName) => {
        const { start, end } = stopData
        const CutRangestart = start ? start : 0;
        const stopEnd = end ? end : 0;
        rangeList.push(<TimeLineRange key={stopName}
            isActiveRange={false}
            startTime={CutRangestart}
            onRemoveRange={() => handleRemoveRange(stopName)}
            endTime={stopEnd} />)
    })
    if (anchorStart > -1) {
        const startTime = currentStop.start ? currentStop.start : anchorStart;
        const endTime = currentStop.end ? currentStop.end : 0;
        rangeList.push(<TimeLineRange key={currentStopName}
            isActiveRange={true}
            startTime={startTime}
            endTime={endTime} />)
    }

    const inputContent = 
        (props.isInteractable)
        ? (
            <input type="range" id="timeline-wrapper"
                min="0" max={`${TIMELINE_MAXIMUM_INTERVAL}`}
                style={inputStyles}
                onMouseUp={handleFinishSetStop}
                onMouseMove={handleSeekVideo}
                onInput={handleNewMousePosition}
            />) 
        : (
            <input type="range" id="timeline-wrapper"
                min="0" max={`${TIMELINE_MAXIMUM_INTERVAL}`}
                style={inputStyles}
            />)

    return (
        <div ref={inputRef} style={styles}>
            {/* {stopList} */}
            {rangeList}
            {inputContent}
        </div>
    );
}

export default TimeLineManager;
