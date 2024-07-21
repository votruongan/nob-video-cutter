import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL, fetchFile } from "@ffmpeg/util";

const FFmpegUtils = {
    loadFFmpeg: async (currentFFmpegRef: FFmpeg) => {
        const baseURL = "https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/esm";
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
          workerURL: await toBlobURL(
            `${baseURL}/ffmpeg-core.worker.js`,
            "text/javascript"
          ),
        });
    },
    
}

export default FFmpegUtils