import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from "@material-ui/icons/Delete";
import { Button } from "@material-ui/core";

import {
  Paper,
  Typography,
  Box,
  Fab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    marginBottom: "5%",
  },
}));

const ManageAlert = () => {

  const [alerts, setAlerts] = useState([]);

  var urlForAlert = "http://localhost:8080/displayAlert/get/"+sessionStorage.getItem("userId");

  const getAlerts = async () => {
  const responseAlter = await axios.get(urlForAlert);
  setAlerts(responseAlter.data);
  };

  const deleteAlert = (alertId) => {
    const newAlerts = alerts.filter((each) => each.id !== alertId);
    const url = "http://localhost:8080/displayAlert/delete/"+alertId;
    console.log(newAlerts);
    fetch(url, {
      method: "DELETE",
      "authorization" : sessionStorage.getItem("authorization"),
      "Content-Type": "application/json",
    });
    setAlerts(newAlerts);
  }

  useEffect(() => {
    getAlerts();
  }, []);
return (

  <TableContainer component={Paper}>
      <Table className="alerts" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Alerts</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {alerts.map((row) => {
            return (
            <TableRow key={row.id}>
              <TableCell align="left">{row.text}</TableCell>
              <TableCell align="center">
                    <Button
                      color="secondary"
                      size="large"
                      startIcon={<DeleteIcon />}
                      onClick={() => deleteAlert(row.id)}
                    ></Button>
                  </TableCell>
            </TableRow>
            );
            })}

        </TableBody>
      </Table>
    </TableContainer>
);      
};

export default ManageAlert;