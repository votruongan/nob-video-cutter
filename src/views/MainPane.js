import MainPaneUnderStrip from "../components/MainPaneUnderStrip";
import MainPaneVideoPlayer from "../components/MainPaneVideoPlayer";
import React from "react"

const styles={
    container: {
        "backgroundColor": "inherit",
        width: "85%",
        height: "100vh",
        float: "right",
    },
    videoPlayer:{
        width: "90%",
        height: "70%",
        margin: "auto",
        "margin-top": "auto",
        "margin-bottom": "auto",
    },
    underStrip:{
        width: "100%",
        height: "30%",
        margin: "auto",
        "backgroundColor": "gray",
    },
}

class MainPane extends React.Component {
    constructor(props) {
        super(props);
        this.handleNewCurrentTime = this.handleNewCurrentTime.bind(this)
        this.state = {
            videoPath: "./sample.mp4",
            currentTime: 0,
        };
    }

    handleNewCurrentTime(newTime) {
        this.setState({ currentTime: newTime })
    }

    render() {
        return (
            <div style={styles.container}>
                <MainPaneVideoPlayer path={this.state.videoPath}
                    playTime={this.state.currentTime}
                    style={styles.videoPlayer} />

                <MainPaneUnderStrip playTime={this.state.currentTime}
                    onChangePlayTime={this.handleNewCurrentTime}
                    style={styles.underStrip} />
            </div>
        );
    }
}

export default MainPane;
