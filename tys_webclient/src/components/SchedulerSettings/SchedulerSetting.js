import React, { useContext, useEffect, useRef } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Typography, Grid } from "@material-ui/core";
import TimeSlots from "./TimeSlots";
import { useHistory } from "react-router-dom";

import {
  Checkbox,
  makeStyles,
  TextField,
  Button,
  Box,
  ButtonGroup,
  FormControlLabel,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import HolidayCalendar from "./HolidayCalendar";
import GlobalContext from "../GlobalContext";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "60%",
      margin: theme.spacing(1),
    },
  },
  container: {
    padding: theme.spacing(1),
    marginTop: "1%",
    border: "4px solid #4db6ac",
    borderRadius: "5px",
  },

  innerContainer: {
    marginLeft: "15%",
  },

  buttonStyle: {
    marginLeft: "38%",
  },

  aSummery: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },

  heading: {
    fontSize: theme.typography.pxToRem(20),
    flexBasis: "33.33%",
    flexShrink: 0,
    color: "#00227b",
    fontWeight: "bold",
  },

  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: "#00227b",
    paddingLeft: "5%",
  },

  // secTypo: {
  //   marginLeft: "5%",
  //   marginTop: "5%",
  //   padding: "10px",
  // },
}));

const InitialHCalendar = [];

export default function SchedulerSetting() {
  const classes = useStyles();
  const history = useHistory();
  const childRef = useRef();
  const globalWatercraftId = useContext(GlobalContext);
  var universalWatercraftId = sessionStorage.getItem("globalWatercraftId");

  const [expanded, setExpanded] = React.useState(false);
  const [listOfHCalendar, setListOfHCalendar] = React.useState(
    InitialHCalendar
  );
  const hoursArr = [6, 12, 24, 36, 48, 60, 72];
  const timezoneArr = [
    "Australia/ACT",
    "Australia/Adelaide",
    "Australia/Brisbane",
    "Australia/Broken_Hill",
    "Australia/Canberra",
    "Australia/Currie",
    "Australia/Darwin",
    "Australia/Eucla",
    "Australia/Hobart",
    "Australia/LHI",
    "Australia/Lindeman",
    "Australia/Lord_Howe",
    "Australia/Melbourne",
    "Australia/NSW",
    "Australia/North",
    "Australia/Perth",
    "Australia/Queensland",
    "Australia/South",
    "Australia/Sydney",
    "Australia/Tasmania",
    "Australia/Victoria",
    "Australia/West",
    "Australia/Yancowinna",
    "Canada/Atlantic",
    "Canada/Central",
    "Canada/Eastern",
    "Canada/Mountain",
    "Canada/Newfoundland",
    "Canada/Pacific",
    "Canada/Saskatchewan",
    "Canada/Yukon",
    "Etc/UTC",
    "Europe/London",
    "US/Alaska",
    "US/Aleutian",
    "US/Arizona",
    "US/Central",
    "US/East-Indiana",
    "US/Eastern",
    "US/Hawaii",
    "US/Indiana-Starke",
    "US/Michigan",
    "US/Mountain",
    "US/Pacific",
    "US/Pacific-New",
  ];

  const [state, setState] = React.useState({
    premiumDays: [],
    customSlots: [],
    preventSameSetSlots: false,
    continuousReservationDays: 0,
    freeReservationHours: 0,
    confirmEmailHours: 0,
    cancelBookingBeforeStart: 0,
    weatherCountry: "",
    weatherCity: "",
    weatherZipCode: "",
    holidayCalendar: "",
    maxHolidayDays: 0,
    watercraftTimeZone: "",
    advanceBookingMonth: 0,
    carryBorrow: false,
  });

  const handleChangeExpansion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSetSlotChange = (event) => {
    if (event.target.checked) {
      setState({
        ...state,
        preventSameSetSlots: true,
      });
    } else {
      setState({
        ...state,
        preventSameSetSlots: false,
      });
    }
  };

  const handleCarryBorrowChange = (event) => {
    if (event.target.checked) {
      setState({
        ...state,
        carryBorrow: true,
      });
    } else {
      setState({
        ...state,
        carryBorrow: false,
      });
    }
  };

  const handlePremiumCheckboxChange = (event) => {
    if (event.target.checked) {
      if (!state.premiumDays.includes(event.target.value)) {
        setState({
          ...state,
          premiumDays: [...state.premiumDays, event.target.value],
        });
      }
    } else {
      setState({
        ...state,
        premiumDays: state.premiumDays.filter(
          (day) => day !== event.target.value
        ),
      });
    }
  };

  const handleTimeSlots = (timeSlots) => {
    setState({
      ...state,
      customSlots: timeSlots,
    });
  };

  const handleContinousReservationChange = (event) => {
    setState({
      ...state,
      continuousReservationDays: event.target.value,
    });
  };

  const handleHolidayCalendarChange = (event) => {
    setState({
      ...state,
      holidayCalendar: event.target.value,
    });
  };

  const handleCreateRedirect = () => {
    history.push("/holidaycalendar/" + "create");
  };

  const handleEditRedirect = () => {
    const calendarId = listOfHCalendar.filter(
      (each) => each.name == state.holidayCalendar
    )[0].id;
    history.push("/holidaycalendar/" + calendarId);
  };

  useEffect((state) => {
    fetch(
      "http://ec2-18-237-18-199.us-west-2.compute.amazonaws.com:8080/holidaycalendar",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setListOfHCalendar(data);
      })
      .then(() => {
        if (universalWatercraftId) {
          fetch(
            "http://ec2-18-237-18-199.us-west-2.compute.amazonaws.com:8080/watercraft/" +
              universalWatercraftId +
              "/ssetting",
            {
              method: "GET",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          )
            .then((resp) => resp.json())
            .then((data) => {
              console.log(data);
              setState({
                ...state,
                premiumDays: data.premiumDays,
                customSlots: data.timeSlot,
                preventSameSetSlots: data.blockAllOneSlotBooking,
                continuousReservationDays: data.maxContinuousBookingDays,
                freeReservationHours: data.freeBookingAfterHours,
                confirmEmailHours: data.confirmationBeforeHours,
                cancelBookingBeforeStart: data.noResponseCancelAtHours,
                weatherCountry: data.weatherCountry,
                weatherCity: data.weatherCity,
                weatherZipCode: data.weatherZipCode,
                holidayCalendar: data.holidayCalName,
                maxHolidayDays: data.maxHolidayBookingDays,
                watercraftTimeZone: data.timeZone,
                advanceBookingMonth: data.limitAdvBookingMonths,
                carryBorrow: data.allowCarryBorrow,
              });
              childRef.current.updateSlotState(data.timeSlot);
            });
        } else {
          alert("Please select watercraft from the search box");
        }
      });
  }, []);

  const saveChanges = () => {
    return fetch(
      "http://ec2-18-237-18-199.us-west-2.compute.amazonaws.com:8080/watercraft/" +
        universalWatercraftId +
        "/ssetting",
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          premiumDays: state.premiumDays,
          timeSlot: state.customSlots,
          blockAllOneSlotBooking: state.preventSameSetSlots,
          maxContinuousBookingDays: state.continuousReservationDays,
          freeBookingAfterHours: state.freeReservationHours,
          confirmationBeforeHours: state.confirmEmailHours,
          noResponseCancelAtHours: state.cancelBookingBeforeStart,
          weatherCountry: state.weatherCountry,
          weatherCity: state.weatherCity,
          weatherZipCode: state.weatherZipCode,
          holidayCalName: state.holidayCalendar,
          maxHolidayBookingDays: state.maxHolidayDays,
          timeZone: state.watercraftTimeZone,
          limitAdvBookingMonths: state.advanceBookingMonth,
          allowCarryBorrow: state.carryBorrow,
        }),
      }
    )
      .then((response) => response.json())
      .then((json) => {
        console.log("Notification setting updated.");
      })
      .catch((error) => {
        console.error("Notification setting update failed.");
      });
  };

  return (
    <div>
      <Typography>
        <Box fontSize={20} textAlign="center" marginBottom="1%">
          Scheduler Settings
        </Box>
      </Typography>
      <Accordion
        expanded={expanded === "panel0"}
        onChange={handleChangeExpansion("panel0")}
      >
        <AccordionSummary
          className={classes.aSummery}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>Basic Settings</Typography>
          <Typography className={classes.secondaryHeading}>
            Change basic settings for watercraft here
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form>
            <Grid container className={classes.container}>
              <Grid item xs={12} sm={12} align="center">
                <Typography className=".MuiTypography-overline" gutterBottom>
                  <b>Select Premium Day(s):</b>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} align="center">
                {[
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ].map((day) => {
                  return (
                    <FormControlLabel
                      control={
                        <Checkbox
                          id={day}
                          value={day}
                          checked={state.premiumDays.includes(day)}
                          onChange={handlePremiumCheckboxChange}
                          name="carryBorrow"
                          color="primary"
                        />
                      }
                      label={day}
                    />
                  );
                })}
              </Grid>

              <Grid item xs={12} sm={12} align="center">
                <br />
                <Typography className=".MuiTypography-overline" gutterBottom>
                  <b>Booking Slot Timings:</b>
                </Typography>
                <TimeSlots
                  ref={childRef}
                  customSlots={state.customSlots}
                  handleTimeSlots={handleTimeSlots}
                />
              </Grid>
              <Grid item xs={12} sm={12} className={classes.innerContainer}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.preventSameSetSlots}
                      onChange={handleSetSlotChange}
                      name="preventSameSetSlots"
                      color="primary"
                    />
                  }
                  label="Prevent members from using their entire share percentage on
                  one set of slots."
                />
              </Grid>
              <Grid item xs={12} sm={12} className={classes.innerContainer}>
                <br />
                <div>
                  <label class="custom-control-label" for="conReservationDays">
                    Limit Back to Back reservations to &nbsp;
                  </label>
                  <TextField
                    variant="outlined"
                    type="number"
                    size="small"
                    helperText={
                      state.continuousReservationDays < 0 ||
                      state.continuousReservationDays > 100
                        ? "Min: 0, Max: 100"
                        : ""
                    }
                    error={
                      state.continuousReservationDays < 0 ||
                      state.continuousReservationDays > 100
                    }
                    id="conReservationDays"
                    inputProps={{ min: "0", max: "100", step: "1" }}
                    value={state.continuousReservationDays}
                    onChange={handleContinousReservationChange}
                  />
                  <label class="custom-control-label" for="conReservationDays">
                    &nbsp; days in a row.
                  </label>
                </div>
              </Grid>
              <Grid item xs={12} sm={12} className={classes.innerContainer}>
                <br />
                <div>
                  {/* <Typography
                    className=".MuiTypography-overline"
                    color="textSecondary"
                    gutterBottom
                  >
                    Free Booking Period:
                  </Typography> */}
                  <label
                    class="custom-control-label"
                    for="freeReservationTillHours"
                  >
                    Reservations made within &nbsp;
                  </label>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <Select
                      name="freeReservationHours"
                      id="freeReservationTillHours"
                      value={state.freeReservationHours}
                      size="small"
                      onChange={handleChange}
                    >
                      <MenuItem value={0}>
                        <em>None</em>
                      </MenuItem>
                      {hoursArr.map((hour) => {
                        return (
                          <MenuItem key={hour} value={hour}>
                            {hour} hours
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <label
                    class="custom-control-label"
                    for="freeReservationTillHours"
                  >
                    &nbsp; do not count against usage.
                  </label>
                </div>
              </Grid>
              <Grid item xs={12} sm={12} className={classes.innerContainer}>
                <br />
                <div>
                  {/* <Typography
                    className=".MuiTypography-overline"
                    color="textSecondary"
                    gutterBottom
                  >
                    Confirmation Window:
                  </Typography> */}
                  <label
                    class="custom-control-label"
                    for="confiramationEmailHoursBefore"
                  >
                    Send out confirmation email &nbsp;
                  </label>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <Select
                      name="confirmEmailHours"
                      id="confiramationEmailHoursBefore"
                      value={state.confirmEmailHours}
                      size="small"
                      onChange={handleChange}
                    >
                      <MenuItem value={0}>
                        <em>None</em>
                      </MenuItem>
                      {hoursArr.map((hour) => {
                        return (
                          <MenuItem key={hour} value={hour}>
                            {hour} hours
                          </MenuItem>
                        );
                      })}
                      {[4, 5, 10, 15].map((day) => {
                        return (
                          <MenuItem key={day * 24} value={day * 24}>
                            {day} days
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <label
                    class="custom-control-label"
                    for="confiramationEmailHoursBefore"
                  >
                    &nbsp; before reservation
                  </label>
                </div>
              </Grid>
              <Grid item xs={12} sm={12} className={classes.innerContainer}>
                <br />
                <div>
                  {/* <Typography
                    className=".MuiTypography-overline"
                    color="textSecondary"
                    gutterBottom
                  >
                    Cancellation Period:
                  </Typography> */}
                  <label
                    class="custom-control-label"
                    for="freeReservationTillHours"
                  >
                    If user does not confirm reservation, &nbsp;
                  </label>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <Select
                      name="cancelBookingBeforeStart"
                      id="cancelBeforeBookingStart"
                      value={state.cancelBookingBeforeStart}
                      size="small"
                      onChange={handleChange}
                    >
                      <MenuItem value={0}>
                        <em>Do not cancel it.</em>
                      </MenuItem>
                      {hoursArr.map((hour) => {
                        return (
                          <MenuItem key={hour} value={hour}>
                            Cancel it {hour} hours
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <label
                    class="custom-control-label"
                    for="freeReservationTillHours"
                  >
                    {" "}
                    &nbsp; before it starts.
                  </label>
                </div>
              </Grid>
            </Grid>
          </form>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChangeExpansion("panel1")}
      >
        <AccordionSummary
          className={classes.aSummery}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>Advance Settings</Typography>
          <Typography className={classes.secondaryHeading}>
            Change advanced settings for watercraft here
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form className={classes.root}>
            <Grid container className={classes.container}>
              <Grid item xs={12} sm={3} align="center">
                <Typography
                  className={classes.secTypo}
                  color="textSecondary"
                  gutterBottom
                  style={{ paddingTop: "3vh" }}
                >
                  Show weather for:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} align="center">
                <FormControl variant="outlined" required>
                  <InputLabel>Country</InputLabel>
                  <Select
                    label="Country"
                    name="weatherCountry"
                    value={state.weatherCountry}
                    onChange={handleChange}
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value={"Australia"}>Australia</MenuItem>
                    <MenuItem value={"Canada"}>Canada</MenuItem>
                    <MenuItem value={"United Kingdom"}>United Kingdom</MenuItem>
                    <MenuItem value={"United States"}>United States</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}></Grid>
              <Grid item xs={12} sm={1}></Grid>
              <Grid item xs={12} sm={4} align="center">
                <TextField
                  variant="outlined"
                  label="City"
                  name="weatherCity"
                  value={state.weatherCity}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={1} align="center">
                <Typography
                  color="textSecondary"
                  className={classes.secTypo}
                  gutterBottom
                  style={{ paddingTop: "3vh" }}
                >
                  Or
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4} align="center">
                <TextField
                  variant="outlined"
                  label="Zip/Postal Code"
                  name="weatherZipCode"
                  value={state.weatherZipCode}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={3} align="center">
                <Typography
                  className={classes.secTypo}
                  color="textSecondary"
                  gutterBottom
                  style={{ paddingTop: "3vh" }}
                >
                  Select Holiday Calendar:
                </Typography>
              </Grid>
              <Grid item sm={6} xs={12} align="center">
                <FormControl variant="outlined" required>
                  <InputLabel>Holiday Calendar</InputLabel>
                  <Select
                    label="Holiday Calendar"
                    name="holidayCalendar"
                    value={state.holidayCalendar}
                    onChange={handleHolidayCalendarChange}
                  >
                    <MenuItem value="">None</MenuItem>
                    {listOfHCalendar.map((eachCalendar) => {
                      return (
                        <MenuItem
                          key={eachCalendar.id}
                          value={eachCalendar.name}
                        >
                          {eachCalendar.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item>
                <ButtonGroup
                  color="primary"
                  aria-label="outlined primary button group"
                  style={{ marginTop: "10%", marginLeft: "0%" }}
                >
                  <Button onClick={() => handleEditRedirect()}>Edit</Button>
                  <Button onClick={() => handleCreateRedirect()}>Create</Button>
                </ButtonGroup>
              </Grid>

              <Grid item sm={3} xs={12} align="center">
                <Typography
                  className={classes.secTypo}
                  color="textSecondary"
                  gutterBottom
                  style={{ paddingTop: "3vh" }}
                >
                  Max Holiday Reservation:
                </Typography>
              </Grid>

              <Grid item sm={6} xs={12} align="center">
                <TextField
                  variant="outlined"
                  label="Days Per Year"
                  name="maxHolidayDays"
                  value={state.maxHolidayDays}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item sm={3} xs={12}></Grid>
              <Grid item sm={3} xs={12} align="center">
                <Typography
                  className={classes.secTypo}
                  color="textSecondary"
                  gutterBottom
                  style={{ paddingTop: "3vh" }}
                >
                  Select Watercraft Time Zone:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} align="center">
                <FormControl variant="outlined" required>
                  <InputLabel>Watercraft Time Zone</InputLabel>
                  <Select
                    label="Watercraft Time Zone"
                    name="watercraftTimeZone"
                    value={state.watercraftTimeZone}
                    onChange={handleChange}
                  >
                    <MenuItem value="">None</MenuItem>
                    {timezoneArr.map((tz) => {
                      return (
                        <MenuItem key={tz} value={tz}>
                          {tz}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={3} xs={12}></Grid>
              <Grid item sm={3} xs={12} align="center">
                <Typography
                  className={classes.secTypo}
                  color="textSecondary"
                  gutterBottom
                  style={{ paddingTop: "3vh" }}
                >
                  Allow advance reservation upto:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} align="center">
                <FormControl variant="outlined" required>
                  <InputLabel>Month(s)</InputLabel>
                  <Select
                    label="Month(s)"
                    name="advanceBookingMonth"
                    value={state.advanceBookingMonth}
                    onChange={handleChange}
                  >
                    <MenuItem value="No Limit">No Limit</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={8}>8</MenuItem>
                    <MenuItem value={9}>9</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={11}>11</MenuItem>
                    <MenuItem value={12}>12</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} align="center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.carryBorrow}
                      onChange={handleCarryBorrowChange}
                      name="carryBorrow"
                      color="primary"
                    />
                  }
                  label="Allow carrying slots from the previous month and borrow slots from the next month."
                />
              </Grid>
            </Grid>
          </form>
        </AccordionDetails>
      </Accordion>

      <div className={classes.buttonStyle}>
        <Button
          variant="contained"
          color="primary"
          size="medium"
          startIcon={<SaveIcon />}
          onClick={saveChanges}
          style={{ marginTop: "1%" }}
        >
          Save settings
        </Button>
      </div>
    </div>
  );
}
