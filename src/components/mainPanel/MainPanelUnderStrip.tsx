import React, { CSSProperties } from "react"
import TimeLineManager from "./underStrip/TimeLineManager";
import { TimeLineStopData } from 'models/TimeLineModels';

const styles: CSSProperties = {
    width: "100%",
    height: "30%",
    margin: "auto",
    backgroundColor: "gray",
}

interface MainPanelUnderStripProps {
    allStops: Map<string, TimeLineStopData>
    onAllStopsChanged: (m: Map<string, TimeLineStopData>) => void
    onChangePlayTime: (t: number) => void
}

function MainPanelUnderStrip(props: MainPanelUnderStripProps) {
    return (
        <div style={styles}>
            <TimeLineManager
                onAllStopsChanged={props.onAllStopsChanged}
                allStops={props.allStops}
                onChangeDisplayFrame={props.onChangePlayTime}/>
        </div>
    );
}

export default MainPanelUnderStrip;
