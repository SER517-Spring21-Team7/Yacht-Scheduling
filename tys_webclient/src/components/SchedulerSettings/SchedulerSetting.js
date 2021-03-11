import React, { useContext, useEffect } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Typography, Grid, AppBar, Paper } from "@material-ui/core";
import TimeSlots from "./TimeSlots";
import { useHistory } from "react-router-dom";

import {
  Container,
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
    backgroundColor: "#90caf9",
    width: "80%",
    marginTop: theme.spacing(0),
    marginLeft: theme.spacing(0),
    padding: "10px",

    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(0.75),
    },
    flexGrow: 1,
  },
  container: {
    backgroundColor: "#f5f5f5",
    width: "100%",
    marginTop: theme.spacing(0),
    marginLeft: theme.spacing(0),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
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
  },
  button: {
    margin: theme.spacing(1),
  },
  secTypo: {
    marginLeft: "5%",
    marginTop: "5%",
    padding: "10px",
  },
}));

export default function SchedulerSetting() {
  const classes = useStyles();
  const history = useHistory();
  const globalWatercraftId = useContext(GlobalContext);
  const [expanded, setExpanded] = React.useState(false);
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
    sameSetSlots: true,
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
    console.log(event);
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSetSlotChange = (event) => {
    if (event.target.checked) {
      setState({
        ...state,
        sameSetSlots: false,
      });
    } else {
      setState({
        ...state,
        sameSetSlots: true,
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

  const handleContinousReservationChange = (event) => {
    setState({
      ...state,
      continuousReservationDays: event.target.value,
    });
  };

  const handleRedirect = () => {
    history.push("/holidaycalendar");
  };

  useEffect((state) => {
    console.log("Inside SS use effect" + globalWatercraftId);
    fetch(
      "http://localhost:8080/watercraft/" + globalWatercraftId + "/ssetting",
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
          sameSetSlots: data.blockAllOneSlotBooking,
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
      });
  }, []);

  const saveChanges = () => {
    return fetch(
      "http://localhost:8080/watercraft/" + globalWatercraftId + "/ssetting",
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          premiumDays: state.premiumDays,
          timeSlot: state.customSlots,
          blockAllOneSlotBooking: state.sameSetSlots,
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
      <Container>
        <Typography
          color="textPrimary"
          gutterBottom
          variant="h3"
          align="center"
        >
          Scheduler Settings
          {globalWatercraftId}
        </Typography>
      </Container>
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
              <Grid item md={6} xs={12}>
                <Typography
                  className=".MuiTypography-overline"
                  color="textPrimary"
                  gutterBottom
                >
                  Select Premium Day(s):
                </Typography>
                <div>
                  <div
                    class="row"
                    style={{ display: "flex", flexDirection: "row" }}
                  >
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
                        <div>
                          <Checkbox
                            id={day}
                            value={day}
                            onChange={handlePremiumCheckboxChange}
                          />
                          <label class="custom-control-label" for={day}>
                            {day}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Grid>

              <Grid item xs={12}>
                <br />
                <Typography
                  className=".MuiTypography-overline"
                  color="textPrimary"
                  gutterBottom
                >
                  Booking Slot Timings:
                </Typography>
                <TimeSlots customSlots={state.customSlots} />
              </Grid>
              <Grid item xs={12}>
                <br />
                <div>
                  <Checkbox
                    id="oneSetSlots"
                    value={state.sameSetSlots}
                    onChange={handleSetSlotChange}
                  />
                  <label class="custom-control-label" for="oneSetSlots">
                    Prevent members from using their entire share percentage on
                    one set of slots.
                  </label>
                </div>
              </Grid>
              <Grid item xs={12}>
                <br />
                <div>
                  <label class="custom-control-label" for="conReservationDays">
                    {" "}
                    Limit Back to Back reservations to{" "}
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
                    {" "}
                    days in a row.
                  </label>
                </div>
              </Grid>
              <Grid item md={6} xs={12}>
                <br />
                <div>
                  <Typography
                    className=".MuiTypography-overline"
                    color="textSecondary"
                    gutterBottom
                  >
                    Free Booking Period:
                  </Typography>
                  <label
                    class="custom-control-label"
                    for="freeReservationTillHours"
                  >
                    Reservations made within
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
                      label="Age"
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
                    do not count against usage.
                  </label>
                </div>
              </Grid>
              <Grid item xs={12}>
                <br />
                <div>
                  <Typography
                    className=".MuiTypography-overline"
                    color="textSecondary"
                    gutterBottom
                  >
                    Confirmation Window:
                  </Typography>
                  <label
                    class="custom-control-label"
                    for="confiramationEmailHoursBefore"
                  >
                    Send out confirmation email
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
                    before reservation
                  </label>
                </div>
              </Grid>
              <Grid item xs={12}>
                <br />
                <div>
                  <Typography
                    className=".MuiTypography-overline"
                    color="textSecondary"
                    gutterBottom
                  >
                    Cancellation Period:
                  </Typography>
                  <label
                    class="custom-control-label"
                    for="freeReservationTillHours"
                  >
                    If user does not confirm reservation,
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
                      label="Hours"
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
                    before it starts.
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
            Change advance settings for watercraft here
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form className={classes.root}>
            <Grid container className={classes.container}>
              <Grid item md={3}>
                <Typography
                  className={classes.secTypo}
                  color="textSecondary"
                  gutterBottom
                >
                  Show weather for:
                </Typography>
              </Grid>
              <Grid item md={6} xs={12}>
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
              <Grid item md={3}></Grid>
              <Grid item md={1}></Grid>
              <Grid item md={4} xs={12}>
                <TextField
                  variant="outlined"
                  label="City"
                  name="weatherCity"
                  value={state.weatherCity}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item md={1}>
                <Typography
                  color="textSecondary"
                  className={classes.secTypo}
                  gutterBottom
                >
                  Or
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  variant="outlined"
                  label="Zip/Postal Code"
                  name="weatherZipCode"
                  value={state.weatherZipCode}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item md={3}>
                <Typography
                  className={classes.secTypo}
                  color="textSecondary"
                  gutterBottom
                >
                  Select Holiday Calendar:
                </Typography>
              </Grid>
              <Grid item md={6} xs={12}>
                <FormControl variant="outlined" required>
                  <InputLabel>Holiday Calendar</InputLabel>
                  <Select
                    label="Holiday Calendar"
                    name="holidayCalendar"
                    value={state.holidayCalendar}
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
              <Grid>
                <ButtonGroup
                  color="primary"
                  aria-label="outlined primary button group"
                  style={{ marginTop: "10%", marginLeft: "0%" }}
                >
                  <Button>Edit</Button>
                  <Button onClick={() => handleRedirect()}>Create</Button>
                </ButtonGroup>
              </Grid>
              <Grid item md={3}>
                <Typography
                  className={classes.secTypo}
                  color="textSecondary"
                  gutterBottom
                >
                  Max Holiday Reservation:
                </Typography>
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  variant="outlined"
                  label="Days Per Year"
                  name="maxHolidayDays"
                  value={state.maxHolidayDays}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item md={3}></Grid>
              <Grid item md={3}>
                <Typography
                  className={classes.secTypo}
                  color="textSecondary"
                  gutterBottom
                >
                  Select Watercraft Time Zone:
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
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
              <Grid item md={3}></Grid>
              <Grid item md={3}>
                <Typography
                  className={classes.secTypo}
                  color="textSecondary"
                  gutterBottom
                >
                  Allow advance reservation upto:
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
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
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.carryBorrow}
                      onChange={handleChange}
                      name="carryBorrow"
                      color="primary"
                    />
                  }
                  label="Allow carrying slots from the previous month and borrow slots from the next month."
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.ignoreSharePercent}
                      onChange={handleChange}
                      name="ignoreSharePercent"
                      color="primary"
                    />
                  }
                  label="Ignore share percentages - Allow users to book at will."
                />
              </Grid>
              <Grid item md={1} xs={12}>
                <Typography
                  className={classes.secTypo}
                  color="textSecondary"
                  gutterBottom
                >
                  Limit:
                </Typography>
              </Grid>
              <Grid item md={2} xs={12}>
                <TextField
                  variant="outlined"
                  label="reservations"
                  name="reservationLimit"
                  value={state.reservationLimit}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item md={1} xs={12}>
                <Typography
                  className={classes.secTypo}
                  color="textSecondary"
                  gutterBottom
                >
                  Every:
                </Typography>
              </Grid>
              <Grid item md={2} xs={12}>
                <TextField
                  variant="outlined"
                  name="reservationLimitPer"
                  value={state.reservationLimitPer}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item md={2} xs={12}>
                <FormControl variant="outlined" required>
                  <Select
                    name="reservationLimitUnit"
                    value={state.reservationLimitUnit}
                    onChange={handleChange}
                    defaultValue={"Month"}
                  >
                    <MenuItem value={"Month"}>Month(s)</MenuItem>
                    <MenuItem value={"Week"}>Week(s)</MenuItem>
                    <MenuItem value={"Day"}>Day(s)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={1} xs={12}>
                <Typography
                  className={classes.secTypo}
                  color="textSecondary"
                  gutterBottom
                >
                  Including:
                </Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl variant="outlined" required>
                  <Select
                    name="reservationLimitInclude"
                    value={state.reservationLimitInclude}
                    onChange={handleChange}
                    defaultValue={"Past"}
                  >
                    <MenuItem value={"Past"}>Past Reservations</MenuItem>
                    <MenuItem value={"Future"}>Future Reservations</MenuItem>
                    <MenuItem value={"Both"}>
                      Past & Future Reservations
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid> */}
            </Grid>
          </form>
        </AccordionDetails>
      </Accordion>

      <div className={classes.buttonStyle}>
        <Button
          variant="contained"
          color="primary"
          size="medium"
          className={classes.button}
          startIcon={<SaveIcon />}
          onClick={saveChanges}
        >
          Save settings
        </Button>
      </div>
    </div>
  );
}
