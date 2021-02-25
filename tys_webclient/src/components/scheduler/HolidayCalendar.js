import React from "react";
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

export default function MaxWidthDialog() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [rows, setRows] = React.useState(blankrows);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

  const handleNameChange = (rownum, name) => {
    console.log(rownum, name.target.value);
    const updatedRows = rows.map((eachRow) => {
      if (eachRow.rownum === rownum) {
        return { ...eachRow, holidayName: name.target.value };
      }
      return eachRow;
    });
    setRows(updatedRows);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open max-width dialog
      </Button>
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
          //   style={{ color: "#004ba0", font: 16 }}
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
                  helperText="Please provide a unique name. Like: US Holidays 2021"
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
                            margin="medium"
                            //id="date-picker-dialog"
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
          <Button onClick={handleClose} variant="contained" color="primary">
            Save
          </Button>
          <Button onClick={handleClose} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
