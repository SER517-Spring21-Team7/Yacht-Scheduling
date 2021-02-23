import React, {useState} from 'react'
import 'date-fns';
import { Typography, Grid, makeStyles, Box, TextField, FormControlLabel, FormControl, FormLabel, RadioGroup, Radio, Button } from '@material-ui/core'
import { MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ColorPicker from "material-ui-color-picker";
import SearchMember from './SearchMember'


const initialValues = {
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    password2: '',
    startdate: new Date(),
    enddate: new Date().setMonth(new Date().getMonth()+1),
    premiumshare: '',
    standardshare: '',
    freebookings: '',
    schedulercolor: '',
    access: '',

}
const useStyle = makeStyles(theme =>({
    root: {
        width: "80%",
        marginTop: theme.spacing(5),
        marginLeft: theme.spacing(15),
        '& .MuiFormControl-root':{
            width: '70%',
            margin:theme.spacing(1.5)
        },
        '& .MuiButtonBase-root':{
            marginLeft: '38%',
        }
    },
    containerStyle:{
        backgroundColor: '#f5f5f5',
        width: '100%',
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(0),
    },
    
}))

export default function AddMember() {

    const classes = useStyle();
    const [values, setValues] = useState(initialValues);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]:value
        })
    }

    const handleStartDateChange = (e) => {
        setValues({
            ...values,
            startdate: new Date(e)
        })
    }

    const handleEndDateChange = (e) => {
        if(values.startdate < e) {
            setValues({
                ...values,
                enddate: new Date(e)
            })
        }
    }

    const handleColorChange = (e) => {
        setValues({
            ...values,
            schedulercolor: e
        })
    }

    const buttonClicked = (event) => {
        console.log(values)
    };

    return (
        <>
        <form className={classes.root}>
        
            <Typography style={{margin:'5%'}}>
                <Box fontWeight="fontWeightBold" fontSize={20} textAlign="left" m={1}>
                    <h2>Search Existing Member or Enter Details</h2>
                </Box>
            </Typography>
            <div><SearchMember/></div>
            <Grid container className={classes.containerStyle}>
                <Grid item xs={12} sm={6}>
                    <TextField
                    variant="outlined"
                    required
                    id="email"
                    type="text"
                    name="email"
                    label="Email"
                    value={values.email}
                    onChange={handleInputChange}
                    fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    {/* For wqatercraft dropdown */}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    variant="outlined"
                    required
                    id="firstname"
                    name="firstname"
                    label="First Name"
                    value={values.firstname}
                    onChange={handleInputChange}
                    fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    variant="outlined"
                    required
                    id="lastname"
                    name="lastname"
                    label="Last Name"
                    value={values.lastname}
                    onChange={handleInputChange}
                    fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    variant="outlined"
                    required
                    type="password"
                    id="password"
                    name="password"
                    label="Password"
                    value={values.password}
                    onChange={handleInputChange}
                    fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    variant="outlined"
                    required
                    id="password2"
                    name="password2"
                    label="Re-enter Password"
                    value={values.password2}
                    onChange={handleInputChange}
                    fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={9}>
                    {/* Alignment only */}
                </Grid>
    
                <Grid item xs={12} sm={6}>
                    <TextField
                    variant="outlined"
                    required
                    type="number"
                    id="premiumshare"
                    name="premiumshare"
                    label="Premium Share (%)"
                    value={values.premiumshare}
                    onChange={handleInputChange}
                    fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    variant="outlined"
                    required
                    type="number"
                    id="standardshare"
                    name="standardshare"
                    label="Standard Share (%)"
                    value={values.standardshare}
                    onChange={handleInputChange}
                    fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    variant="outlined"
                    required
                    type="number"
                    id="freebookings"
                    name="freebookings"
                    label="Free booking per month"
                    value={values.freebookings}
                    onChange={handleInputChange}
                    fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                            <KeyboardDatePicker
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="startdate"
                            name="startdate"
                            label="Start Date"
                            value={values.startdate}
                            onChange={handleStartDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        </Grid>
                    </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                            <KeyboardDatePicker
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="enddate"
                            name="enddate"
                            label="End Date"
                            value={values.enddate}
                            onChange={handleEndDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        </Grid>
                    </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <div style={{display:'flex'}}>
                        <label style={{padding:'5%', display:'inline'}}>Color</label>
                        <ColorPicker
                            name="color"
                            defaultValue="Select Scheduler Color"
                            style={{backgroundColor:values.schedulercolor, borderRadius:'5px'}}
                            onChange={handleColorChange}
                            value={values.schedulercolor}
                        />
                    </div>
                </Grid>
                <Grid item xs={12} sm={2}>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl component="fieldset">
                        <RadioGroup aria-label="access" name="access" value={values.access} onChange={handleInputChange} row>
                            <FormControlLabel value="Admin" control={<Radio />} label="Admin" />
                            <FormControlLabel value="Member" control={<Radio />} label="Member" checked/>
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>  
            <Button 
                size="large" 
                variant="contained" 
                color="secondary"
                style={{width:'20%', marginTop:'2.5%', paddingLeft: '0px'}}
                onClick={buttonClicked}>
                Add Member
            </Button>
        </form>
        </>
    )
}
