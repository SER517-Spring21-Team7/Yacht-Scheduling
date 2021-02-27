import "./App.css";
import Watercrafts from "./listWaterCraft/Watercrafts";
import ListOfWaterCrafts from "./listWaterCraft/ListOfWaterCrafts";
import Login from "./components/login/Login.js";
import Toolbar from "./components/Sidebar/ToolbarUI";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import AddWatercraft from "./components/AddWatercraftComponent/AddWatercraft";
import MyAccount from "./components/MyAccount/MyAccount";
import { EditWatercraft } from './editWaterCraft/EditWatercraft';
import HolidayCalendar from "./components/scheduler/HolidayCalendar";
import AddMember from './components/AddMember/AddMember';
import SearchMember from './components/AddMember/SearchMember'

const useStyle = makeStyles((theme) => ({
  stylingComponents: {
    width: "80%",
    marginLeft: "20%",
    marginTop: "4.5%",
  },
}));

function setAccess(userAccess) {
  sessionStorage.setItem("access", JSON.stringify(userAccess));
}

function getAccess() {
  const accessString = sessionStorage.getItem("access");
  const userAccess = JSON.parse(accessString);
  return userAccess?.access;
}

function App() {
  //const token = getAccess();
  
  // if(!token) {
  //  return <Login setAccess={setAccess} />
  // }
  const classes = useStyle();
  return (
    <>
      <HolidayCalendar isEdit={true} />
      {/* <Router>
        <Toolbar/>
        <Switch>
          <div className={classes.stylingComponents}>
            <Route path='/listwatercraft' exact component={ListOfWaterCrafts} />
            <Route path='/watercrafts'><AddWatercraft data={ null}/></Route>
            <Route path='/member' component={AddMember}/>
            <Route path='/MyAccount' component={MyAccount} />
            <Route path='/editWatercraft/:idOfWatercraft' component={EditWatercraft}/>
          </div>
        </Switch>
      </Router> */}
    </>
  );
}

export default App;
