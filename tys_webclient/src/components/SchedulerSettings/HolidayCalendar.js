import React, { useEffect } from "react";
import {
  Grid,
  TextField,
  makeStyles,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  TableHead,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { useHistory, useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "80%",
  },
  container: {
    width: "100%",
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(0),
  },
  text: {
    width: "100%",
  },
  table: {
    width: "100%",
  },
  papercontainer: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
  tableHeader: {
    backgroundColor: "#81d4fa",
    width: "100%",
  },
  dialogTitle: {
    color: "#90caf9",
    "& .MuiTypography-root": {
      fontSize: "2rem",
    },
  },
}));

const blankrows = [{ rownum: 1, holidayName: "", holidayDate: null }];
const blankCalendarDetail = { calendarName: "", calendarId: 0 };

export default function HolidayCalendar() {
  //this.state.props = props;
  const classes = useStyles();
  const history = useHistory();
  const { idOfHolidayCalendar } = useParams();
  const [open, setOpen] = React.useState(false);
  const [rows, setRows] = React.useState(blankrows);
  const [calendarDetail, setCalendarDetail] = React.useState(
    blankCalendarDetail
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    history.push("/scheduler");
  };

  const handleCalendarNameChange = (event) => {
    setCalendarDetail(event.target.value);
  };

  const addRow = () => {
    var rownum = rows.length + 1;
    const newRows = rows.concat({
      rownum: rownum,
      holidayName: "",
      holidayDate: null,
    });
    setRows(newRows);
  };

  const handleDateChange = (rownum, date) => {
    console.log(rownum, date);
    const updatedRows = rows.map((eachRow) => {
      if (eachRow.rownum === rownum) {
        return { ...eachRow, holidayDate: date };
      }
      return eachRow;
    });
    setRows(updatedRows);
  };

  const handleNameChange = (rownum, event) => {
    console.log(rownum, event.target.value);
    const updatedRows = rows.map((eachRow) => {
      if (eachRow.rownum === rownum) {
        return { ...eachRow, holidayName: event.target.value };
      }
      return eachRow;
    });
    setRows(updatedRows);
  };

  const handleSave = () => {
    return fetch("http://localhost:8080/holidaycalendar", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: calendarDetail.calendarName,
        listOfHoliday: rows,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log("Holiday Calendar created.");
        handleClose();
      })
      .catch((error) => {
        console.error("Holiday Calendar creation failed!");
      });
  };

  useEffect(() => {
    handleClickOpen();
    if (idOfHolidayCalendar != "create") {
      console.log("Fetching for ID:: " + idOfHolidayCalendar);
      fetch("http://localhost:8080/holidaycalendar/" + idOfHolidayCalendar, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log("data" + data.id);
          setCalendarDetail({ calendarName: data.name, calendarId: data.id });
          console.log("name" + data.name);
          console.log("id" + data.id);
          console.log("cal det" + calendarDetail);
          setRows(data.listOfHoliday);
        });
    }
  }, []);

  const handleUpdate = () => {
    console.log(calendarDetail.calendarId);
    return fetch(
      `http://localhost:8080/holidaycalendar/${calendarDetail.calendarId}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: calendarDetail.calendarName,
          listOfHoliday: rows,
        }),
      }
    )
      .then((response) => response.json())
      .then((json) => {
        console.log("Holiday Calendar updated.");
        handleClose();
      })
      .catch((error) => {
        console.error("Holiday Calendat update failed!");
      });
  };

  return (
    <React.Fragment>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open max-width dialog
      </Button> */}
      <Dialog
        fullWidth
        maxWidth={"sm"}
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle
          id="max-width-dialog-title"
          className={classes.dialogTitle}
        >
          Holiday Calendar
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            style={{ backgroundColor: "#81d4fa", padding: "2px" }}
          >
            Create a new holiday Calendar.
          </DialogContentText>
          <form className={classes.form} noValidate>
            <Grid container className={classes.container}>
              <Grid item xs={12}>
                <TextField
                  className={classes.text}
                  required
                  variant="outlined"
                  label="Holiday Calendar Name"
                  name="holidayCalendarName"
                  value={calendarDetail.calendarName}
                  helperText="Please provide a unique name. Like: US Holidays 2021"
                  onChange={handleCalendarNameChange}
                />
              </Grid>
            </Grid>
          </form>
          <TableContainer className={classes.papercontainer} component={Paper}>
            <Table
              className={classes.table}
              size="small"
              aria-label="simple table"
            >
              <TableHead className={classes.tableHeader}>
                <TableRow>
                  <TableCell
                    style={{ fontWeight: "bolder", fontSize: "1rem" }}
                    align="center"
                  >
                    Holiday Name
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bolder", fontSize: "1rem" }}
                    align="center"
                  >
                    Holiday Date
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.rownum}>
                    <TableCell align="center">
                      <TextField
                        required
                        name="holidayName"
                        value={row.holidayName}
                        onChange={(e) => handleNameChange(row.rownum, e)}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                          <KeyboardDatePicker
                            margin="none"
                            format="MM/dd/yyyy"
                            value={row.holidayDate}
                            onChange={(e) => handleDateChange(row.rownum, e)}
                            KeyboardButtonProps={{
                              "aria-label": "change date",
                            }}
                          />
                        </Grid>
                      </MuiPickersUtilsProvider>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            onClick={addRow}
            variant="contained"
            style={{ marginTop: "10px" }}
          >
            Add Holiday
          </Button>
        </DialogContent>
        <DialogActions>
          {idOfHolidayCalendar != "create" ? (
            <Button onClick={handleUpdate} variant="contained" color="primary">
              Update
            </Button>
          ) : (
            <Button onClick={handleSave} variant="contained" color="primary">
              Save
            </Button>
          )}

          <Button onClick={handleClose} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
