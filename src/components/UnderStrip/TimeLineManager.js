import React from "react"
import "../../styles/TimeLineInput.css"
import TimeLineStop from "./TimeLineStop";

const styles = {
    container: {
        width: "auto", height: "100%",
    },
    dimension: {
        height: "100%",
        width: "90%",
    },
}

class TimeLineManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTime: 500,
            stops: [],
        };
    }

    handleSeekPlayTime = event => {
        const newTime = event.target.value;
        this.state.stops.push({id: newTime, position: newTime});
        this.props.onChangeDisplayFrame(newTime);
    }

    render() {
        const stopList = this.state.stops.map((stopObj, i)=>{
            return <TimeLineStop key={i} initialTime={stopObj.position}/>
        })
        return (
            <div style={styles.container}>
                <input type="range" id="timeline-wrapper"
                    defaultValue={this.state.currentTime}
                    min="0" max="10000"
                    style={styles.dimension}
                    onInput={this.handleSeekPlayTime}
                />
                {stopList}
            </div>
        );
    }
}

export default TimeLineManager;
