import React from "react";

const BASE = {
    minLeft: 19,
    maxLeft: 95,
}

const BASE_STYLE = {
    position: 'absolute',
    height: "17.2%",
    top: "77.5%",
}

class TimeLineStop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timeChanged: false,
            currentTime: -1,
            styles: {
                ...BASE_STYLE,
                left: "19%",
            },
        };
    }

    handleSeekPlayTime = event => {
        const newTime = event.target.value;
        this.props.onChangeDisplayFrame(newTime);
    }

    render() {
        console.log(this.state.styles)
        return (
            <img src="stop.svg" alt="stop" style={this.state.styles} />
        );
    }

    getNewLeft(position) {
        const res = Math.round(BASE.minLeft + position / 10000 * (BASE.maxLeft - BASE.minLeft)) + "%"
        console.log(position, res)
        return res;
    }

    componentDidMount() {
        this.componentDidUpdate()
    }

    componentDidUpdate() {
        let curTime = this.state.currentTime < 0 ? parseInt(this.props.initialTime) : this.state.currentTime;
        if (this.state.timeChanged) {
            this.setState({
                currentTime: curTime,
                timeChanged: false,
                styles: { ...BASE_STYLE, left: this.getNewLeft(curTime) },
            })
        }
    }
}

export default TimeLineStop