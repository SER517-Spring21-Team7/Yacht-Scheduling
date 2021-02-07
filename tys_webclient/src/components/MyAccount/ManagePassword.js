import React, { useState } from "react";
import { Grid, TextField, makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const useStyle = makeStyles((theme) => ({
  root: {
    backgroundColor: "#90caf9",
    width: "80%",
    marginTop: theme.spacing(0),
    marginLeft: theme.spacing(15),
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(2),
    },
    flexGrow: 1,
  },
  container: {
    backgroundColor: "#f5f5f5",
    width: "100%",
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(0),
  },
  eachGrid: {
    marginLeft: theme.spacing(20),
  },
}));

const initialValues = {
  currentPassword: "",
  newPassword: "",
  showPassword: false,
};

export default function ManagePassword() {
  const [values, setValues] = useState(initialValues);
  const classes = useStyle();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <form className={classes.root}>
      <Typography>
        <Box fontWeight="fontWeightBold" fontSize={20} textAlign="left" m={1}>
          Be secure - Update your password
        </Box>
      </Typography>
      <Grid container className={classes.container}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6} classname={classes.eachGrid}>
          <TextField
            required
            variant="outlined"
            label="Current Password"
            name="currentPassword"
            type={values.showPassword ? "text" : "password"}
            value={values.currentPassword}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={6} classname={classes.eachGrid}>
          <TextField
            required
            variant="outlined"
            label="New Password"
            name="newPassword"
            type="password"
            value={values.newPassword}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={6} classname={classes.eachGrid}>
          <TextField
            required
            variant="outlined"
            label="Confirm New Password"
            name="mobile"
            type="password"
            value={values.mobile}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>
    </form>
  );
}
