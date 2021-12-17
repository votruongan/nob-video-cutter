import React from "react"
import TimeLineManager from "./UnderStrip/TimeLineManager";

const styles = {
    height: "17%",
}

class MainPaneUnderStrip extends React.Component {
    constructor(props) {
        super(props);
        this.handleSeekPlayTime = this.handleSeekPlayTime.bind(this);
        this.state = {};
    }

    handleSeekPlayTime(toTime) {
        this.props.onChangePlayTime(toTime);
    }

    render() {
        return (
            <div style={styles}>
                <TimeLineManager
                    onChangeDisplayFrame={this.handleSeekPlayTime}/>
            </div>
        );
    }
}

export default MainPaneUnderStrip;
