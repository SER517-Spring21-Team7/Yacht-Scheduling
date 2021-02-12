import './App.css';
import Toolbar from './components/Sidebar/ToolbarUI';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <Toolbar/>
      </Router>
    </>
  );
}

export default App;
