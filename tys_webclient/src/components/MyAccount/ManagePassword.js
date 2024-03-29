import React, { useState } from "react";
import axios from "axios";
import {
  Grid,
  TextField,
  makeStyles,
  Box,
  Typography,
  Button,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

const useStyle = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1.5),
    },
    flexGrow: 1,
  },
  buttonStyle: {
    marginLeft: "38%",
  },
  container: {
    padding: theme.spacing(1),
    marginTop: "1%",
    border: "4px solid #4db6ac",
    borderRadius: "5px",
  },
  button: {
    margin: theme.spacing(2),
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

  const saveChanges = () => {
    const url =
      "http://ec2-18-237-18-199.us-west-2.compute.amazonaws.com:8080/user/passUpdate/" +
      sessionStorage.getItem("userId");
    axios
      .post(url, { ...values })
      .then((resp) => {
        console.log(resp.data);
        alert("Password updated.");
      })
      .catch((error) => {
        alert("Invalid Credentials provided");
        console.log(error);
      });
  };

  return (
    <div>
      <form className={classes.root}>
        <Typography>
          <Box fontSize={20} textAlign="center">
            Be secure - Update your password
          </Box>
        </Typography>
        <Grid container className={classes.container}>
          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
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
          <Grid item xs={6}>
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
          <Grid item xs={6}>
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
      <div className={classes.buttonStyle}>
        <Button
          variant="contained"
          color="primary"
          size="medium"
          className={classes.button}
          startIcon={<SaveIcon />}
          onClick={saveChanges}
        >
          Save changes
        </Button>
      </div>
    </div>
  );
}
