import "./App.css";
import Watercrafts from "./listWaterCraft/Watercrafts";
import ListOfWaterCrafts from "./listWaterCraft/ListOfWaterCrafts";
import Login from "./components/Login/Login.js";
import Toolbar from "./components/Sidebar/ToolbarUI";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import AddWatercraft from "./components/AddWatercraftComponent/AddWatercraft";
import MyAccount from "./components/MyAccount/MyAccount";
import { EditWatercraft } from "./editWaterCraft/EditWatercraft";
import HolidayCalendar from "./components/scheduler/HolidayCalendar";
import AddMember from "./components/AddMember/AddMember";
import SearchMember from "./components/AddMember/SearchMember";
import SchedulerSetting from "./components/SchedulerSettings/SchedulerSetting";
import ListMember from "./listMember/ListMember";

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

function setToken(userToken) {
  sessionStorage.setItem("token", JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  return userToken?.token;
}

function App() {
  const token = getToken();
  //const classes = useStyle();
  //const token = getAccess();

  //if(!token) {
  //  return <Login setAccess={setAccess} />
  // }
  const classes = useStyle();
  return (
    <>
      {/* <HolidayCalendar isEdit={true} /> */}
      <Router>
        <Toolbar />
        <Switch>
          <div className={classes.stylingComponents}>
            <Route path="/listwatercraft" exact component={ListOfWaterCrafts} />
            <Route path="/watercrafts">
              <AddWatercraft data={null} />
            </Route>
            <Route path="/member" component={AddMember} />
            <Route path="/MyAccount" component={MyAccount} />
            <Route
              path="/editWatercraft/:idOfWatercraft"
              component={EditWatercraft}
            />
            <Route path="/listMember" component={ListMember} />
            <Route path="/login" component={Login} />
            <Route path="/scheduler" component={SchedulerSetting} />
            <Route path="/" exact />
            <Route path="/watercrafts" component={AddWatercraft} />
          </div>
        </Switch>
      </Router>
    </>
  );
}

export default App;
