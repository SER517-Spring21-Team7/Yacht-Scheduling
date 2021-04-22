import React, { useState, useEffect } from "react";
import "date-fns";
import {
  Typography,
  Grid,
  makeStyles,
  Box,
  TextField,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  Radio,
  Button,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import ColorPicker from "material-ui-color-picker";
import SearchField from "react-search-field";
import TypeChecker from "typeco";
import ExampleList from "./ExampleList";

const tempState = {
  drop: [],
};
const exampleList = [
  {
    name: "Joe Smith",
    email: "joesmith@gmail.com",
  },
  {
    name: "Alan Donald",
    email: "alan@gmail.com",
  },
];

const initialValues = {
  email: "",
  watercraft: "",
  firstname: "",
  lastname: "",
  password: "",
  password2: "",
  startdate: null,
  enddate: null,
  premiumshare: "",
  standardshare: "",
  freebookings: "",
  schedulercolor: "",
  access: "",
};
const watercraftObjectListInitial = [];
const useStyle = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      marginLeft: theme.spacing(15),
      width: "60%",
      margin: theme.spacing(1),
    },
  },

  containerStyle: {
    padding: theme.spacing(1),
    marginTop: "1%",
    border: "4px solid #4db6ac",
    borderRadius: "5px",
  },

  textLine: {
    height: "8vh",
  },
}));

export default function AddMember() {
  const classes = useStyle();
  const [values, setValues] = useState(initialValues);
  const [tempStateValues, setTempStateValues] = useState(tempState);
  const [watercraftObjectList, setWatercraftObjectList] = useState(
    watercraftObjectListInitial
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleStartDateChange = (e) => {
    setValues({
      ...values,
      startdate: new Date(e),
    });
  };

  const handleEndDateChange = (e) => {
    if (values.startdate < e) {
      setValues({
        ...values,
        enddate: new Date(e),
      });
    }
  };

  const handleColorChange = (e) => {
    setValues({
      ...values,
      schedulercolor: e,
    });
  };

  const buttonClicked = (event) => {
    console.log(values);
    return fetch(
      "http://ec2-18-237-18-199.us-west-2.compute.amazonaws.com:8080/member/details",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          watercraftId: watercraftObjectList.filter(
            (each) => each.watercraftName === values.watercraft
          )[0].watercraftId,
        }),
      }
    )
      .then((response) => response.json())
      .then((json) => {
        alert("Member successfully added!");
        setValues(initialValues);
      })
      .catch((error) => {
        alert("It seems we have some issue! Please retry.");
      });
  };

  const url =
    "http://ec2-18-237-18-199.us-west-2.compute.amazonaws.com:8080/watercraft/getAllWaterCraft";
  const watercraftList = [];
  const getWaterCraft = async () => {
    const response = await fetch(url, {
      method: "GET",
    });
    const watercraftResponse = await response.json();
    for (let i = 0; i < watercraftResponse.length; i++) {
      watercraftList.push(watercraftResponse[i].watercraftName);
    }
    setTempStateValues({
      ...tempStateValues,
      drop: watercraftList,
    });
    setWatercraftObjectList(watercraftResponse);
  };

  const [members, setMembers] = useState([]);

  const getAllMember = async () => {
    const response = await fetch(url, {
      method: "GET",
    });
    const members = await response.json();
    console.log(members);
    setMembers(members);
  };

  useEffect(() => {
    getWaterCraft();
  }, []);

  const getMatchedList = (searchText) => {
    // if (searchText === '') return '';
    if (TypeChecker.isEmpty(searchText)) return exampleList;
    return exampleList.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
  };
  const [onEnterExampleList, setOnEnterExampleList] = useState([]);

  var url1 =
    "http://ec2-18-237-18-199.us-west-2.compute.amazonaws.com:8080/member/searchMember?searchQuery=";
  const getMemberSearch = async () => {
    console.log(url1);
    const response = await fetch(url1, {
      method: "GET",
    });
    const members = await response.json();
    console.log(members);
    setOnEnterExampleList(members);
  };

  const onEnterExample = (value) => {
    console.log(value);
    url1 = url1.concat(value);
    getMemberSearch();
    // do database call
    // set in onEnterExample list
    // setOnEnterExampleList(getMatchedList(value));
  };

  const fillDetails = (model) => {
    setValues(model);
  };

  return (
    <>
      <form className={classes.root}>
        <Typography>
          <Box fontSize={20} textAlign="center">
            Search Existing Member or Enter Details
          </Box>
        </Typography>

        <Grid container className={classes.containerStyle}>
          <Grid item xs={12} sm={12} align="center">
            <SearchField
              placeholder="Search Member"
              onEnter={onEnterExample}
              searchText=""
              classNames="test-class"
            />
            <ExampleList list={onEnterExampleList} updateForm={fillDetails} />
          </Grid>
          <Grid
            item
            xs={5}
            sm={5}
            className={classes.textLine}
            style={{ paddingTop: "2vh" }}
          >
            <hr style={{ borderColor: "#4db6ac" }} />
          </Grid>
          <Grid item xs={2} sm={2} align="center" className={classes.textLine}>
            <h2>or</h2>
          </Grid>
          <Grid
            item
            xs={5}
            sm={5}
            className={classes.textLine}
            style={{ paddingTop: "2vh" }}
          >
            <hr style={{ borderColor: "#4db6ac" }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              id="email"
              type="email"
              name="email"
              label="Email"
              value={values.email}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined">
              <InputLabel>Watercraft</InputLabel>
              <Select
                label="Watercraft"
                name="watercraft"
                value={values.watercraft}
                onChange={handleInputChange}
              >
                <MenuItem>
                  <em>None</em>
                </MenuItem>
                {tempStateValues.drop.map((craft, index) => {
                  return (
                    <MenuItem key={index} value={craft}>
                      {craft}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              id="firstname"
              name="firstname"
              label="First Name"
              value={values.firstname}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              id="lastname"
              name="lastname"
              label="Last Name"
              value={values.lastname}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              type="password"
              id="password"
              name="password"
              label="Password"
              value={values.password}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              type="password"
              id="password2"
              name="password2"
              label="Re-enter Password"
              value={values.password2}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={9}>
            {/* Alignment only */}
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              type="number"
              id="premiumshare"
              name="premiumshare"
              label="Premium Share Slots"
              value={values.premiumshare}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              type="number"
              id="standardshare"
              name="standardshare"
              label="Standard Share Slots"
              value={values.standardshare}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              type="number"
              id="freebookings"
              name="freebookings"
              label="Free Booking(s) per month"
              value={values.freebookings}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container>
                <KeyboardDatePicker
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="startdate"
                  name="startdate"
                  label="Start Date"
                  value={values.startdate}
                  onChange={handleStartDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={12} sm={3}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container>
                <KeyboardDatePicker
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="enddate"
                  name="enddate"
                  label="End Date"
                  value={values.enddate}
                  onChange={handleEndDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={12} sm={4}>
            <ColorPicker
              variant="outlined"
              name="color"
              defaultValue="Select Scheduler Color"
              style={{
                backgroundColor: values.schedulercolor,
                borderRadius: "5px",
              }}
              onChange={handleColorChange}
              value={values.schedulercolor}
            />
          </Grid>
          <Grid item xs={12} sm={2}></Grid>
          <Grid item xs={12} sm={6}>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="access"
                name="access"
                value={values.access}
                onChange={handleInputChange}
                row
              >
                <FormControlLabel
                  value="Admin"
                  control={<Radio />}
                  label="Admin"
                />
                <FormControlLabel
                  value="Member"
                  control={<Radio />}
                  label="Member"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Button
          size="large"
          variant="contained"
          color="primary"
          style={{
            width: "20%",
            marginTop: "1%",
            marginLeft: "38%",
            paddingLeft: "0px",
          }}
          onClick={buttonClicked}
        >
          Add Member
        </Button>
      </form>
    </>
  );
}
