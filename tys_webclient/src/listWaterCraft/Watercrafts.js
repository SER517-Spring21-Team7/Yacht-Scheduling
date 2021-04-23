import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Avatar, Grid } from "@material-ui/core/";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as GiIcons from "react-icons/gi";

const useStyles = makeStyles({
  root: {
    //display: "flex",
    //minWidth: "150%",
  },
  buttonStyle: {
    //minWidth: "150%",
  },
  contentAlignment: {
    alignItems: "center",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    minWidth: "50%",
    height: 150,
    backgroundColor: "whitesmoke",
  },
  imageStyle: {
    display: "flex",
    flexDirection: "column",
    minWidth: "50%",
    //height: 150,
  },
  media: {
    height: 150,
    width: 150,
  },
  avatarStyle: {
    marginRight: "5px",
  },
});

const Watercrafts = (props) => {
  const {
    watercraftId,
    watercraftName,
    image,
    parentState,
    parentState1,
  } = props;
  const classes = useStyles();
  const history = useHistory();
  const deleteWaterCraft = async (id) => {
    var listOfWatercrafts = parentState;

    listOfWatercrafts = listOfWatercrafts.filter(
      (item) => item.watercraftId !== id
    );
    parentState1(listOfWatercrafts);
    const url = "http://localhost:8080/watercraft/deleteWaterCraft/" + id;
    const response = await fetch(url, {
      method: "DELETE",
    });
  };
  const handleRedirect = (id) => {
    history.push("/editWatercraft/" + id);
  };
  const reservation = () => {
    history.push("/reservation");
  }
  const viewmember = () => {
    history.push("/viewmember");
  }
  const myAccount = () => {
    history.push("/MyAccount");
  }
  const checklist = () => {
    history.push("/checklistView");
  }
  return (
    <>
      <Card className={classes.root}>
        <CardActions className={classes.imageStyle}>
          <CardContent>
            <CardMedia className={classes.media} image={image} />
            <Typography gutterBottom variant="h5">
              {watercraftName}
            </Typography>
          </CardContent>
        </CardActions>

        <CardActionArea className={classes.details}>
          <CardContent>
            <div>
              <Grid container>
                <Grid item xs="auto" className={classes.avatarStyle}>
                  <Avatar style={{ backgroundColor: "#795548" }}></Avatar>
                </Grid>
                <Grid item xs="auto" className={classes.avatarStyle}>
                  <Avatar style={{ backgroundColor: "#607d8b" }}></Avatar>
                </Grid>
                <Grid item xs="auto" className={classes.avatarStyle}>
                  <Avatar style={{ backgroundColor: "#33691e" }}></Avatar>
                </Grid>
                <Grid item xs="auto" className={classes.avatarStyle}>
                  <Avatar style={{ backgroundColor: "#009688" }}></Avatar>
                </Grid>
              </Grid>
            </div>
            <br />
            <div>
              <Grid container>
                <Grid item xs="auto" className={classes.avatarStyle}>
                  <Avatar
                    variant="square"
                    onClick={ reservation}
                    style={{ backgroundColor: "#424242" }}
                  >
                    <AiIcons.AiOutlineSchedule />
                  </Avatar>
                </Grid>
                <Grid item xs="auto" className={classes.avatarStyle}>
                  <Avatar
                    variant="square"
                    onClick={viewmember}
                    style={{ backgroundColor: "#424242" }}
                  >
                    <FaIcons.FaUsers />
                  </Avatar>
                </Grid>
                <Grid item xs="auto" className={classes.avatarStyle}>
                  <Avatar
                    variant="square"
                    onClick={myAccount}
                    style={{ backgroundColor: "#424242" }}
                  >
                    <FaIcons.FaCog />
                  </Avatar>
                </Grid>
                <Grid item xs="auto" className={classes.avatarStyle}>
                  <Avatar
                    variant="square"
                    onClick={checklist}
                    style={{ backgroundColor: "#424242" }}
                  >
                    <FaIcons.FaClipboardList />
                  </Avatar>
                </Grid>
              </Grid>
            </div>
          </CardContent>
        </CardActionArea>
        {/* </Card>
      <Card className={classes.buttonStyle}> */}
        <CardActions>
          <Button
            size="small"
            color="primary"
            // variant="contained"
            onClick={() => handleRedirect(watercraftId)}
          >
            Edit
          </Button>
          <Button
            size="small"
            color="secondary"
            // variant="contained"
            onClick={() => deleteWaterCraft(watercraftId)}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default Watercrafts;
