import React from "react";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {Typography, Grid} from '@material-ui/core';
import {
    Checkbox,
    makeStyles,
    TextField
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#90caf9",
    width: "80%",
    marginTop: theme.spacing(0),
    marginLeft: theme.spacing(15),
  },
  container: {
    backgroundColor: "#f5f5f5",
    width: "100%",
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(0),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  buttonStyle: {
    marginLeft: '38%'
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
    fontSize: theme.typography.pxToRem(15),
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
    margin: theme.spacing(2),
  },
  title: {
    fontSize: 14,
  },
}));

export default function SchedulerSetting() {
  const classes = useStyles();
  const hoursArr = [6, 12, 24, 36, 48, 60, 72];
  const [state, setState] = React.useState({
    premiumDays : [],
    sameSetSlots: true,
    continuousReservationDays: 0,
    freeReservationHours: 0,
    confirmEmailHours: 0,
    cancelBookingBeforeStart: 0


  });

  const handleChange = (event) => {
      console.log(event);
      setState({ ...state, [event.target.name]: event.target.value });

  }

  const handleSetSlotChange = (event) => {
    if(event.target.checked) {
        setState({
            ...state,
            sameSetSlots : false})
    }
    else {
        setState({ 
            ...state,
            sameSetSlots : true})
    }
  }

  const handlePremiumCheckboxChange = (event) => {
    if (event.target.checked) {
      if (!state.premiumDays.includes(event.target.value)) {
        setState({ ...state, premiumDays: [ ...state.premiumDays, event.target.value]})
      }
    } else {
      setState({ ...state, premiumDays: state.premiumDays.filter(day => day !== event.target.value)});
    }
  }

  const handleContinousReservationChange = (event) => {
    setState({
        ...state,
        continuousReservationDays : event.target.value
    })
  }
//   useEffect((state) => {
//     fetch("http://localhost:8080/user/3/nsetting", {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//     })
//       .then((resp) => resp.json())
//       .then((data) =>
//         setState({
//           ...state,

//         })
//       );
//   }, []);

//   const saveChanges = () => {
//     return fetch("http://localhost:8080/user/3/nsetting", {
//       method: "PUT",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         ...state,
//       }),
//     })
//       .then((response) => response.json())
//       .then((json) => {
//         console.log("Notification setting updated.");
//       })
//       .catch((error) => {
//         console.error("Notification setting update failed.");
//       });
//   };

  return (
    <div>
        <form>
        <Grid container className={classes.container}>
            <Grid item xs={12}>
        <Card className={classes.root}>
            <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
                Select Premium Day(s):
            </Typography>
            <div>
                <div class="row" style={{display: 'flex', flexDirection: 'row'}}>
                {
                    ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(day => {
                    return (
                        <div>
                            <Checkbox id={day} value={day} onChange={handlePremiumCheckboxChange} />
                            <label class="custom-control-label" for={day}>{day}</label>
                        </div>
                    )
                    })
                }
                </div>
            </div>
            </CardContent>
        </Card>
        </Grid>
        <Grid item xs={12}>
        <div>
            <Checkbox id="oneSetSlots" value={state.sameSetSlots} onChange={handleSetSlotChange} />
            <label class="custom-control-label" for="oneSetSlots">Prevent members from using their entire share percentage on one set of slots.</label>
        </div>
        </Grid>
        <Grid item xs={12}>
        <div>
        <label class="custom-control-label" for='conReservationDays'> Limit Back to Back reservations to </label>
        <TextField variant="outlined" type="number" size="small" helperText={(state.continuousReservationDays < 0) || (state.continuousReservationDays > 100) ? "Min: 0, Max: 100" :''}
        error={(state.continuousReservationDays < 0) || (state.continuousReservationDays > 100)} id='conReservationDays' inputProps={{ min: "0", max: "100", step: "1" }} value={state.continuousReservationDays} onChange={handleContinousReservationChange}/>
        <label class="custom-control-label" for='conReservationDays'> days in a row.</label> 
        </div>
        </Grid>
        <Grid item xs={12}>
        <div>
            <h4>Free Booking Period:</h4>
            <label class="custom-control-label" for='freeReservationTillHours'>Reservations made within</label> 
            <FormControl variant="outlined" className={classes.formControl}>
            <Select
                name = "freeReservationHours"
                id="freeReservationTillHours"
                value={state.freeReservationHours}
                size="small"
                onChange={handleChange}
                label="Age">
            <MenuItem value={0}>
                <em>None</em>
            </MenuItem>
            {
            hoursArr.map(hour => {
                return (
                        <MenuItem key={hour} value={hour}>{hour} hours</MenuItem>
                )
            })
            }
            </Select>
            </FormControl>
            <label class="custom-control-label" for='freeReservationTillHours'>do not count against usage.</label>
        </div>
        </Grid>
        <Grid item xs={12}>
        <div>
            <h4>Confirmation Window:</h4>
            <label class="custom-control-label" for='confiramationEmailHoursBefore'>Send out confirmation email</label> 
            <FormControl variant="outlined" className={classes.formControl}>
            <Select
                name = "confirmEmailHours"
                id="confiramationEmailHoursBefore"
                value={state.confirmEmailHours}
                size="small"
                onChange={handleChange}>
            <MenuItem value={0}>
                <em>None</em>
            </MenuItem>
            {
            hoursArr.map(hour => {
                return (
                        <MenuItem key={hour} value={hour}>{hour} hours</MenuItem>
                )
            })
            }
            {
            [4, 5, 10, 15].map(day => {
                return (
                        <MenuItem key={day*24} value={day*24}>{day} days</MenuItem>
                )
            })
            }
            </Select>
            </FormControl>
            <label class="custom-control-label" for='confiramationEmailHoursBefore'>before reservation</label>
        </div>
        </Grid>
        <Grid item xs={12}>
        <div>
            <h4>Cancellation Period:</h4>
            <label class="custom-control-label" for='freeReservationTillHours'>If user does not confirm reservation,</label> 
            <FormControl variant="outlined" className={classes.formControl}>
            <Select
                name = "cancelBookingBeforeStart"
                id="cancelBeforeBookingStart"
                value={state.cancelBookingBeforeStart}
                size="small"
                onChange={handleChange}
                label="Hours">
            <MenuItem value={0}>
                <em>Do not cancel it.</em>
            </MenuItem>
            {
            hoursArr.map(hour => {
                return (
                        <MenuItem key={hour} value={hour}>Cancel it {hour} hours</MenuItem>
                )
            })
            }
            </Select>
            </FormControl>
            <label class="custom-control-label" for='freeReservationTillHours'>before it starts.</label>
        </div>
        </Grid>
        </Grid>
        </form>
        <button >Save settings</button>
    </div>
  );
}
