import MainPanelUnderStrip from "components/mainPanel/MainPanelUnderStrip";
import MainPanelVideoPlayer from "components/mainPanel/MainPanelVideoPlayer";
import React, { CSSProperties, useState } from "react"
import { TimeLineCutRange } from 'models/TimeLineModels';

const containerStyles: CSSProperties = {
    "backgroundColor": "inherit",
    width: "90%",
    height: "100vh",
    float: "right",
}

interface MainPanelProps {
    allCutRanges: Map<string, TimeLineCutRange>
    videoPath: string,
    videoLength: number,
    onAllCutRangesChanged: (m: Map<string, TimeLineCutRange>) => void
}


function MainPanel(props: MainPanelProps) {
    const [playerPeekTime, setPlayerPeekTime] = useState(0)

    const isEmptyVideo = props.videoPath === ""

    return (
        <div style={containerStyles}>
            <MainPanelVideoPlayer
                path={props.videoPath}
                playTime={playerPeekTime}
                videoLength={props.videoLength}
                isEmptyPlayback={isEmptyVideo}
            />

            <MainPanelUnderStrip
                allCutRanges={props.allCutRanges}
                isEmptyVideo={isEmptyVideo}
                onAllCutRangesChanged={props.onAllCutRangesChanged}
                onChangePlayTime={setPlayerPeekTime} />
        </div>
    );
}

export default MainPanel;
