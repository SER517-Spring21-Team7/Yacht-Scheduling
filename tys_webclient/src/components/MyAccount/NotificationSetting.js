import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#90caf9",
    width: "80%",
    marginTop: theme.spacing(0),
    marginLeft: theme.spacing(15),
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
}));

export default function NotificationSetting() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const [state, setState] = React.useState({
    sendMessage: false,
    watercraftInvite: false,
    requestApproval: false,
    OthersReservationAdmin: false,
    OthersReservationMember: false,
    scheduleSomeTime: false,
    eventSuggestion: false,
    eventChange: false,
    eventCancel: false,
    upcomingScheduleReminder: "",
    addedToExpense: false,
  });

  const handleChangeState = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleChangeExpansion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
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
                  checked={state.OthersReservationAdmin}
                  onChange={handleChangeState}
                  name="OthersReservationAdmin"
                  color="primary"
                />
              }
              label="Makes a reservation on a watercraft I administer"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={state.OthersReservationMember}
                  onChange={handleChangeState}
                  name="OthersReservationMember"
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
                onChange={handleChangeState}
                displayEmpty
                className={classes.selectEmpty}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>Daily</MenuItem>
                <MenuItem value={7}>Weekly</MenuItem>
                <MenuItem value={30}>Monthly</MenuItem>
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
  );
}
