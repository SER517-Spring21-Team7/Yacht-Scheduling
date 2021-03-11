import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router} from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import MiniDrawer from "./components/Sidebar/Sidebar";

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
        <MiniDrawer />
      </Router>
    </>
  );
}

export default App;
