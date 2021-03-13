import "./App.css";

import Watercrafts from "./listWaterCraft/Watercrafts";
import ListOfWaterCrafts from "./listWaterCraft/ListOfWaterCrafts";
// import Login from "./components/Login/Login.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core";
import MiniDrawer from "./components/Sidebar/Sidebar";
import Login from "./components/Login/Login";
import PrivateRoute from "./components/Login/PrivateRoute";


const useStyle = makeStyles((theme) => ({
  stylingComponents: {
    marginLeft: "20%",
  },
  stylingComponentsFalse: {
    marginLeft: "0px",
  },
}));

function getAccess() {
  return sessionStorage.getItem("role");
}

function getToken() {
  return sessionStorage.getItem("authorization");
}

function App() {
  const token = getToken();
  console.log(token);
  const [childData, setChildData] = useState(true);

  const classes = useStyle();
  return (
    <>
      <Router>

        { !token &&
      <Route path="/" component={Login} />
        }
    { token && 
        <PrivateRoute path="/" component={MiniDrawer} />
    }
      </Router>
    </>
  );
}

export default App;
