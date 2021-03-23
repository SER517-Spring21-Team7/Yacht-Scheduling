import { useState } from "react";
import { TextField } from '@material-ui/core'
import React from 'react'

const DisplayAlert = () => {

    const [values, setValues] = useState();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    return (
        <div>
            <TextField
              multiline
              variant="outlined"
              label="Add Description"
              rows={6}
              columns={300}
              name="description"
              value={values.description}
              onChange={handleInputChange}
            />
        </div>
    )
}

export default DisplayAlert
