import React from "react";
import {
    KeyboardTimePicker,
    MuiPickersUtilsProvider,
  } from '@material-ui/pickers';
import { Grid,
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
 import 'date-fns';
 import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles((theme) => ({
    container: {
        width: "50%",
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(0)
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
        width: "100%"
    }
}));

export default function TimeSlots(props) {
    const {customSlots} = props;
    const blankSlot = [{rownum: customSlots.length+1, startTime: null, endTime: null}];
    const classes = useStyles();
    const [slots, setSlots] = React.useState(customSlots.concat(blankSlot));

    const addNewSlot = (event) => {
        event.preventDefault();
        const newSlots = slots.concat({
            rownum: slots.length + 1,
            startTime: null,
            endTime: null
        });
        console.log(newSlots);
        setSlots(newSlots);
    }

    const handleStartTimeChange = (row, date) => {
        const updateSlots = slots.map(eachSlot => {
            if(eachSlot.rownum === row) {
                return {...eachSlot, startTime: date};
            }
            return eachSlot;
        });
        setSlots(updateSlots);
    }

    const handleEndTimeChange = (row, date) => {
        const updateSlots = slots.map(eachSlot => {
            if(eachSlot.rownum === row) {
                return {...eachSlot, endTime: date};
            }
            return eachSlot;
        });
        setSlots(updateSlots);
    }
    return (
        <div>
            <TableContainer className={classes.papercontainer} component={Paper}>
                <Table size="small" className={classes.table} aria-label="simple table">
                    <TableHead className={classes.tableHeader}>
                        <TableRow>
                            <TableCell
                                style={{fontWeight:"bolder", fontSize: "1rem"}}
                                align="center">
                                Start Time</TableCell>
                            <TableCell
                                style={{fontWeight:"bolder", fontSize: "1rem"}}
                                align="center">
                                End Time</TableCell>
                            <TableCell
                                style={{fontWeight:"bolder", fontSize: "1rem"}}
                                align="center">
                                Edit</TableCell>
                            <TableCell
                                style={{fontWeight:"bolder", fontSize: "1rem"}}
                                align="center">
                                Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                        slots.map((slot) => {
                        return (
                        <TableRow key={slot.rownum}>
                        <TableCell>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid>
                            <KeyboardTimePicker
                                margin="normal"
                                id="startTime"
                                name="startTimePicker"
                                label="Time picker"
                                value={slot.startTime}
                                onChange={(date) => handleStartTimeChange(slot.rownum, date)}
                                format="hh:mm"
                                KeyboardButtonProps={{
                                'aria-label': 'change time',
                                }}
                            />
                            </Grid>
                        </MuiPickersUtilsProvider>
                        </TableCell>
                        <TableCell>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid>
                            <KeyboardTimePicker
                                margin="normal"
                                id="endTime"
                                name="endTimePicker"
                                label="Time picker"
                                value={slot.endTime}
                                onChange={(date) => handleEndTimeChange(slot.rownum, date)}
                                format="hh:mm"
                                KeyboardButtonProps={{
                                'aria-label': 'change time',
                                }}
                            />
                            </Grid>
                        </MuiPickersUtilsProvider>
                        </TableCell>
                        <TableCell>
                            Edit Row
                        </TableCell>
                        <TableCell>
                            Delete Row
                        </TableCell>
                        </TableRow>
                        )
                    })
                }
                </TableBody>
            </Table>
        </TableContainer>
        <Button onClick={addNewSlot} variant="contained"
        style={{ margin: "5px"}}>
            Add Item
        </Button>
        <br/>
        </div>
      );
}