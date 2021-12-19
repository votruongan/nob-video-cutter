import React from "react";

const BASE = {
    minLeft: 19,
    maxLeft: 95,
}

const BASE_STYLE = {
    position: 'absolute',
    width: "1vw",
    height: "17vh",
    top: "72.3%",
    backgroundImage: 'url("stop.svg")',
    backgroundRepeat: "no-repeat", 
}

const BASE_START_STYLE = {
    ...BASE_STYLE,
    transform: "rotateY(60deg)",
}

const BASE_END_STYLE = {
    ...BASE_STYLE,
    transform: "rotateY(120deg)",
}

class TimeLineStop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oldInitialTime: 0,
            readyToChange: true,
            currentTime: -1,
            styles: {
                ...this.baseStyle,
                left: "19%",
            },
        };
    }

    get baseStyle(){
        return this.props.isEndStop? BASE_END_STYLE : BASE_START_STYLE
    }

    handleSeekPlayTime = event => {
        const newTime = event.target.value;
        this.props.onChangeDisplayFrame(newTime);
    }

    render() {
        let curTime = parseInt(this.props.initialTime);
        if (this.props.initialTime !== this.state.oldInitialTime) {
            if (this.props.isEndStop) console.log("new end: ", this.props.initialTime)
            this.setState({
                currentTime: curTime,
                styles: { ...this.baseStyle, left: this.getNewLeft(curTime) },
                oldInitialTime: this.props.initialTime,
            })
        }
        return (
            <div src="stop.svg" alt="stop" style={this.state.styles} />
        );
    }

    getNewLeft(position) {
        const res = Math.round(BASE.minLeft + position / 10000 * (BASE.maxLeft - BASE.minLeft)) + "%"
        return res;
    }
}

export default TimeLineStop