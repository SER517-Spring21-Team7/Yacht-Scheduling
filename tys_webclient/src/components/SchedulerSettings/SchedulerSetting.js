import React, { useEffect } from "react";
import {
    Checkbox,
    FormGroup,
    Input,
  makeStyles,
  TextField
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#90caf9",
    width: "80%",
    marginTop: theme.spacing(0),
    marginLeft: theme.spacing(15),
    
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
}));

export default function NotificationSetting() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [state, setState] = React.useState({
    premiumDays : [],
    sameSetSlots: true,
    continuousReservationDays: 0,


  });
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

  const continuousDaysValid = () => {
      console.log("Validation done!!");
    if(state.continuousReservationDays > 100 || state.continuousReservationDays < 0) {
        return false;
    }
    return true;
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
        <div>
            <h5>Select Premium Day(s):</h5>
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
        <div>
            <Checkbox id="oneSetSlots" value={state.sameSetSlots} onChange={handleSetSlotChange} />
            <label class="custom-control-label" for="oneSetSlots">Prevent members from using their entire share percentage on one set of slots.</label>
        </div>
        <div>
        <label class="custom-control-label" for='conReservationDays'> Limit Back to Back reservations to </label>
        <TextField variant="outlined" type="number" size="small" helperText={(state.continuousReservationDays < 0) || (state.continuousReservationDays > 100) ? "Min: 0, Max: 100" :''}
        error={(state.continuousReservationDays < 0) || (state.continuousReservationDays > 100)} id='conReservationDays' inputProps={{ min: "0", max: "100", step: "1" }} value={state.continuousReservationDays} onChange={handleContinousReservationChange}/>
        <label class="custom-control-label" for='conReservationDays'> days in a row.</label> 
        </div>
        </form>
        <button >Save settings</button>
    </div>
  );
}
