import React from 'react'
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


function WatercraftSchedulerUI() {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDateClick = (arg) => {
    handleClickOpen();

  }
    return (
        <div>
            <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            dateClick={handleDateClick}
            initialView="dayGridMonth"
            weekends={true}
            events={[
                { title: 'event 1', date: '2021-03-19'},
                { title: 'event 2', date: '2021-03-19' },
                { title: 'event 1', date: '2021-03-20' }
              ]}
              eventColor={'#378006'}
            />
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth maxWidth="sm">
              <DialogTitle id="form-dialog-title">Make Reservation</DialogTitle>
              <DialogContent>
                <Grid container>
                  <Grid item sm={6}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                            <KeyboardDatePicker
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="fromdate"
                            name="fromdate"
                            label="From"
                            // value={values.startdate}
                            // onChange={handleStartDateChange}
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
                        // value={values.boatClass}
                        // onChange={handleInputChange}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
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
                            id="todate"
                            name="todate"
                            label="To"
                            // value={values.startdate}
                            // onChange={handleStartDateChange}
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
                        label="tolot"
                        name="tolot"
                        // value={values.boatClass}
                        // onChange={handleInputChange}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value="Slot 1">Slot 1</MenuItem>
                        <MenuItem value="Slot 2">Slot 2</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
              </Grid>
              </DialogContent>

              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleClose} color="primary">
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
        </div>
    )
}

export default WatercraftSchedulerUI
