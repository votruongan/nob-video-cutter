import React, { CSSProperties } from "react"
import TimeLineManager from "./underStrip/TimeLineManager";
import { TimeLineCutRange } from 'models/TimeLineModels';
import GrayText from "components/common/GrayText";

const styles: CSSProperties = {
    width: "100%",
    height: "30%",
    margin: "auto",
}

interface MainPanelUnderStripProps {
    allCutRanges: Map<string, TimeLineCutRange>
    isEmptyVideo: boolean
    onAllCutRangesChanged: (m: Map<string, TimeLineCutRange>) => void
    onChangePlayTime: (t: number) => void
}

function MainPanelUnderStrip(props: MainPanelUnderStripProps) {
    const showEmptyInstruction = (props.isEmptyVideo)
        ? (
            <div style={{ position: "relative", width: "100%", height: "100%", top: "-100%" }}>
                <GrayText
                    text="No input video to select cut ranges."
                />
            </div>)
        : (null)
    return (
        <div style={styles}>
            <TimeLineManager
                allCutRanges={props.allCutRanges}
                isInteractable={!props.isEmptyVideo}
                onAllCutRangesChanged={props.onAllCutRangesChanged}
                onChangeDisplayFrame={props.onChangePlayTime} />
            {showEmptyInstruction}
        </div>
    );
}

export default MainPanelUnderStrip;
