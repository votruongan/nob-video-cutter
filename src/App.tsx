import React, { useRef, useState } from 'react';
import logo from './logo.svg';
import './styles/App.css';
import LeftPanel from './views/LeftPanel';
import MainPanel from './views/MainPanel';
import { FFmpeg } from "@ffmpeg/ffmpeg";
import FFmpegUtils from './utils/videoUtils';
import { TimeLineCutRange } from 'models/TimeLineModels';
import VideoUtils from './utils/videoUtils';
import LoadingPopover from 'views/LoadingPopover';

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [videoPath, setVideoPath] = useState("")
  const [videoLength, setVideoLength] = useState(0)
  const [allCutRanges, setAllCutRanges] = useState(new Map<string, TimeLineCutRange>);
  const [loadedFFmpeg, setLoadedFFmpeg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Loading...");
  const ffmpegRef = useRef(new FFmpeg());

  const onUpdateVideoData = (file: File) => {
    console.log("onUpdateVideoData", file)
    setSelectedFile(file)
    const videoPath = URL.createObjectURL(file)
    console.log(videoPath)
    setVideoPath(videoPath)
    VideoUtils.readVideoLength(videoPath, setVideoLength)
  }
  
  const onHandleLoading = (isLoading: boolean, message: string = "") => {
    setLoading(isLoading)
    setLoadingMessage(message)
  }

  if (!loadedFFmpeg) {
    FFmpegUtils.loadFFmpeg(ffmpegRef.current).then(async () => {
      await ffmpegRef.current.createDir('./output');
      setLoadedFFmpeg(true)
    })
  }

  return (
      <div className="App" style={{overflow:"hidden"}}>
          <LoadingPopover isLoading={loading} loadingMessage={loadingMessage}/>
          <LeftPanel 
            ffmpeg={ffmpegRef.current}
            videoFile={selectedFile}
            videoLength={videoLength}
            allCutRanges={allCutRanges}
            onSelectNewFile={onUpdateVideoData}
            displayLoading={onHandleLoading}
          />
          <MainPanel
            videoPath={videoPath}
            allCutRanges={allCutRanges}
            videoLength={videoLength}
            onAllCutRangesChanged={setAllCutRanges}
          />
      </div>
  );
}

export default App;
