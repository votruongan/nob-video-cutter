import "../styles/MainPane.css"
import React from "react"

class MainPaneUnderStrip extends React.Component {
    constructor(props) {
        super(props);
        this.handleSeekPlayTime = this.handleSeekPlayTime.bind(this);
        this.state = {};
    }

    handleSeekPlayTime(event) {
        const newTime = event.target.value;
        this.props.onChangePlayTime(newTime);
    }

    render() {
        return (
            <div className="MainPane-UnderStrip">
                <input type="range" style={{ marginTop: "32px", }}
                    defaultValue="0"
                    min="0" max="1000"
                    onInput={this.handleSeekPlayTime}
                />
            </div>
        );
    }
}

export default MainPaneUnderStrip;
