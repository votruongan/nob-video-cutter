import React, { useRef, useState } from 'react';
import logo from './logo.svg';
import './styles/App.css';
import LeftPanel from './views/LeftPanel';
import MainPanel from './views/MainPanel';
import { FFmpeg } from "@ffmpeg/ffmpeg";
import FFmpegUtils from './utils/ffmpegUtils';
import { TimeLineStopData } from 'models/TimeLineModels';

function App() {
  const [allStops, setAllStops] = useState(new Map<string, TimeLineStopData>);
  const [loaded, setLoaded] = useState(false);
  const ffmpegRef = useRef(new FFmpeg());

  // FFmpegUtils.loadFFmpeg(ffmpegRef.current).then(() => setLoaded(true))
  return (
      <div className="App">
          <LeftPanel />
          <MainPanel
            allStops = {allStops}
            onAllStopsChanged = {setAllStops}
          />
      </div>
  );
}

export default App;
