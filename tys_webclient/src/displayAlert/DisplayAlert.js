import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import {
  Grid,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
} from "@material-ui/core";

const initialValues = {
  description: "",
  watercraft: "",
};
const useStyle = makeStyles((theme) => ({
  root: {
    width: "80%",
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(15),
    "& .MuiFormControl-root": {
      width: "70%",
      margin: theme.spacing(1.5),
    },
    "& .MuiButtonBase-root": {
      marginLeft: "38%",
    },
  },
  containerStyle: {
    backgroundColor: "#f5f5f5",
    width: "100%",
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(0),
  },
}));
const DisplayAlert = () => {
  const classes = useStyle();
  const [values, setValues] = useState(initialValues);
  const [watercrafts, setWatercrafts] = useState([]);
  const url =
    "http://ec2-18-237-18-199.us-west-2.compute.amazonaws.com:8080/watercraft/getAllWaterCraft";
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const getWaterCraft = async () => {
    const response = await axios.get(url);
    const watercrafts = response.data;
    console.log(watercrafts);
    setWatercrafts(watercrafts);
  };
  useEffect(() => {
    getWaterCraft();
  }, []);

  const buttonClicked = (event) => {
    console.log(values);
    var saveJson = {
      text: values.description,
      watercraftId:
        values.watercraft === null ? null : values.watercraft.watercraftId,
    };
    console.log(saveJson);
    axios
      .post(
        "http://ec2-18-237-18-199.us-west-2.compute.amazonaws.com:8080/displayAlert/add",
        saveJson
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    setValues({ description: "", watercraft: "" });
  };

  return (
    <div>
      <form className={classes.root}>
        <Grid container className={classes.containerStyle}>
          <Grid item xs={12}>
            <FormControl variant="outlined">
              <InputLabel>Select Watercraft</InputLabel>
              <Select
                label="Watercraft"
                name="watercraft"
                value={values.watercraft}
                onChange={handleInputChange}
              >
                <MenuItem>
                  <em>None</em>
                </MenuItem>
                {watercrafts.map((craft, index) => {
                  return (
                    <MenuItem key={index} value={craft}>
                      {craft.watercraftName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              multiline
              variant="outlined"
              label="Add Alert Description"
              rows={6}
              columns={300}
              name="description"
              value={values.description}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              size="large"
              variant="contained"
              color="secondary"
              style={{ width: "20%", marginTop: "2.5%", paddingLeft: "0px" }}
              onClick={buttonClicked}
            >
              Add Alert
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default DisplayAlert;
