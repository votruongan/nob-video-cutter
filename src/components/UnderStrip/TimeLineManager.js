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
            currentStopId: 0,
        };
    }

    get currentStopName(){
        return `stop-${this.state.currentStopId}`
    }

    handleSeekPlayTime = event => {
        const newTime = event.target.value;
        this.props.onChangeDisplayFrame(newTime);
    }

    handleNewStopStart = event => {
        const newPosition = event.target.value;
        if (this.state[this.currentStopName] && this.state[this.currentStopName].start){
            this.setState({
                [this.currentStopName]: { 
                    ...this.state[this.currentStopName], end: newPosition,
                }
            })
        } else {
            this.setState({
                [this.currentStopName]: { start: newPosition },
                stops: [...this.state.stops, this.currentStopName]
            })
        }
        this.props.onChangeDisplayFrame(newPosition);
    }
    handleFinishSetStop = event => {
        console.log(this.state.currentStopId)
        this.setState({
            [this.currentStopName]: { 
                ...this.state[this.currentStopName], end: event.target.value,
                isAdjusting: false,
            },
            currentStopId: this.state.currentStopId + 1,
        })
        this.props.onChangeDisplayFrame(event.target.value);
    }
    handleCancelSetStop = event => {
        this.setState({
            [this.currentStopName]: {},
        })
    }


    render() {
        const stopList = []
        this.state.stops.forEach((stopName) => {
            const {start, end, isAdjusting} = this.state[stopName]
            console.log(start,end)
            if (start)
                stopList.push(<TimeLineStop key={`${stopName}-start`} initialTime={start} isAdjusting={isAdjusting}/>)
            if (end)
                stopList.push(<TimeLineStop key={`${stopName}-end`} initialTime={end} isEndStop={true} isAdjusting={isAdjusting} />)
        })
        return (
            <div style={styles.container}>
                <input type="range" id="timeline-wrapper"
                    defaultValue={this.state.currentTime}
                    min="0" max="10000"
                    style={styles.dimension}
                    onMouseLeave={this.handleCancelSetStop}
                    onMouseUp={this.handleFinishSetStop}
                    onInput={this.handleNewStopStart}
                />
                {stopList}
            </div>
        );
    }
}

export default TimeLineManager;
