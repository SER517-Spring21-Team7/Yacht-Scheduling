import React, { useContext, useEffect, useState } from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";
import {Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {
  Grid,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Checkbox
} from "@material-ui/core";
import axios from "axios";
import GlobalContext from "../GlobalContext";

const initialValues = {
  
  startdate: null,
  fromslot: "",
  enddate: null,
  toslot:"",
  membername:"",
  checkedConcierge: false,
  checkedCrew: false,

  watercraftid: '',
  userid:'',
  bookingdate: null,
  notFromUserQuota: false,
  forMaintenence: false,
};

const emptyEventList = []

function WatercraftSchedulerUI() {

  const [open, setOpen] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [eventList, setEventList] = useState(emptyEventList);
  const globalWatercraftId = useContext(GlobalContext);

  const url = "http://localhost:8080/getschedule/103"
  var response;
  const getReservations = async () => { 
    axios.get(url).then((res) => {
      response = res.data;
      for (let i = 0; i < response.length; i++) {
        setEventsCalendar(response[i].reservation)
      }
    })
}

const setEventsCalendar = (events) => {
  console.log(events)
  var customEvents = []
  for (let i = 0; i < events.length; i++) {
    var event = {}
    event.start = events[i].forDate
    event.end = events[i].forDate
    event.allDay = true
    event.title = String(events[i].startHour) + ' - ' + String(events[i].endHour)
    customEvents.push(event)
  }
  var joinedEvents = eventList.concat(customEvents);
  setEventList(joinedEvents)
}

  useEffect(() => { 
    getReservations();
  },[])


  const handleDateClick = (arg) => {
    handleDialogOpen();
  }

  const handleDialogOpen = () => {
    setOpen(true);
  };
  const handleDialogClose = () => {
    setOpen(false);
    confirmReservation();
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleCheckboxCrew = (e) =>{
    if (e.target.checked) {
      setValues({ ...values, [e.target.name]: true });
    } else {
      setValues({ ...values, [e.target.name]: false });
    }
  }
  const handleCheckboxConcierge = (e) =>{
    if (e.target.checked) {
      setValues({ ...values, [e.target.name]: true });
    } else {
      setValues({ ...values, [e.target.name]: false });
    }
  }

  const confirmReservation = () => {
    console.log(values)
  }

    return (
        <div>
            <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            dateClick={handleDateClick}
            initialView="dayGridMonth"
            weekends={true}
            events={eventList}
            eventColor={'lightgreen'}
            />
            <Dialog open={open} onClose={handleDialogClose} aria-labelledby="form-dialog-title" fullWidth maxWidth="sm">
              <DialogTitle id="form-dialog-title">Make Reservation</DialogTitle>
              <DialogContent>
                <Grid container>

                  <Grid item sm={6}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                            <KeyboardDatePicker
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="startdate"
                            name="startdate"
                            label="From"
                            value={values.startdate}
                            onChange={handleStartDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        </Grid>
                    </MuiPickersUtilsProvider>
                  </Grid>

                  <Grid item sm={6} fullWidth>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel>Select Slot</InputLabel>
                      <Select
                        label="fromslot"
                        name="fromslot"
                        value={values.fromslot}
                        onChange={handleInputChange}
                      >
                        <MenuItem value="Slot 1">Slot 1</MenuItem>
                        <MenuItem value="Slot 2">Slot 2</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item sm={6}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                            <KeyboardDatePicker
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="enddate"
                            name="enddate"
                            label="To"
                            value={values.enddate}
                            onChange={handleEndDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        </Grid>
                    </MuiPickersUtilsProvider>
                  </Grid>

                  <Grid item sm={6} fullWidth>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel>Select Slot</InputLabel>
                      <Select
                        label="toslot"
                        name="toslot"
                        value={values.toslot}
                        onChange={handleInputChange}
                      >
                        <MenuItem value="Slot 1">Slot 1</MenuItem>
                        <MenuItem value="Slot 2">Slot 2</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item sm={6} fullWidth>
                    {/* spacing only */}
                  </Grid>

                  <Grid item sm={6} fullWidth>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel>Member</InputLabel>
                      <Select
                        label="Booking For"
                        name="membername"
                        value={values.membername}
                        onChange={handleInputChange}
                      >
                        <MenuItem value="Abhinaw">Abhinaw Sarang</MenuItem>
                        <MenuItem value="Saksham">Saksham Jhawar</MenuItem>
                        <MenuItem value="Sagar">Sagar Khar</MenuItem>
                        <MenuItem value="Smit">Smit Shah</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item sm={12} fullWidth>
                    <FormControlLabel
                    control={<Checkbox onChange={handleCheckboxConcierge} name="checkedConcierge" checked={values.checkedConcierge}/>}
                    label="Concierge Services"
                    />
                  </Grid>
                  
                  <Grid item sm={12} fullWidth>
                    <FormControlLabel
                    control={<Checkbox onChange={handleCheckboxCrew} name="checkedCrew" checked={values.checkedCrew} />}
                    label="Select to Request Crew"
                    />
                  </Grid>
              </Grid>
              </DialogContent>

              <DialogActions>
                <Button onClick={handleDialogClose} color="secondary">
                  Cancel
                </Button>
                <Button onClick={handleDialogClose} color="primary">
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
        </div>
    )
}

export default WatercraftSchedulerUI
