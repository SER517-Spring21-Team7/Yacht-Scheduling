import axios from 'axios';
//var axios = require("axios");

//const instanceOf = axios.create();

axios.interceptors.request.use(config => {
    console.log("in interceptor");
    const jwtToken = sessionStorage.getItem("authorization");
    if (jwtToken) {
      config.headers['Authorization'] = "Bearer " + jwtToken;
      console.log('config' + config);
    }
    return config;
  }, error => {
  // Do something with request error
  return Promise.reject(error);
});


axios.interceptors.response.use(res => {
  console.log(res.data.json);
  // Important: response interceptors **must** return the response.
  return res;
});