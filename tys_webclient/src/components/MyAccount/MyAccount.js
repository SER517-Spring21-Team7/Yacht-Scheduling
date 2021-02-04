import React, { useState } from "react";
import {
  Grid,
  TextField,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  makeStyles,
} from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";

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

const useStyle = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(2),
    },
    flexGrow: 1,
  },
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: "25ch",
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

function MyProfile() {
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
      <Grid container>
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
  );
}

export default function MyAccount() {
  const [indexValue, setIndexValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setIndexValue(newValue);
  };

  return (
    <div>
      <AppBar position="static" color="default">
        <Tabs
          value={indexValue}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Profile" {...a11yProps(0)} />
          <Tab label="Notification and privacy" {...a11yProps(1)} />
          <Tab label="Changes Password" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={indexValue} index={0}>
        <MyProfile />
      </TabPanel>
      <TabPanel value={indexValue} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={indexValue} index={2}>
        Item Three
      </TabPanel>
    </div>
  );
}
