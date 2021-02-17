import React from 'react'
import 'date-fns';
import { Typography, Grid, TextField, FormControlLabel, Checkbox } from '@material-ui/core'
import { MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

export default function AddMember() {

    const [selectedDate, setSelectedDate] = React.useState(new Date('2021-02-17T21:11:54'));
    const handleDateChange = (date) => {
        setSelectedDate(date);
      };



    return (
        <>
            <Typography variant="h6" gutterBottom>
                Member Information
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="email"
                        name="email"
                        label="Email"
                        fullWidth
                        autoComplete="email-id"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    {/* For spacing only */}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="First name"
                        fullWidth
                        autoComplete="given-name"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="Last name"
                        fullWidth
                        autoComplete="family-name"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="password"
                        name="password"
                        label="Password"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="password2"
                        name="password2"
                        label="Re-enter Password"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                            <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="startdate"
                            label="Start Date"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        </Grid>
                    </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox color="secondary" name="member" value="yes" />}
                        label="Member"
                    />
                    <FormControlLabel
                        control={<Checkbox color="secondary" name="admin" value="yes" />}
                        label="Admin"
                    />
                </Grid>
            </Grid>  
        </>
    )
}
