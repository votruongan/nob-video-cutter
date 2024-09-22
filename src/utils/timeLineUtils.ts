import { TIMELINE_MAXIMUM_INTERVAL } from "models/TimeLineModels";

const BASE = {
    minLeft: 12.5,
    maxLeft: 100,
}

const TimeLineUtils = {
    calculatePosition: (timeLinePos: number) => {
        return BASE.minLeft + timeLinePos / TIMELINE_MAXIMUM_INTERVAL * (BASE.maxLeft - BASE.minLeft)
    }
}

export default TimeLineUtils;