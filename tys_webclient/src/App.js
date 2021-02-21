import './App.css';
import Watercrafts from './listWaterCraft/Watercrafts';
import ListOfWaterCrafts from './listWaterCraft/ListOfWaterCrafts';
import Login from './components/login/Login.js';
import Toolbar from './components/Sidebar/ToolbarUI';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {makeStyles} from '@material-ui/core'
import AddWatercraft from './components/AddWatercraftComponent/AddWatercraft';
import MyAccount from './components/MyAccount/MyAccount';
import AddMember from './components/AddMember/AddMember';


const useStyle = makeStyles(theme =>({
  stylingComponents: {
          width: '80%',
          marginLeft: '20%',
          marginTop: '4.5%'
        }
}))

function setAccess(userAccess) {
  sessionStorage.setItem('access', JSON.stringify(userAccess));
}
  
function getAccess() {
  const accessString = sessionStorage.getItem('access');
  const userAccess = JSON.parse(accessString);
  return userAccess?.access
}
  
function App() {
  //const token = getAccess();
  
  // if(!token) {
  //  return <Login setAccess={setAccess} />
  // }
  const classes = useStyle();
  return (
    <>
      <Router>
        <Toolbar/>
        <Switch>
          <div className={classes.stylingComponents}>
            <Route path='/listwatercraft' exact component={ListOfWaterCrafts} />
            <Route path='/watercrafts' component={AddWatercraft} />
            <Route path='/member' component={AddMember}/>
            <Route path='/MyAccount' component={MyAccount} />
          </div>
        </Switch>
      </Router>
    </>
  );
}

export default App;
