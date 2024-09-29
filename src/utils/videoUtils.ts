import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";
import { TIMELINE_MAXIMUM_INTERVAL, TimeLineCutRange } from "models/TimeLineModels";

const VideoUtils = {
  loadFFmpeg: async (currentFFmpegRef: FFmpeg) => {
    const baseURL = `/nob-video-cutter/ffmpeg`;
    const ffmpeg = currentFFmpegRef;
    ffmpeg.on("log", ({ message }) => {
      console.log(`FFMPEG - Load - ${message}`);
    });
    // toBlobURL is used to bypass CORS issue, urls with the same
    // domain can be used directly.
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        "application/wasm"
      ),
    });
  },

  readVideoLength: (videoPath: string, setVideoLength: (l: number) => void) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.onloadedmetadata = function () {
      setVideoLength(video.duration)
    }
    video.src = videoPath;
  },

  roundTo2Decimal: (float: number | undefined): number => {
    if (!float) return 0
    return Math.floor(float * 100) / 100
  },

  relativeToAbsoluteTimePointString: (relativeToMaxValue: number, maxVideoLength: number) => {
    const relative = relativeToMaxValue / TIMELINE_MAXIMUM_INTERVAL
    const inSeconds = relative * maxVideoLength
    const minutes = Math.floor(inSeconds / 60)
    const seconds = inSeconds % 60
    return `${minutes}:${VideoUtils.roundTo2Decimal(seconds)}`
  },

  cutVideoFileOneRange: async (ffmpegInstance: FFmpeg, inputPath: string, unsortedRanges: TimeLineCutRange[], videoLength: number, outputPath: string) => {
    if (unsortedRanges.length === 0) { return console.log("No range to cut") }
    // const sortedRanges = unsortedRanges.sort((rangeA, rangeB) => {
    //   const startA = rangeA.start ? rangeA.start : 0
    //   const startB = rangeB.start ? rangeB.start : 0
    //   return startA > startB ? 1 : (startA < startB ? -1 : 0)
    // })
    let startTime = 0, endTime = 0;
    const filterRanges = unsortedRanges.map(range => {
      const start = (range.start ? range.start : 0) / TIMELINE_MAXIMUM_INTERVAL * videoLength
      const end = (range.end ? range.end : 0) / TIMELINE_MAXIMUM_INTERVAL * videoLength
      startTime = VideoUtils.roundTo2Decimal(start)
      endTime = VideoUtils.roundTo2Decimal(end)
    })
    await ffmpegInstance.exec([
      "-i", inputPath,
      "-ss", startTime.toString(),
      "-t", endTime.toString(),
      "-c:v", "copy",
      "-c:a", "copy",
      outputPath
    ])
  },
  cutVideoFileWithRanges: async (ffmpegInstance: FFmpeg, inputPath: string, unsortedRanges: TimeLineCutRange[], videoLength: number, outputPath: string) => {
    if (unsortedRanges.length === 0) { return console.log("No range to cut") }
    const sortedRanges = unsortedRanges.sort((rangeA, rangeB) => {
      const startA = rangeA.start ? rangeA.start : 0
      const startB = rangeB.start ? rangeB.start : 0
      return startA > startB ? 1 : (startA < startB ? -1 : 0)
    })
    const filterRanges = sortedRanges.map(range => {
      const start = (range.start ? range.start : 0) / TIMELINE_MAXIMUM_INTERVAL * videoLength
      const end = (range.end ? range.end : 0) / TIMELINE_MAXIMUM_INTERVAL * videoLength
      const rs = VideoUtils.roundTo2Decimal(start)
      const re = VideoUtils.roundTo2Decimal(end)
      return `between(t,${rs},${re})`
    })
    const vfString = `select='${filterRanges.join("+")}',setpts=N/FRAME_RATE/TB`
    const afString = `aselect='${filterRanges.join("+")}',asetpts=N/SR/TB`

    await ffmpegInstance.exec([
      "-i", inputPath,
      "-vf", vfString,
      "-af", afString,
      outputPath
    ])
  },

  downloadVideo: async (ffmpegInstance: FFmpeg, filePath: string, newFileName: string) => {
    const downloadURL = function (data: string, fileName: string) {
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = data;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
    };
    const fileContent = await ffmpegInstance.readFile(filePath)
    const blob = new Blob([fileContent], {
      type: "video/mp4"
    });
    const url = window.URL.createObjectURL(blob);
    downloadURL(url, newFileName);
    setTimeout(function () {
      return window.URL.revokeObjectURL(url);
    }, 1000);
  }


}

export default VideoUtils