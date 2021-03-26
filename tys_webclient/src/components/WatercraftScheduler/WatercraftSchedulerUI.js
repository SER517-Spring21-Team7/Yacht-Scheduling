import React, { useContext, useEffect, useState } from "react";
import FullCalendar, { getSlotClassNames } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";
import {Dialog, DialogActions, DialogContent, DialogTitle, ThemeProvider, Typography} from '@material-ui/core';
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
  Checkbox,
  Box,
} from "@material-ui/core";
import axios from "axios";
import GlobalContext from "../GlobalContext";

const initialValues = {
  
  startdate: null,
  fromslot: "",
  enddate: null,
  toslot:"",
  bookingDate: new Date(),
  memberName:"",
  member: null,
  conciergeRequired: false,
  crewRequired: false,
  forMaintenence: false,
  notFromUserQuota: false,
  reservation: [],
  userId:'',
  watercraftId: '',
  
};

const emptyEventList = []
const slotDropDown = []
const memberDropDown = []

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

  const urlSlots = "http://localhost:8080/watercraft/54/ssetting"
  var responseSettings, startHour, endHour, slotString;
  const getSlot = (events) => {
    axios.get(urlSlots).then((res) => {
      responseSettings = res.data;
      for(let i=0; i < responseSettings.timeSlot.length; i++){
        startHour = responseSettings.timeSlot[i].startHour
        endHour = responseSettings.timeSlot[i].endHour
        slotString = String(startHour) + " to " + String(endHour)
        const tempSlotObject = {
          startHour,
          endHour,
          slotString,
        }
        slotDropDown.push(tempSlotObject)
      }
    })
  }

  const urlMembers = "http://localhost:8080/member/getMemberByWatercraft/61"
  var responseMembers;
  const getMembers = (events) => {
    axios.get(urlMembers).then((res) => {
      responseMembers = res.data;
      console.log(responseMembers)
      for(let i=0; i < responseMembers.length; i++){
        memberDropDown.push(responseMembers[i])
      }
    })
  }

  useEffect(() => { 
    getReservations();
    getSlot();
    getMembers();
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
      [name]:value
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
  // const handleCheckboxQuota = (e) =>{
  //   if (e.target.checked) {
  //     setValues({ ...values, [e.target.name]: true });
  //   } else {
  //     setValues({ ...values, [e.target.name]: false });
  //   }
  // }

  const confirmReservation = () => {

    var reservationList = []
    var slotting = false;
    console.log(values.startdate)
    const count = values.enddate.getDate() - values.startdate.getDate();
    for (let i = 0; i <= count; i++) {
      slotDropDown.map((eachSlot) => {
        var eachResSlot = {}
        var result = new Date(values.startdate);
        result.setDate(result.getDate() + i);
        eachResSlot.forDate = result;
        eachResSlot.startHour = eachSlot.startHour
        eachResSlot.endHour = eachSlot.endHour
        eachResSlot.slotString = eachSlot.slotString
        reservationList.push(eachResSlot)
      })
    }
    console.log(values.startdate)

    const removeFront = []
    for (var i = 0; i < reservationList.length; i++) {
      if(reservationList[i].slotString.localeCompare(values.fromslot) === 0){
        break
      } else {
        removeFront.push(reservationList[i])
      }
    }
    reservationList = reservationList.filter( ( el ) => !removeFront.includes( el ) );
    
    const removeBack = []
    for (var i = reservationList.length - 1; i >= 0; i--) {
      console.log(reservationList[i].slotString)
      console.log(values.toslot)
      if(reservationList[i].slotString.localeCompare(values.toslot) === 0){
        break
      } else {
        removeBack.push(reservationList[i])
      }
    }
    reservationList = reservationList.filter( ( el ) => !removeBack.includes( el ) );
    
    
    const reservationObject = {
      bookingDate: values.bookingDate,
      memberName: values.member.firstname + ' ' + values.member.lastname,
      conciergeRequired: values.conciergeRequired,
      crewRequired: values.crewRequired,
      forMaintenence: values.forMaintenence,
      notFromUserQuota: values.notFromUserQuota,
      reservation: values.reservation,
      userId: values.member.memberId,
      watercraftId: globalWatercraftId,
      reservation: reservationList
    };
    console.log(reservationObject)
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
                      <InputLabel>From Slot</InputLabel>
                      <Select
                        label="fromslot"
                        name="fromslot"
                        value={values.fromslot}
                        onChange={handleInputChange}
                      >
                      {
                        slotDropDown.map((slot, index) => {
                                    return (
                                        <MenuItem key={index} value={slot.slotString}>{slot.slotString}</MenuItem>
                                    )
                                })
                              }
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
                      <InputLabel>To Slot</InputLabel>
                      <Select
                        label="toslot"
                        name="toslot"
                        value={values.toslot}
                        onChange={handleInputChange}
                      >
                      {
                        slotDropDown.map((slot, index) => {
                                    return (
                                        <MenuItem key={index} value={slot.slotString}>{slot.slotString}</MenuItem>
                                    )
                                })
                              }
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item sm={6} fullWidth>
                  </Grid>

                  <Grid item sm={6} fullWidth>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel>Member</InputLabel>
                      <Select
                        label="Booking For"
                        name="member"
                        value={values.member}
                        onChange={handleInputChange}
                      >
                      {
                        memberDropDown.map((member, index) => {
                                    return (
                                        <MenuItem key={index} value={member}>{member.firstname}</MenuItem>
                                    )
                                })
                              }
                      </Select>
                    </FormControl>
                  </Grid>

                  <div>
                    <Grid container>
                      <Typography variant="overline" display="block" align="center" style={{marginTop:""}}>
                        Other Services:
                      </Typography>

                      <Grid item sm={12} fullWidth>
                        <FormControlLabel
                        control={<Checkbox onChange={handleCheckboxConcierge} name="conciergeRequired" checked={values.checkedConcierge}/>}
                        label="Concierge Services"
                        />
                      </Grid>
                    
                      <Grid item sm={12} fullWidth>
                        <FormControlLabel
                        control={<Checkbox onChange={handleCheckboxCrew} name="crewRequired" checked={values.checkedCrew} />}
                        label="Request Crew"
                        />
                      </Grid>
                    </Grid>
                  </div>

                  {/* <Grid item sm={12} fullWidth>
                    <FormControlLabel
                    control={<Checkbox onChange={handleCheckboxQuota} name="checkedQuota" checked={values.checkedQuota} />}
                    label="Do not include this booking in the user's quota"
                    />
                  </Grid> */}
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
