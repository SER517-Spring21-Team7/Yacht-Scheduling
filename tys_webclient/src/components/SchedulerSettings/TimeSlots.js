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
import DeleteIcon from "@material-ui/icons/Delete";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({

  table: {
    width: "100%",
  },
  papercontainer: {

    "& .MuiFormControl-root": {
    width: "60%",
    margin: theme.spacing(1),
    },

    marginTop: theme.spacing(2),
    width: "70%",
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
      if (slotsFromParent.length === 0) {
        setSlots(slotsFromParent.concat(blankSlot));
      } else {
        setSlots(slotsFromParent);
      }
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

  const deleteSlot = (slotnum) => {
    const newTempSlots = slots.filter((each) => each.rownum !== slotnum);
    setSlots(newTempSlots);
    handleTimeSlots(newTempSlots);
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
        <Table size="medium" className={classes.table} aria-label="simple table">
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
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {slots.map((slot) => {
              return (
                <TableRow key={slot.rownum}>
                  <TableCell align="center">
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
                  </TableCell>
                  <TableCell align="center">
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
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      color="secondary"
                      size="large"
                      startIcon={<DeleteIcon />}
                      onClick={() => deleteSlot(slot.rownum)}
                    ></Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        color="primary"
        onClick={addNewSlot}
        variant="contained"
        style={{ marginTop: "2%"}}
      >
        Add Item
      </Button>
      <br />
    </div>
  );
});

export default TimeSlots;
