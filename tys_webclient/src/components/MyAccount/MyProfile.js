import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  makeStyles,
  Box,
  Typography,
  Button,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import * as FaIcons from "react-icons/fa";
import S3 from "react-aws-s3";
import imageCompression from "browser-image-compression";
import axios from "axios";

const config = {
  bucketName: "tys-user-image",
  region: "us-west-2",
  accessKeyId: "AKIAVM6FVNOGNDLX6DEY",
  secretAccessKey: "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",
};

const timezoneArr = [
  "Australia/ACT",
  "Australia/Adelaide",
  "Australia/Brisbane",
  "Australia/Broken_Hill",
  "Australia/Canberra",
  "Australia/Currie",
  "Australia/Darwin",
  "Australia/Eucla",
  "Australia/Hobart",
  "Australia/LHI",
  "Australia/Lindeman",
  "Australia/Lord_Howe",
  "Australia/Melbourne",
  "Australia/NSW",
  "Australia/North",
  "Australia/Perth",
  "Australia/Queensland",
  "Australia/South",
  "Australia/Sydney",
  "Australia/Tasmania",
  "Australia/Victoria",
  "Australia/West",
  "Australia/Yancowinna",
  "Canada/Atlantic",
  "Canada/Central",
  "Canada/Eastern",
  "Canada/Mountain",
  "Canada/Newfoundland",
  "Canada/Pacific",
  "Canada/Saskatchewan",
  "Canada/Yukon",
  "Etc/UTC",
  "Europe/London",
  "US/Alaska",
  "US/Aleutian",
  "US/Arizona",
  "US/Central",
  "US/East-Indiana",
  "US/Eastern",
  "US/Hawaii",
  "US/Indiana-Starke",
  "US/Michigan",
  "US/Mountain",
  "US/Pacific",
  "US/Pacific-New",
];

const useStyle = makeStyles((theme) => ({
  root: {

    "& .MuiFormControl-root": {
      marginLeft: theme.spacing(10),
      width: "60%",
      margin: theme.spacing(1),
    },
    "& .MuiButtonBase-root": {
      marginLeft: "38%",
    },
  },
  buttonStyle: {
    marginLeft: "38%",
  },
  container: {
    padding: theme.spacing(1),
    marginTop: "1%",
    border: "4px solid #4db6ac",
    borderRadius: '5px'
  },
  button: {
    margin: theme.spacing(2),
  },
  customFileUpload: {
    display: "inlineBlock",
    cursor: "pointer",
    padding: "1px 30px",
    border: "1px solid #ccc",
  },
  large: {
    // marginTop: theme.spacing(2),
    // marginLeft: theme.spacing(3),
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  typo: {
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(3),
    color: "#90caf9",
  },
  profilePicture: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
    alignItems: "center",
  },
}));

const initialValues = {
  firstName: "",
  lastName: "",
  mobile: "",
  alternateMobile: "",
  timezone: "",
  country: "",
  address_1: "",
  address_2: "",
  city: "",
  state: "",
  zipCode: "",
  image: "",
};

export default function MyProfile() {
  const [values, setValues] = useState(initialValues);
  const classes = useStyle();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleImageInput = (e) => {
    let imageFile = e.target.files[0];
    let options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    imageCompression(imageFile, options)
      .then(function (compressedFile) {
        let file = new File([compressedFile], "file1.png", {
          type: "image/jpg",
        });
        return file;
      })
      .then((fileToUpload) => {
        const ReactS3Client = new S3(config);
        ReactS3Client.uploadFile(fileToUpload)
          .then((data) => {
            console.log(data.location);
            return data.location;
          })
          .then((url) => {
            setValues({
              ...values,
              image: url,
            });
          })
          .catch((err) => console.error(err));
      });
  };

  useEffect((values) => {
    // fetch("http://localhost:8080/user/3/profile", {
    //   method: "GET",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    // })
    const url =
      "http://localhost:8080/userprofile/" + sessionStorage.getItem("userId");

    axios.get(url).then((resp) => {
      console.log(resp);
      setValues({
        ...values,
        firstName: resp.data.firstName,
        lastName: resp.data.lastName,
        mobile: resp.data.mobile,
        alternateMobile: resp.data.alternateMobile,
        timezone: resp.data.timezone,
        country: resp.data.country,
        address_1: resp.data.address_1,
        address_2: resp.data.address_2,
        image: resp.data.image,
        city: resp.data.city,
        state: resp.data.state,
        zipCode: resp.data.zipCode,
      });
    });
  }, []);

  const saveChanges = () => {
    return fetch(
      "http://localhost:8080/user/profile/" + sessionStorage.getItem("userId"),
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
        }),
      }
    )
      .then((response) => response.json())
      .then((json) => {
        console.log("User profile updated.");
      })
      .catch((error) => {
        console.error("User profile update failed.");
      });
  };

  return (
    <>
      <form className={classes.root}>
        <Typography>
          <Box fontSize={20} textAlign="center">
            View and Update Personal Information
          </Box>
        </Typography>
        <Grid container className={classes.container}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              variant="outlined"
              label="First Name"
              name="firstName"
              value={values.firstName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              variant="outlined"
              label="Last Name"
              name="lastName"
              value={values.lastName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              variant="outlined"
              label="Mobile"
              name="mobile"
              type="number"
              helperText="only digits (no symbol, no dash and no space)"
              value={values.mobile}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              label="Alternate Mobile"
              name="alternateMobile"
              type="number"
              helperText="only digits (no symbol, no dash and no space)"
              value={values.alternateMobile}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" required>
              <InputLabel>Timezone</InputLabel>
              <Select
                label="Timezone"
                name="timezone"
                value={values.timezone}
                onChange={handleInputChange}
              >
                <MenuItem value="">None</MenuItem>
                {timezoneArr.map((tz) => {
                  return (
                    <MenuItem key={tz} value={tz}>
                      {tz}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" required>
              <InputLabel>Country</InputLabel>
              <Select
                label="Country"
                name="country"
                value={values.country}
                onChange={handleInputChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Australia"}>Australia</MenuItem>
                <MenuItem value={"Canada"}>Canada</MenuItem>
                <MenuItem value={"United Kingdom"}>United Kingdom</MenuItem>
                <MenuItem value={"United States"}>United States</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              variant="outlined"
              label="Address (Line 1)"
              name="address_1"
              value={values.address_1}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              label="Address (Line 2)"
              name="address_2"
              value={values.address_2}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            id="fileUpload"
            type="file"
            onChange={handleImageInput}
          />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              variant="outlined"
              label="City"
              name="city"
              value={values.city}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              variant="outlined"
              label="State/Province"
              name="state"
              value={values.state}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              variant="outlined"
              label="Zip/Postal Code"
              name="zipCode"
              value={values.zipCode}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
      </form>
      <div className={classes.buttonStyle}>
        <Button
          variant="contained"
          color="primary"
          size="medium"
          className={classes.button}
          startIcon={<SaveIcon />}
          onClick={saveChanges}
        >
          Save Changes
        </Button>
      </div>
    </>
  );
}
