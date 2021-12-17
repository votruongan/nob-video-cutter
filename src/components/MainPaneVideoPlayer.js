import React from "react"

class MainPaneVideoPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.videoPlayer = React.createRef()
        this.state = {
            videoLength: 0,
        };
    }

    render() {
        return (
            <div>
                <video ref={this.videoPlayer} src={this.props.path} style={{ height: "70vh" }}></video>
                <p className="text-white">{this.props.playTime}</p>
            </div>
        );
    }

    componentDidUpdate(){
        const {current: vp} = this.videoPlayer;
        if (this.state.videoLength !== vp.duration){
            this.setState({
                videoLength: vp.duration,
            })
            return;
        }
        vp.currentTime = this.props.playTime / 10000 * this.state.videoLength;
    }
}

export default MainPaneVideoPlayer;
