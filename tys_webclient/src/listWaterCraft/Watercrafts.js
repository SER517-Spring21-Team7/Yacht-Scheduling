import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  rootFirst: {
    maxWidth: 345,
    display: "flex",
  },
  contentAlignment: {
    alignItems: "left",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  media: {
    height: 100,
    width: 100,
  },
});

const Watercrafts = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const deleteWaterCraft = async (id) => {
    var listOfWatercrafts = props.parentState;

    listOfWatercrafts = listOfWatercrafts.filter(
      (item) => item.watercraftId !== id
    );
    props.parentState1(listOfWatercrafts);
    const url = "http://localhost:8080/watercraft/deleteWaterCraft/" + id;
    const response = await fetch(url, {
      method: "DELETE",
    });
  };
  const handleRedirect = (id) => {
    history.push("/editWatercraft/" + id);
  };
  return (
    <>
      <Card className={classes.rootFirst}>
        <div className={classes.details}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image="https://api1.nauticalmonkey.com/uploadedImages/ab68874bf7d941cb815e5ba28d0a7b07_small.jpg"
              title="Boat"
            />
          </CardActionArea>
        </div>
        <div className={classes.details}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {props.name}
              </Typography>
              <Typography variant="h6" color="textSecondary" component="p">
                List of users component
              </Typography>
              <Typography variant="h6" color="textSecondary" component="p">
                All scheduling Controls
              </Typography>
            </CardContent>
          </CardActionArea>
        </div>
      </Card>
      <Card className={classes.root}>
        <CardActions>
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={() => handleRedirect(props.watercraftId)}
          >
            Edit
          </Button>
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={() => deleteWaterCraft(props.watercraftId)}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default Watercrafts;
