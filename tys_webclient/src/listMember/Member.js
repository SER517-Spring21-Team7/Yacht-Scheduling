import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root: {
    display: "flex",
    width: 345,
    height: 650,
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
  return (
    <>
      {console.log(props.name)}
      <Card className={classes.root} style={section}>
        <Grid container direction="row" style={section}>
          <Grid container spacing={2} style={{ height: "25%" }}>
            <Grid item xs={4}>
              <CardMedia
                className={classes.media}
                image="https://api1.nauticalmonkey.com/uploadedImages/ab68874bf7d941cb815e5ba28d0a7b07_small.jpg"
                title="Boat"
                alignItem="center"
              />
            </Grid>
            <Grid item xs={8}>
              <Typography gutterBottom variant="h5" component="h2">
                {props.name.firstname} {props.name.lastname}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Premium:{props.name.premiumshare} | Standard:
                {props.name.standardshare}
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2} style={{ height: "65%" }}>
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
              <Typography
                variant="body1"
                gutterBottom
                style={{ whiteSpace: "pre-line" }}
              >
                <h3>Access dates:</h3>{" "}
                {new Date(props.name.startdate).toDateString()} to{" "}
                {new Date(props.name.enddate).toDateString()}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="body1"
                gutterBottom
                style={{ whiteSpace: "pre-line" }}
              >
                <h3>Premium slot</h3>
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                style={{ whiteSpace: "pre-line" }}
              >
                9:00 AM - 5:00 PM : 4 remaining ( Out of Total 4 )
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                style={{ whiteSpace: "pre-line" }}
              >
                9:00 AM - 5:00 PM : 4 remaining ( Out of Total 4 )
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="body1"
                gutterBottom
                style={{ whiteSpace: "pre-line" }}
              >
                <h3>Standard slot</h3>
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                style={{ whiteSpace: "pre-line" }}
              >
                9:00 AM - 5:00 PM : 4 remaining ( Out of Total 4 )
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="body1"
                gutterBottom
                style={{ whiteSpace: "pre-line" }}
              >
                Limited to 0 FREE bookings per month.
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2} style={{ alignItems: "center" }}>
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
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default Member;
