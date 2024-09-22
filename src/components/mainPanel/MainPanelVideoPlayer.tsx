import GrayText from "components/common/GrayText";
import { TIMELINE_MAXIMUM_INTERVAL } from "models/TimeLineModels";
import { CSSProperties, useEffect, useRef } from "react"


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
    videoLength: number,
    isEmptyPlayback: boolean,
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
    let videoPlayerRef = useRef<HTMLVideoElement>(null)
    const { videoLength } = props
    useEffect(() => {
        const videoPlayer = videoPlayerRef.current;
        if (videoPlayer) {
            videoPlayer.currentTime = props.playTime / TIMELINE_MAXIMUM_INTERVAL * props.videoLength;
        }
    });

    const bodyContent = 
        (props.isEmptyPlayback)
        ? (<GrayText
            text={`Click "Import" to specify input video.`}
        />)
        : (<>
            <video ref={videoPlayerRef} src={props.path} style={{ width: "90%", maxHeight: "65vh" }}></video>
            <div style={{display: "flex", justifyContent: "center"}}>
                <p style={{ color: "whitesmoke", marginRight: "8px"}}>Current frame: </p>
                <p style={{ color: "whitesmoke" }}>
                    {floatToTimeDisplay(props.playTime / TIMELINE_MAXIMUM_INTERVAL * videoLength)}
                    / {floatToTimeDisplay(videoLength)}</p>
            </div>
        </>)

    return (
        <div style={styles}>
            {bodyContent}
        </div>
    );

}

export default MainPanelVideoPlayer;
