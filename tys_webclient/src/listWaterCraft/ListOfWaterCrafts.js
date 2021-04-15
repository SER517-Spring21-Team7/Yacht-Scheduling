import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
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
import Watercrafts from "./Watercrafts";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    marginBottom: "5%",
  },
}));

const ListOfWaterCrafts = () => {
  const [watercrafts, setWatercrafts] = useState([]);

  const [alerts, setAlerts] = useState([]);
  const url = "http://localhost:8080/watercraft/getAllWaterCraft";
  var urlForAlert = "http://localhost:8080/displayAlert/get/";
  const urlAll = "http://localhost:8080/watercraft/getAllWaterCraft";
  const urlMember =
    "http://localhost:8080/watercraft/getWaterCraftByMemberId/" +
    sessionStorage.getItem("userId");

  const getWaterCraft = async () => {
    var url = null;
    if (sessionStorage.getItem("role") === "Admin") {
      url = urlAll;
    } else {
      url = urlMember;
    }
    const response = await axios.get(url);
    const watercrafts = response.data;
    setWatercrafts(watercrafts);
    urlForAlert = urlForAlert.concat(sessionStorage.getItem("userId"));

    const responseAlter = await axios.get(urlForAlert);
    setAlerts(responseAlter.data);
    console.log(alerts);
  };

  useEffect(() => {
    getWaterCraft();
  }, []);
  // console.log(craft);
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleAlertOpen = () => {
    setOpen(true);
  };
  const handleAlertClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Fab
        variant="extended"
        onClick={handleAlertOpen}
        style={{ float: "right", backgroundColor: "#b71c1c", color: "white" }}
      >
        Alerts
      </Fab>
      <Grid container>
        {/* <Grid item xs={3}> */}
        {watercrafts.map((singleCraft) => {
          return (
            <Grid
              item
              item
              xs={4}
              key={singleCraft.watercraftId}
              style={{ padding: "5px" }}
            >
              <Paper className={classes.paper}>
                <Watercrafts
                  {...singleCraft}
                  parentState={watercrafts}
                  parentState1={setWatercrafts}
                />
              </Paper>
            </Grid>
          );
        })}
        <Dialog
          open={open}
          onClose={handleAlertClose}
          aria-labelledby="form-dialog-title"
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle id="form-dialog-title">Active alerts</DialogTitle>
          <DialogContent dividers>
            <div>
              {alerts.map((singleCraft) => {
                return <Alert severity="error">{singleCraft.text}</Alert>;
              })}
            </div>
          </DialogContent>
        </Dialog>
      </Grid>
    </div>
  );
};

export default ListOfWaterCrafts;
