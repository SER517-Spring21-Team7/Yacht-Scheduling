import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import React from "react";

import MiniDrawer from "./components/Sidebar/Sidebar";
import Login from "./components/Login/Login.js";
import PrivateRoute from "./components/Login/PrivateRoute.js";

function getToken() {
  return sessionStorage.getItem("authorization");
}

function App() {
  const token = getToken();
  console.log(token);

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
