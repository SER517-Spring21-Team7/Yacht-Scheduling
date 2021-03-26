import React, { forwardRef, useImperativeHandle } from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import {
  Grid,
  makeStyles,
  TableBody,
  TableCell,
  TableContainer,
  Table,
  Button,
  TableHead,
  Paper,
  TableRow,
} from "@material-ui/core";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "50%",
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(0),
  },
  table: {
    width: "100%",
  },
  papercontainer: {
    marginTop: theme.spacing(2),
    width: "50%",
  },
  tableHeader: {
    backgroundColor: "#81d4fa",
    width: "100%",
  },
}));

const TimeSlots = forwardRef((props, ref) => {
  const { customSlots, handleTimeSlots } = props;
  const blankSlot = [
    { rownum: customSlots.length + 1, startHour: "", endHour: "" },
  ];
  const hoursArr = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const classes = useStyles();
  const [slots, setSlots] = React.useState(customSlots.concat(blankSlot));

  useImperativeHandle(ref, () => ({
    updateSlotState(slotsFromParent) {
      setSlots(slotsFromParent.concat(blankSlot));
    },
  }));

  const addNewSlot = (event) => {
    event.preventDefault();
    const newSlots = slots.concat({
      rownum: slots.length + 1,
      startHour: "",
      endHour: "",
    });
    console.log(newSlots);
    setSlots(newSlots);
    //props.parentCallback(newSlots);
  };

  const handleStartTimeChange = (row, value) => {
    console.log(row);
    const updateSlots = slots.map((eachSlot) => {
      if (eachSlot.rownum === row) {
        console.log("Start Hour " + value.target.value);
        return { ...eachSlot, startHour: value.target.value };
      }
      return eachSlot;
    });
    console.log(updateSlots);
    setSlots(updateSlots);
    handleTimeSlots(updateSlots);
  };

  const handleEndTimeChange = (row, value) => {
    console.log(row);
    const updateSlots = slots.map((eachSlot) => {
      if (eachSlot.rownum === row) {
        console.log("End Hour " + value.target.value);
        return { ...eachSlot, endHour: value.target.value };
      }
      return eachSlot;
    });
    console.log(updateSlots);
    setSlots(updateSlots);
    handleTimeSlots(updateSlots);
  };

  return (
    <div>
      <TableContainer className={classes.papercontainer} component={Paper}>
        <Table size="small" className={classes.table} aria-label="simple table">
          <TableHead className={classes.tableHeader}>
            <TableRow>
              <TableCell
                style={{ fontWeight: "bolder", fontSize: "1rem" }}
                align="center"
              >
                Start Time
              </TableCell>
              <TableCell
                style={{ fontWeight: "bolder", fontSize: "1rem" }}
                align="center"
              >
                End Time
              </TableCell>
              <TableCell
                style={{ fontWeight: "bolder", fontSize: "1rem" }}
                align="center"
              >
                Edit
              </TableCell>
              <TableCell
                style={{ fontWeight: "bolder", fontSize: "1rem" }}
                align="center"
              >
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {slots.map((slot) => {
              return (
                <TableRow key={slot.rownum}>
                  <TableCell>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid>
                        <FormControl variant="outlined" required>
                          <InputLabel>Start Hour</InputLabel>
                          <Select
                            label="Start Hour"
                            name="startHour"
                            value={slot.startHour}
                            onChange={(value) =>
                              handleStartTimeChange(slot.rownum, value)
                            }
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            {hoursArr.map((hour) => {
                              return (
                                <MenuItem key={hour} value={hour + " AM"}>
                                  {hour} AM
                                </MenuItem>
                              );
                            })}
                            {hoursArr.map((hour) => {
                              return (
                                <MenuItem key={hour} value={hour + " PM"}>
                                  {hour} PM
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </Grid>
                    </MuiPickersUtilsProvider>
                  </TableCell>
                  <TableCell>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid>
                        <FormControl variant="outlined" required>
                          <InputLabel>End Hour</InputLabel>
                          <Select
                            label="End Hour"
                            name="endHour"
                            value={slot.endHour}
                            onChange={(value) =>
                              handleEndTimeChange(slot.rownum, value)
                            }
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            {hoursArr.map((hour) => {
                              return (
                                <MenuItem key={hour} value={hour + " AM"}>
                                  {hour} AM
                                </MenuItem>
                              );
                            })}
                            {hoursArr.map((hour) => {
                              return (
                                <MenuItem key={hour} value={hour + " PM"}>
                                  {hour} PM
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </Grid>
                    </MuiPickersUtilsProvider>
                  </TableCell>
                  <TableCell>Edit Row</TableCell>
                  <TableCell>Delete Row</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        onClick={addNewSlot}
        variant="contained"
        style={{ margin: "5px" }}
      >
        Add Item
      </Button>
      <br />
    </div>
  );
});

export default TimeSlots;
