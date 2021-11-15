import "../styles/MainPane.css"
import React from "react"

class MainPaneVideoPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            videoPlayer: null,
            videoLength: 0,
        };
    }

    render() {
        return (
            <div className="MainPane-VideoPlayer" >
                <video src={this.props.path} style={{ height: "90%" }} id="mainVideoPlayer"></video>
                <p>{this.props.playTime}</p>
            </div>
        );
    }

    componentDidUpdate(){
        const vp = document.getElementById('mainVideoPlayer');
        if (this.state.videoLength !== vp.duration){
            this.setState({
                videoPlayer: vp,
                videoLength: vp.duration,
            })
            return;
        }
        vp.currentTime = this.props.playTime / 1000 * this.state.videoLength;
    }
}

export default MainPaneVideoPlayer;
