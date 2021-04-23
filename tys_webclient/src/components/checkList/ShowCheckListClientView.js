import {
  Button,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { useStyles } from "@material-ui/pickers/views/Calendar/SlideTransition";
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

const useStyle = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  containerStyle: {
    padding: theme.spacing(1),
    marginTop: "1%",
    border: "4px solid #4db6ac",
    borderRadius: "5px",
  },
}));

const ShowCheckListClientView = () => {
  const classes = useStyles();
  const [checkLists, setcheckLists] = useState([]);

  const getChecklist = async () => {
    var watercraftId = sessionStorage.getItem("globalWatercraftId");
    if (watercraftId === null) {
      alert("Please select watercraft");
      return;
    }
    var url =
      "http://ec2-18-237-18-199.us-west-2.compute.amazonaws.com:8080/checkList/getpub/";
    url += watercraftId;
    console.log(url);
    const response = await axios.get(url);
    const checkList = response.data;
    setcheckLists(checkList);
  };

  useEffect(() => {
    getChecklist();
  }, []);

  const buttonClicked = (event) => {
    console.log(event);
    document.getElementById(event).style.backgroundColor = "green";
    document.getElementById(event).textContent = "Done";
    // console.log(event.target);
    // console.log(event.target.id);
  };

  return (
    <div
      style={{
        border: "4px solid #4db6ac",
        marginTop: "1%",
        borderRadius: "5px",
      }}
    >
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Check List Details</TableCell>
              <TableCell align="right">Stage</TableCell>
              <TableCell align="right">Mark As Done&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {checkLists.map((checkList) => (
              <TableRow key={checkList.id}>
                <TableCell component="th" scope="row">
                  {checkList.id}
                </TableCell>
                <TableCell align="right">{checkList.checkListName}</TableCell>
                <TableCell align="right">{checkList.stage}</TableCell>
                <TableCell align="right">
                  <Button
                    id={checkList.id}
                    variant="contained"
                    color="primary"
                    style={{ width: "30%", marginTop: "1%" }}
                    onClick={() => buttonClicked(checkList.id)}
                  >
                    Check
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ShowCheckListClientView;
