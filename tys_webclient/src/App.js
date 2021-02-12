import './App.css';
import Toolbar from './components/Sidebar/ToolbarUI';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {makeStyles} from '@material-ui/core'
import AddWatercraft from './components/AddWatercraftComponent/AddWatercraft';
import MyAccount from './components/MyAccount/MyAccount';



const useStyle = makeStyles(theme =>({
  stylingComponents: {
          width: '80%',
          marginLeft: '20%',
          marginTop: '4.5%'
        }
}))


function App() {
  const classes = useStyle();

  return (
    <>
      <Router>
        <Toolbar/>
        <Switch>
          <div className={classes.stylingComponents}>
            <Route path='/' exact/>
            <Route path='/watercrafts' component={AddWatercraft} />
            <Route path='/MyAccount' component={MyAccount} />
          </div>
        </Switch>
      </Router>
    </>
  );
}

export default App;
