import React, { useContext, useEffect, useState } from "react";
import FullCalendar, { getSlotClassNames, parseClassNames } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";
import {Dialog, DialogActions, DialogContent, DialogTitle, Typography} from '@material-ui/core';
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
  makeStyles
} from "@material-ui/core";
import axios from "axios";
import GlobalContext from "../GlobalContext";
import Divider from "@material-ui/core/Divider";
import toDate from "date-fns/toDate";

const useStyle = makeStyles((theme) => ({
  itemStyle:{
    height:"8vh",
  },
  calendarStyle:{
    "fc-sun":{
      backgroundColor: "#b1edfc"
    }
  }
}));

const initialValues = {
  
  startdate: null,
  fromslot: "",
  enddate: null,
  toslot:"",
  bookingDate: new Date(),
  memberName:"",
  member: {},
  conciergeRequired: false,
  crewRequired: false,
  forMaintenence: false,
  notFromUserQuota: false,
  reservation: [],
  userId:'',
  watercraftId: '',
  
};

const emptyEventList = [{}]
const slotDropDown = []
const memberDropDown = []
const displayEventHTML = {
  fromDate: '',
  fromHour: '',
  toDate: '',
  toHour: '',
  member: '',
  scheduleId: ''
}
const monthlySlots = {
  holidaySlot: '',
  prevMonthSlot: '',
  currMonthSlot: '',
  nextMonthSlot: '',
}

function WatercraftSchedulerUI() {

  const [open, setOpen] = useState(false);
  const [eventDialog, setEventDialog] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [eventList, setEventList] = useState(emptyEventList);
  const [displayEvent, setDisplayEvent] = useState(displayEventHTML);
  const [allReservations, setAllReservations] = useState([]);
  const [displaySlot, setDisplaySlot] = useState(monthlySlots)
  const classes = useStyle();
  const globalWatercraftId = useContext(GlobalContext);

  var universalWatercraftId = sessionStorage.getItem('globalWatercraftId');

  var customEvents = []
  var color;
  var memberObject;
  const url = "http://localhost:8080/getschedule/" + universalWatercraftId
  const getReservations = () => { 
    axios.get(url).then((res) => {
      console.log(res.data)
      setAllReservations(res.data)
      for (let i = 0; i < res.data.length; i++) {
        const memberColor = "http://localhost:8080/member/getMember/" + res.data[i].userId
        axios.get(memberColor).then((result) => {
          color = result.data.schedulercolor
          setEventsCalendar(res.data[i].reservation, res.data[i].scheduleId, color)
        })
      }
    })
  }

  const setEventsCalendar = (events, scheduleId, color) => {
    for (let i = 0; i < events.length; i++) {
      var event = {}
      event.start = events[i].forDate
      event.end = events[i].forDate
      event.allDay = true
      event.title = String(events[i].startHour) + ' - ' + String(events[i].endHour)
      event.id = scheduleId
      event.color = color
      setEventList(eventList => [...eventList, event])
    }
  }

  const urlSlots = "http://localhost:8080/watercraft/" + universalWatercraftId + "/ssetting"
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

  const urlMembers = "http://localhost:8080/member/getMemberByWatercraft/" + universalWatercraftId
  const urlLoggedInMember = "http://localhost:8080/member/getMember/" + sessionStorage.getItem("userId")
  var responseMembers;
  const getMembers = (events) => {
    if(sessionStorage.getItem("role") === "Admin"){
      axios.get(urlMembers).then((res) => {
        responseMembers = res.data;
        for(let i=0; i < responseMembers.length; i++){
          memberDropDown.push(responseMembers[i])
        }
      })
    }
    else{
      axios.get(urlLoggedInMember).then((res) => {
        responseMembers = res.data;
        memberDropDown.push(responseMembers)
      })
      
    }
  }


  const monthSlots = "http://localhost:8080/getslots/" + "118"
  const displayMonthlySlot = (events) => {
    axios.get(monthSlots).then((res) => {
      setDisplaySlot(res.data)
    })
  }

  useEffect(() => { 
    getReservations();
    getSlot();
    getMembers();
    displayMonthlySlot();
  },[])


  const handleDateClick = (arg) => {
    handleDialogOpen();

  }

  const handleDialogOpen = () => {
    setOpen(true);
  };
  const handleDialogCloseOnConfirm = () => {
    setOpen(false);
    confirmReservation();
  };
  const handleDialogCloseOnCancel = () => {
    setOpen(false);
  };

  const handleEventOpen = () => {
    setEventDialog(true);
  };
  const handleEventClose = () => {
    setEventDialog(false);
  };

  const handleStartDateChange = (e) => {
    setValues({
      ...values,
      startdate: new Date(e),
    });
  };
  const handleEndDateChange = (e) => {
    if (values.startdate <= e) {
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
  const handleCheckboxQuota = (e) =>{
    if (e.target.checked) {
      setValues({ ...values, [e.target.name]: true });
    } else {
      setValues({ ...values, [e.target.name]: false });
    }
  }

  const handleCheckboxMaintenence = (e) =>{
    if (e.target.checked) {
      setValues({ ...values, [e.target.name]: true });
    } else {
      setValues({ ...values, [e.target.name]: false });
    }
  }

  const handleEventClick = (e) => {
    allReservations.map((eachReservation) => {
      if (parseInt(eachReservation.scheduleId) === parseInt(e.event.id)) {
        setDisplayEvent({
          fromDate: eachReservation.reservation[0].forDate.split("T")[0],
          fromHour: eachReservation.reservation[0].startHour,
          toDate: eachReservation.reservation[eachReservation.reservation.length-1].forDate.split("T")[0],
          toHour: eachReservation.reservation[eachReservation.reservation.length-1].endHour,
          member: eachReservation.memberName,
          scheduleId: eachReservation.scheduleId
        })
      }
    })
    
    handleEventOpen();
  }

  const handleDeleteEvent = (e) => {
    const deleteURL = "http://localhost:8080/deleteschedule/" + displayEvent.scheduleId
    axios.delete(deleteURL).then(res => {
    }, error => {
      alert("Unable to cancel reservation at this moment. Please contact the administrator");
    });
    window.location.reload();
  }

  const confirmReservation = () => {

    var reservationList = []
    var slotting = false;
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
      watercraftId: universalWatercraftId,
      reservation: reservationList
    };

    const endpoint = "http://localhost:8080/addschedule";
    axios.post(endpoint, reservationObject).then(res => {
    }, error => {
      alert("Failed to create reservation! Please try again.");
    });
    window.location.reload();
  }

    return (
        <div>
          <div>
            <Grid container alignItems="center" justify="center">
              <Grid item sm={3} align="center">
              <h3>Holiday Slots Remaining:</h3>{displaySlot.holidaySlot}
              </Grid>
              <Grid item sm={3} align="center">
              <h3>Previous Month's Slots:</h3>{displaySlot.prevMonthSlot}
              </Grid>
              <Grid item sm={3} align="center">
              <h3>Current Month's Slots:</h3>{displaySlot.currMonthSlot}
              </Grid>
              <Grid item sm={3} align="center">
              <h3>Next Month's Slots:</h3>{displaySlot.nextMonthSlot}
              </Grid>
            </Grid>
          </div>
          <Divider style={{marginBottom:"3vh", marginTop:"3vh"}}/>
            <FullCalendar
            className={classes.calendarStyle}
            plugins={[dayGridPlugin, interactionPlugin]}
            dateClick={handleDateClick}
            initialView="dayGridMonth"
            weekends={true}
            events={eventList}
            eventClick={handleEventClick}
            />
            <Dialog open={eventDialog} onClose={handleEventClose} aria-labelledby="form-dialog-title" fullWidth maxWidth="sm">
              <DialogTitle id="form-dialog-title">Reservation Details</DialogTitle>
              <DialogContent dividers>
                <Grid container alignItems="center" justify="center">
                <Grid item sm={12} align="center" className={classes.itemStyle}>
                    <Typography>
                      <Box
                        fontWeight="fontWeightBold"
                        textAlign="center"
                        m={1}
                      >
                        Reservation For
                      </Box>
                    </Typography>
                    {displayEvent.member}
                  </Grid>
                  <Grid item sm={6} align="center" className={classes.itemStyle}>
                    <Typography>
                      <Box
                        fontWeight="fontWeightBold"
                        textAlign="center"
                        m={1}
                      >
                        From Date
                      </Box>
                    </Typography>
                    {displayEvent.fromDate}
                  </Grid>
                  <Grid item sm={6} align="center" className={classes.itemStyle}>
                    <Typography>
                      <Box
                        fontWeight="fontWeightBold"
                        textAlign="center"
                        m={1}
                      >
                        Starting At
                      </Box>
                    </Typography>
                    {displayEvent.fromHour}
                  </Grid>
                  <Grid item sm={6} align="center" className={classes.itemStyle}>
                    <Typography>
                      <Box
                        fontWeight="fontWeightBold"
                        textAlign="center"
                        m={1}
                      >
                        To Date
                      </Box>
                    </Typography>
                    {displayEvent.toDate}
                  </Grid>
                  <Grid item sm={6} align="center" className={classes.itemStyle}>
                    <Typography>
                      <Box
                        fontWeight="fontWeightBold"
                        textAlign="center"
                        m={1}
                      >
                        Ending At
                      </Box>
                    </Typography>
                    {displayEvent.toHour}
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <div style={{float:"left"}}>
                <Button variant="contained" color="secondary" onClick={handleDeleteEvent}>
                  Cancel Reservation
                </Button>
                </div>
              </DialogActions>
            </Dialog>
            <Dialog open={open} onClose={handleDialogCloseOnCancel} aria-labelledby="form-dialog-title" fullWidth maxWidth="sm">
              <DialogTitle id="form-dialog-title">Make Reservation</DialogTitle>
              <DialogContent dividers>
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
                      <Grid item sm={12} fullWidth>
                        <FormControlLabel
                        control={<Checkbox onChange={handleCheckboxQuota} name="notFromUserQuota" checked={values.notFromUserQuota} />}
                        label="Do not include this booking in the user's quota"
                        />
                      </Grid>
                      <Grid item sm={12} fullWidth>
                        <FormControlLabel
                        control={<Checkbox onChange={handleCheckboxMaintenence} name="forMaintenence" checked={values.forMaintenence} />}
                        label="Reserve for Maintenence"
                        />
                      </Grid>
                    </Grid>
                  </div>

              </Grid>
              </DialogContent>

              <DialogActions>
                <Button variant="contained" onClick={handleDialogCloseOnCancel} color="secondary">
                  Cancel
                </Button>
                <Button variant="contained" onClick={handleDialogCloseOnConfirm} color="primary">
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
        </div>
    )
}

export default WatercraftSchedulerUI
