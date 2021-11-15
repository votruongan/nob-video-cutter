import MainPaneUnderStrip from "../components/MainPaneUnderStrip";
import MainPaneVideoPlayer from "../components/MainPaneVideoPlayer";
import "../styles/MainPane.css"
import React from "react"

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
            <div className="MainPane">
                <MainPaneVideoPlayer path={this.state.videoPath}
                    playTime={this.state.currentTime} />

                <MainPaneUnderStrip playTime={this.state.currentTime}
                    onChangePlayTime={this.handleNewCurrentTime} />
            </div>
        );
    }
}

export default MainPane;
