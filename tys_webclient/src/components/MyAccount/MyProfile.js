import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  makeStyles,
  Box,
  Typography,
  Button,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

const useStyle = makeStyles((theme) => ({
  root: {
    backgroundColor: "#90caf9",
    width: "80%",
    marginTop: theme.spacing(0),
    marginLeft: theme.spacing(15),

    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1.5),
    },
    '& .MuiButtonBase-root':{
      marginLeft: '38%',
    },
    flexGrow: 1,
  },
  buttonStyle: {
    marginLeft: '38%'
  },
  container: {
    backgroundColor: "#f5f5f5",
    width: "100%",
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(0),
  },
  button: {
    margin: theme.spacing(2),
  },
}));

const initialValues = {
  firstName: "",
  lastName: "",
  mobile: "",
  alternateMobile: "",
  timezone: "",
  country: "",
  address_1: "",
  address_2: "",
  city: "",
  state: "",
  zipCode: "",
};

export default function MyProfile() {
  const [values, setValues] = useState(initialValues);
  const classes = useStyle();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  useEffect((values) => {
    fetch("http://localhost:8080/user/3/profile", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) =>
        setValues({
          ...values,
          firstName: data.firstName,
          lastName: data.lastName,
          mobile: data.mobile,
          alternateMobile: data.alternateMobile,
          timezone: data.timezone,
          country: data.country,
          address_1: data.address_1,
          address_2: data.address_2,
          city: data.city,
          state: data.state,
          zipCode: data.zipCode,
        })
      );
  }, []);

  const saveChanges = () => {
    return fetch("http://localhost:8080/user/3/profile", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...values,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log("User profile updated.");
      })
      .catch((error) => {
        console.error("User profile update failed.");
      });
  };

  return (
    <>
      <form className={classes.root}>
        <Typography>
          <Box fontWeight="fontWeightBold" fontSize={20} textAlign="left" m={1}>
            Personal Information - View and Update
          </Box>
        </Typography>
        <Grid container className={classes.container}>
          <Grid item xs={6}>
            <TextField
              required
              variant="outlined"
              label="First Name"
              name="firstName"
              value={values.firstName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              variant="outlined"
              label="Last Name"
              name="lastName"
              value={values.lastName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              variant="outlined"
              label="Mobile"
              name="mobile"
              type="number"
              helperText="only digits (no symbol, no dash and no space)"
              value={values.mobile}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              label="Alternate Mobile"
              name="alternateMobile"
              type="number"
              helperText="only digits (no symbol, no dash and no space)"
              value={values.alternateMobile}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="outlined" required>
              <InputLabel>Timezone</InputLabel>
              <Select
                label="Timezone"
                name="timezone"
                value={values.timezone}
                onChange={handleInputChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Diesel"}>Diesel</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="outlined" required>
              <InputLabel>Country</InputLabel>
              <Select
                label="Country"
                name="country"
                value={values.country}
                onChange={handleInputChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Diesel"}>Diesel</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              variant="outlined"
              label="Address (Line 1)"
              name="address_1"
              value={values.address_1}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              label="Address (Line 2)"
              name="address_2"
              value={values.address_2}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              variant="outlined"
              label="City"
              name="city"
              value={values.city}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              variant="outlined"
              label="State/Province"
              name="state"
              value={values.state}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              variant="outlined"
              label="Zip/Postal Code"
              name="zipCode"
              value={values.zipCode}
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
    </>
  );
}
