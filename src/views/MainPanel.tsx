import MainPaneUnderStrip from "components/mainPanel/MainPanelUnderStrip";
import MainPaneVideoPlayer from "components/mainPanel/MainPanelVideoPlayer";
import React, { CSSProperties, useState } from "react"
import { TimeLineStopData } from 'models/TimeLineModels';

const containerStyles: CSSProperties = {
    "backgroundColor": "inherit",
    width: "85%",
    height: "100vh",
    float: "right",
}

interface MainPanelProps {
    allStops: Map<string, TimeLineStopData>
    onAllStopsChanged: (m: Map<string, TimeLineStopData>) => void
}


function MainPanel(props: MainPanelProps) {
    let [playerPeekTime, setPlayerPeekTime] = useState(0)
    let [videoPath, setVideoPath] = useState("./sample.mp4")

    return (
        <div style={containerStyles}>
            <MainPaneVideoPlayer
                path={videoPath}
                playTime={playerPeekTime}
            />

            <MainPaneUnderStrip
                allStops={props.allStops}
                onAllStopsChanged={props.onAllStopsChanged}
                onChangePlayTime={setPlayerPeekTime} />
        </div>
    );
}

export default MainPanel;
