import './styles/App.css';
import Desktop from './views/Desktop';
import LeftPane from './views/LeftPane';

function App() {
  return (
    <div className="App">
      <LeftPane />
      <Desktop />
    </div>
  );
}

export default App;
