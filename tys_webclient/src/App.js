import "./App.css";

import Watercrafts from "./listWaterCraft/Watercrafts";
import ListOfWaterCrafts from "./listWaterCraft/ListOfWaterCrafts";
// import Login from "./components/Login/Login.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";

import { makeStyles, Toolbar } from "@material-ui/core";
import MiniDrawer from "./components/Sidebar/Sidebar";
import AddWatercraft from "./components/AddWatercraftComponent/AddWatercraft";
import AddMember from "./components/AddMember/AddMember";
import MyAccount from "./components/MyAccount/MyAccount";
import ListMember from "./listMember/ListMember";
import { EditWatercraft } from "./editWaterCraft/EditWatercraft";
import SchedulerSetting from "./components/SchedulerSettings/SchedulerSetting";
import HolidayCalendar from "./components/SchedulerSettings/HolidayCalendar";

const useStyle = makeStyles((theme) => ({
  stylingComponents: {
    marginLeft: "20%",
  },
  stylingComponentsFalse: {
    marginLeft: "0px",
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

  const [childData, setChildData] = useState(true);
  //const classes = useStyle();
  //const token = getAccess();

  //if(!token) {
  //  return <Login setAccess={setAccess} />
  // }
  const classes = useStyle();
  return (
    <>
      <Router>
        <Toolbar />
        <Switch>
          <div className={classes.stylingComponents}>
            <Route path="/listwatercraft" exact component={ListOfWaterCrafts} />
            <Route path="/watercrafts">
              <AddWatercraft data={null} />
            </Route>
            <Route path="/member" component={AddMember} />
            <Route path="/viewmember" component={ListMember} />
            <Route path="/MyAccount" component={MyAccount} />
            <Route
              path="/editWatercraft/:idOfWatercraft"
              component={EditWatercraft}
            />
            <Route path="/listMember" component={ListMember} />
            {/* <Route path="/login" component={Login} /> */}
            <Route path="/scheduler" component={SchedulerSetting} />
            <Route path="/" exact />
            <Route path="/watercrafts" component={AddWatercraft} />
            <Route path="/holidaycalendar" component={HolidayCalendar} />
          </div>
      </Switch>
      <MiniDrawer />
      </Router>
    </>
  );
}

export default App;
