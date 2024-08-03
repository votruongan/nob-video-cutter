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

function floatToTimeDisplay(value: number): string {
    const seconds = Math.floor(value)
    const localMiliSecs = Math.floor(value * 1000 % 1000)
    const localSecs = Math.floor(seconds % 60)
    const localMinutes = Math.floor(seconds / 60)
    const localHours = Math.floor(seconds / 3600)
    return `${localHours}:${localMinutes}:${localSecs}.${localMiliSecs}`
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
            <p style={{color: "whitesmoke"}}>
                {floatToTimeDisplay(props.playTime / TIMELINE_MAXIMUM_INTERVAL * videoLength)}
                / {floatToTimeDisplay(videoLength)}</p>
        </div>
    );
}

export default MainPanelVideoPlayer;
