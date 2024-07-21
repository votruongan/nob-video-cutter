import { TIMELINE_MAXIMUM_INTERVAL } from "models/TimeLineModels";
import React, { CSSProperties, useRef, useState } from "react"


const styles: CSSProperties = {
    width: "90%",
    height: "70%",
    margin: "auto",
    marginTop: "auto",
    marginBottom: "auto",
}

interface MainPaneVideoPlayerProps {
    path: string,
    playTime: number,
}

function MainPanelVideoPlayer(props: MainPaneVideoPlayerProps) {
    let [videoLength, setVideoLength] = useState(0);
    let videoPlayerRef = useRef<HTMLVideoElement>(null)

    const videoPlayer = videoPlayerRef.current;

    if (videoPlayer){
        if (videoLength !== videoPlayer.duration){
            setVideoLength(videoPlayer.duration)
        } else {
            videoPlayer.currentTime = props.playTime / TIMELINE_MAXIMUM_INTERVAL * videoLength;
        }
    }

    return (
        <div style={styles}>
            <video ref={videoPlayerRef} src={props.path} style={{ width: "90%", maxHeight: "65vh" }}></video>
            <p className="text-white">{props.playTime}</p>
        </div>
    );
}

export default MainPanelVideoPlayer;
