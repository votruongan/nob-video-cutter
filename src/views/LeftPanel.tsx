import { FFmpeg } from "@ffmpeg/ffmpeg";
import { TimeLineCutRange } from "models/TimeLineModels";
import React, { ChangeEventHandler, CSSProperties, useRef } from "react"
import VideoUtils from "utils/videoUtils";

const style: CSSProperties = {
    width: "10%",
    height: "100vh",
    float: "left",
    backgroundColor: "#818ea7",
}

const baseButtonStyle: CSSProperties = {
    border: "none",
    width: "100%",
    height: "50%",
}


interface LeftPanelProps {
    ffmpeg: FFmpeg,
    videoFile: File | null,
    videoLength: number,
    allCutRanges: Map<string, TimeLineCutRange>,
    onSelectNewFile: (selected: File) => void,
    displayLoading: (isLoading: boolean, message?: string) => void,
}


export default function LeftPane(props: LeftPanelProps) {
    const importRef = useRef<HTMLInputElement>(null)
    const { displayLoading } = props

    const importClickHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
        console.log("importClickHandler")
        importRef.current?.click()
    }

    const handleImportFile: ChangeEventHandler<HTMLInputElement> = async (event) => {
        const file = event.target.files?.item(0)
        console.log(file)
        displayLoading(true, "Writing file")
        if (!file) return;
        await file.arrayBuffer().then((buffer) => {
            props.ffmpeg.writeFile(file.name, new Uint8Array(buffer))
        })
        props.onSelectNewFile(file)
        displayLoading(false)
    }

    const handleExportFile: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
        if (!props.videoFile) return console.error("No file videoFile found")
        const videoName = props.videoFile!.name
        const ranges = Array.from(props.allCutRanges.values())

        console.log("cutting - START")

        displayLoading(true, "Preparing")

        props.ffmpeg.on("progress", ({ progress, time }) => {
            if (progress > 0.05) {
                displayLoading(true, `Processing... ${VideoUtils.roundTo2Decimal(progress * 100)}%`)
            }
        })
        if (ranges.length > 1) {
            await VideoUtils.cutVideoFileWithRanges(
                props.ffmpeg,
                videoName,
                ranges,
                props.videoLength,
                `./output/output.mp4`,
            )
            displayLoading(true, "Downloading")
            await VideoUtils.downloadVideo(
                props.ffmpeg,
                `./output/output.mp4`,
                `trimmed_${videoName}`
            )
        } else if (ranges.length == 1) {
            await VideoUtils.cutVideoFileOneRange(
                props.ffmpeg,
                videoName,
                ranges,
                props.videoLength,
                `./output/output.mp4`,
            )
            displayLoading(true, "Downloading")
            await VideoUtils.downloadVideo(
                props.ffmpeg,
                `./output/output.mp4`,
                `trimmed_${videoName}`
            )
        } else {
            await VideoUtils.downloadVideo(
                props.ffmpeg,
                `${videoName}`,
                `trimmed_${videoName}`
            )
        }
        console.log("cutting - DONE!")
        displayLoading(false)
    }

    return (
        <div style={style}>
            <input onChange={handleImportFile} ref={importRef} type="file" name="file" id="file" hidden />
            <button style={{
                ...baseButtonStyle,
                background: "MediumSeaGreen",
            }}
                onClick={importClickHandler}
            >
                <div>Import</div>
            </button>
            <button style={{
                ...baseButtonStyle,
                background: "DodgerBlue",
            }}
                onClick={handleExportFile}
            >
                <div>Cut video</div>
            </button>
        </div>
    );
}
