import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root: {
    width: 360,
    marginTop: "1%",
    border: "2px solid #4db6ac",
    borderRadius: "5px",
  },
  media: {
    height: 50,
    width: 50,
  },
});

const Member = (props) => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  var pix = "7px";
  const section = {
    marginTop: pix,
    marginLeft: pix,
    // marginRight: pix,
    // marginBotton: pix,
  };

  const getMemeberImage = (imageUrl) => {
    if (imageUrl === undefined)
      imageUrl =
        "https://api1.nauticalmonkey.com/uploadedImages/ab68874bf7d941cb815e5ba28d0a7b07_small.jpg";

    return imageUrl;
  };

  return (
    <>
      {console.log(props.name)}
      <Card className={classes.root} style={section}>
        <Grid container direction="row" style={section}>
          <Grid container>
            <Grid item xs={3}>
              <CardMedia
                className={classes.media}
                image={props.name.image}
                title="Boat"
                alignItem="center"
              />
            </Grid>
            <Grid item xs={9}>
              <Typography gutterBottom variant="h5" component="h2">
                {props.name.firstname} {props.name.lastname}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Premium:{props.name.premiumshare} | Standard:
                {props.name.standardshare}
              </Typography>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12}>
              <Typography
                variant="body1"
                gutterBottom
                style={{ whiteSpace: "pre-line" }}
              >
                {props.name.email}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <hr style={{ borderColor: "#4db6ac" }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
                <h4>Access dates:</h4>
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                }).format(new Date(props.name.startdate))}{" "}
                to{" "}
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                }).format(new Date(props.name.enddate))}
                {/* {new Date(props.name.startdate).toUTCString()} to{" "}
                {new Date(props.name.enddate).toDateString()} */}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <hr style={{ borderColor: "#4db6ac" }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
                <h4>Holiday Slots Remaining: {props.name.slotData[0]}</h4>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
                <h4>Previous Month Slot: {props.name.slotData[1]}</h4>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
                <h4>Current Month Slot: {props.name.slotData[2]}</h4>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
                <h4>Next Month Slot: {props.name.slotData[3]}</h4>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
                Limited to {props.name.freebookings} FREE bookings per month.
              </Typography>
            </Grid>
          </Grid>

          {/* <Grid container spacing={2} style={{ alignItems: "center" }}>
            <Button
              size="small"
              color="primary"
              variant="contained"
              style={{ marginLeft: "10px" }}
            >
              Edit
            </Button>
            <Button
              size="small"
              color="primary"
              variant="contained"
              style={{ marginLeft: "10px" }}
            >
              Delete Member
            </Button>
          </Grid> */}
        </Grid>
      </Card>
    </>
  );
};

export default Member;
