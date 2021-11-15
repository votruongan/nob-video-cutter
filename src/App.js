import './styles/App.css';
import React from "react"
import MainPane from './views/MainPane';
import LeftPane from './views/LeftPane';

function App() {
    return (
        <div className="App">
            <LeftPane />
            <MainPane />
        </div>
    );
}

export default App;
