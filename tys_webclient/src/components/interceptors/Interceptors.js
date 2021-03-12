import axios from 'axios';
//var axios = require("axios");

const instance = axios.create();

//const jwtToken = sessionStorage.getItem("authorization");
console.log("jwtToken");
instance.interceptors.request.use(
  (config) => {
    console.log("in interceptor");
    const jwtToken = sessionStorage.getItem("authorization");
    if (jwtToken) {
      config.headers['Authorization'] = "Bearer " + jwtToken;
      console.log('config' + config);
    }
    return config;
  },
  (error) => {
    Promise.reject(err);
  }
);

export default instance;