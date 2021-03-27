import React, { useEffect } from "react";
import axios from 'axios';
import {
  makeStyles,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  FormControlLabel,
  Switch,
  FormGroup,
  MenuItem,
  FormHelperText,
  FormControl,
  Select,
  Box,
  Button,
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
    sendMessage: false,
    watercraftInvite: false,
    requestApproval: false,
    othersReservationAdmin: false,
    othersReservationMember: false,
    scheduleSomeTime: false,
    eventSuggestion: false,
    eventChange: false,
    eventCancel: false,
    upcomingScheduleReminder: "",
    addedToExpense: false,
  });

  const handleChangeState = (event) => {
    console.log(event.target.name);
    console.log(event.target.checked);
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleChangeScheduleReminder = (event) => {
    setState({ ...state, upcomingScheduleReminder: event.target.value });
  };

  const handleChangeExpansion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect((state) => {

    const url = "http://localhost:8080/usernotificationSetting/"+sessionStorage.getItem("userId");
    axios.get(url)
      .then((resp) => {console.log(resp);
        setState({
          ...state,
          sendMessage: resp.data.sendMessage,
          watercraftInvite: resp.data.watercraftInvite,
          requestApproval: resp.data.requestApproval,
          othersReservationAdmin: resp.data.othersReservationAdmin,
          othersReservationMember: resp.data.othersReservationMember,
          scheduleSomeTime: resp.data.scheduleSomeTime,
          eventSuggestion: resp.data.eventSuggestion,
          eventChange: resp.data.eventChange,
          eventCancel: resp.data.eventCancel,
          upcomingScheduleReminder: resp.data.upcomingScheduleReminder,
          addedToExpense: resp.data.addedToExpense,
        })
  });
}, []);

  const saveChanges = () => {
    const url = "http://localhost:8080/user/nsetting/" + sessionStorage.getItem("userId");
    axios.put( url, { ...state})
      .then((resp) => { console.log(resp.data);
        console.log("Notification setting updated.");
      })
      .catch((error) => {
        console.error("Notification setting update failed.");
      });
  };

  return (
    <div>
      <div className={classes.root}>
        <Typography>
          <Box fontWeight="fontWeightBold" fontSize={20} textAlign="left" m={1}>
            Send me an email when someone:
          </Box>
        </Typography>
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
            <Typography className={classes.heading}>General</Typography>
            <Typography className={classes.secondaryHeading}>
              Change your general notification settings here
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControlLabel
              control={
                <Switch
                  checked={state.sendMessage}
                  onChange={handleChangeState}
                  name="sendMessage"
                  color="primary"
                />
              }
              label="Sends me a message"
            />
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChangeExpansion("panel2")}
        >
          <AccordionSummary
            className={classes.aSummery}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography className={classes.heading}>Watercraft</Typography>
            <Typography className={classes.secondaryHeading}>
              Change your watercraft related notification settings here
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={state.watercraftInvite}
                    onChange={handleChangeState}
                    name="watercraftInvite"
                    color="primary"
                  />
                }
                label="Sends me an invitation to join a watercraft"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={state.requestApproval}
                    onChange={handleChangeState}
                    name="requestApproval"
                    color="primary"
                  />
                }
                label="Approves my request to join a watercraft"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={state.othersReservationAdmin}
                    onChange={handleChangeState}
                    name="othersReservationAdmin"
                    color="primary"
                  />
                }
                label="Makes a reservation on a watercraft I administer"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={state.othersReservationMember}
                    onChange={handleChangeState}
                    name="othersReservationMember"
                    color="primary"
                  />
                }
                label="Makes a reservation on a watercraft I am member of"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={state.scheduleSomeTime}
                    onChange={handleChangeState}
                    name="scheduleSomeTime"
                    color="primary"
                  />
                }
                label="Remind me to schedule some time on my boat"
              />
              <FormControl className={classes.formControl}>
                <Select
                  value={state.upcomingScheduleReminder}
                  onChange={handleChangeScheduleReminder}
                  displayEmpty
                  className={classes.selectEmpty}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"Daily"}>Daily</MenuItem>
                  <MenuItem value={"Weekly"}>Weekly</MenuItem>
                  <MenuItem value={"Monthly"}>Monthly</MenuItem>
                </Select>
                <FormHelperText>
                  Send me my upcoming boating schedule
                </FormHelperText>
              </FormControl>
            </FormGroup>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChangeExpansion("panel3")}
        >
          <AccordionSummary
            className={classes.aSummery}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography className={classes.heading}>Events</Typography>
            <Typography className={classes.secondaryHeading}>
              Change event related notification settings here
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={state.eventSuggestion}
                    onChange={handleChangeState}
                    name="eventSuggestion"
                    color="primary"
                  />
                }
                label="Suggests an event"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={state.eventChange}
                    onChange={handleChangeState}
                    name="eventChange"
                    color="primary"
                  />
                }
                label="Changes the date or time of an event"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={state.eventCancel}
                    onChange={handleChangeState}
                    name="eventCancel"
                    color="primary"
                  />
                }
                label="Cancels an event"
              />
            </FormGroup>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel4"}
          onChange={handleChangeExpansion("panel4")}
        >
          <AccordionSummary
            className={classes.aSummery}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography className={classes.heading}>Expenses</Typography>
            <Typography className={classes.secondaryHeading}>
              Change your expenses related notification settings here
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControlLabel
              control={
                <Switch
                  checked={state.addedToExpense}
                  onChange={handleChangeState}
                  name="addedToExpense"
                  color="primary"
                />
              }
              label="Adds me to an expense"
            />
          </AccordionDetails>
        </Accordion>
        
      </div>
      <div className={classes.buttonStyle}>
        <Button
          variant="contained"
          color="primary"
          size="medium"
          className={classes.button}
          startIcon={<SaveIcon />}
          onClick={saveChanges}>
          Save changes
        </Button>   
      </div>
    </div>
  );
}
