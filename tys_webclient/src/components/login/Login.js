import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import tysLogo from "../../tysLogo.png";
import axios from "axios";
import { useHistory } from "react-router-dom";
import loginBackground from '../../loginBackground.jpg'


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://theyachtsolution.com/">
        TheYachtSolutions
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${loginBackground})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login({ setAccess }) {
  // const bcrypt = require("bcrypt");
  const history = useHistory();
  const classes = useStyles();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const access = await loginUser({
  //     email,
  //     // bcrypt.hashSync(password, saltRounds)
  //   });
  //   alert(access);
  //   setAccess(access);
  //   alert("my login page");
  //   // this.history.push('/MyAccount');
  // };

  const handleSubmit = event => {
    event.preventDefault();

    const endpoint = "http://localhost:8080/authenticate";

    const user_object = {
      username: username,
      password: password
    };

    axios.post(endpoint, user_object).then(res => {

      sessionStorage.setItem("authorization", res.data.token);
      sessionStorage.setItem("role", res.data.role);
      sessionStorage.setItem("userId", res.data.id);
      history.push('/');
      window.location.reload();
    }, error => {
      alert("Authentication failure, retry");
    });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} align="center" component={Paper} elevation={6} square>
        <img
          src={tysLogo}
          alt="Logo"
          style={{
            resizeMode: "cover",
            height: "15%",
            marginTop: '5%'
          }}
        />
        <div className={classes.paper}>
          <Typography component="h1" variant="h6">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs={12} align="right">
                <Link href="https://theyachtsolution.com/" variant="body2">
                  {"Know more about The Yacht Solutions!"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default Login;
