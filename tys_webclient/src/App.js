import './App.css';
import Login from './components/Login/Login.js';
import Toolbar from './components/Sidebar/ToolbarUI';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {makeStyles} from '@material-ui/core'
import AddWatercraft from './components/AddWatercraftComponent/AddWatercraft';
import MyAccount from './components/MyAccount/MyAccount';
import SchedulerSetting from './components/SchedulerSettings/SchedulerSetting';



const useStyle = makeStyles(theme =>({
  stylingComponents: {
          width: '80%',
          marginLeft: '20%',
          marginTop: '4.5%'
        }
}))

function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
}

function App() {
  const token = getToken();
  const classes = useStyle();

  //return <SchedulerSetting />
  // if(!token) {
  //    return <Login setToken={setToken} />
  // }
  // else {
    return (
      <>
        <Router>
          <Toolbar/>
          <Switch>
            <div className={classes.stylingComponents}>
              <Route path='/login' component={Login} />
              <Route path='/Scheduler' component={SchedulerSetting} />
              <Route path='/' exact/>
              <Route path='/watercrafts' component={AddWatercraft} />
              <Route path='/MyAccount' component={MyAccount} />
            </div>
          </Switch>
        </Router>
      </>
    );
 }
//}

export default App;
