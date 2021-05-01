import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
  Checkbox,
} from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";

const initialValues = {
  checkListName: "",
  stage: "Check On",
  publish: false,
  watercraftId: null,
};

const useStyle = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "90%",
      margin: theme.spacing(1),
    },
    "& .MuiFormGroup-root": {
      flexDirection: "row",
    },
  },
  textField: {
    width: "25ch",
  },
  containerStyle: {
    padding: theme.spacing(1),
    marginTop: "1%",
    border: "4px solid #4db6ac",
    borderRadius: "5px",
  },
}));

const AddCheckList = (props) => {
  const [values, setValues] = useState(initialValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.checked });
  };

  useEffect(() => {
    setValues({
      ...values,
      watercraftId: sessionStorage.getItem("globalWatercraftId"),
    });
  }, []);

  const classes = useStyle();

  const buttonClicked = (event) => {
    if (values.watercraftId === null) {
      alert("Please Select Watercraft");
      return;
    }
    console.log(values);
    axios
      .post(
        "http://ec2-18-237-18-199.us-west-2.compute.amazonaws.com:8080/checkList/add",
        values
      )
      .then(function (response) {
        console.log(response);
        var arr = [];
        arr.push(response.data);
        props.parentCallBack(arr);
      });
    alert("check list added");
    setValues(initialValues);
  };

  return (
    <div>
      <form className={classes.root}>
        <Grid container className={classes.containerStyle}>
          <Grid item xs={4}>
            <TextField
              multiline
              variant="outlined"
              label="Enter Checklist Details"
              name="checkListName"
              value={values.checkListName}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={8}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.publish}
                  onChange={handleChange}
                  name="publish"
                  color="Secondary"
                />
              }
              label="Publish"
            />
          </Grid>

          <Grid item xs={4}>
            <FormLabel
              component="legend"
              style={{ margin: "8px", color: "black" }}
            >
              Type of Checklist :-{" "}
            </FormLabel>
          </Grid>

          <Grid item xs={8}>
            <RadioGroup
              aria-label="gender"
              name="stage"
              value={values.stage}
              onChange={handleInputChange}
            >
              <FormControlLabel
                value="Check On"
                control={<Radio />}
                label="Check On"
              />
              <FormControlLabel
                value="Check Off"
                control={<Radio />}
                label="Check Off"
              />
              <FormControlLabel
                value="General"
                control={<Radio />}
                label="General"
              />
            </RadioGroup>
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              style={{ width: "20%", marginTop: "1%", left: "35%" }}
              onClick={buttonClicked}
            >
              Add Checklist
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddCheckList;
