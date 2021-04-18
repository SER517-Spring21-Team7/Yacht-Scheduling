import React from 'react'
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
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

const initialValues = {
    checkListName: "",
    stage: "Check On",
    publish:false
};
const AddCheckList = () => {
    const [values, setValues] = useState(initialValues);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
        ...values,
        [name]: value,
        });
    };
    return (
        <div>
            <FormControl component="fieldset">

                <FormLabel component="legend">Add new Checklist</FormLabel>
                <TextField
                    multiline
                    variant="outlined"
                    label="Enter Checklist Name"
                    rows={1}
                    columns={50}
                    name="checkListName"
                    value={values.checkListName}
                    onChange={handleInputChange}
                />

                <FormLabel component="legend">Type of Checklist</FormLabel>
                <RadioGroup aria-label="gender" name="stage" value={values.stage} onChange={handleInputChange}>
                    <FormControlLabel value="Check On" control={<Radio />} label="Check On" />
                    <FormControlLabel value="Check Off" control={<Radio />} label="Check Off" />
                    <FormControlLabel value="General" control={<Radio />} label="General" />
                </RadioGroup>

                <FormControlLabel
                    control={<Checkbox checked={values.publish} onChange={handleInputChange} name="publish" color="primary"/>}
                    label="Primary"
                />
            </FormControl>
        </div>
    )
}

export default AddCheckList
