import React, {useState} from 'react'
import { Grid, makeStyles, TextField, Select, InputLabel, MenuItem, FormControl, InputAdornment, Button } from '@material-ui/core'
import clsx from 'clsx';

const useStyle = makeStyles(theme =>({
    root: {
        '& .MuiFormControl-root':{
            width: '80%',
            margin:theme.spacing(2)
        }
    },
    margin: {
        margin: theme.spacing(1),
      },
    textField: {
        width: '25ch',
    },
    containerStyle:{
        backgroundColor: '#f5f5f5',
        width: '90%',
        marginLeft: '5%',
        marginTop: theme.spacing(4)
    }
}))

const initialValues = {
    watercraftName: '',
    makeYear: '',
    description: '',
    class: '',
    builder: '',
    hullType: '',
    length: '',
    category: '',
    model: '',
    fuelType: ''
}


export default function AddWatercraft() {

const [values, setValues] = useState(initialValues);

const classes = useStyle();

const handleInputChange = e => {
    const{name, value} = e.target
    setValues({
        ...values,
        [name]:value
    })
}
const buttonClicked = (event) => {
    return fetch("http://localhost:8080/watercraft/details",{
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ...values,
        }),
    })
    .then((response) => response.json())
    .then((json) =>{
        alert("Watercraft successfully added!")
        setValues(initialValues);
    })
    .catch((error)=>{
        alert("It seems we have some issue! Please retry.")
    });
    
};

const yearOptions = [];
const minOffset = 0;
const maxOffset = 30;
const thisYear = (new Date()).getFullYear();
for (let i = minOffset; i <= maxOffset; i++) {
    const year = thisYear - i;
    yearOptions.push(<option value={year} key={i}>{year}</option>);
  }


    return (
        <div>
          <form className={classes.root}>
            <Grid container className={classes.containerStyle}>
                <Grid item xs={6}>
                    <TextField
                    variant="outlined"
                    label="Boat Name"
                    name="watercraftName" 
                    value={values.watercraftName}
                    onChange = {handleInputChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    {/* Blank grid */}
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        multiline
                        variant="outlined"
                        rows={6}
                        label="Add Description"
                        name="description"
                        value={values.description}
                        onChange = {handleInputChange}
                        />
                </Grid>
                <Grid item xs={6}>
                    {/* Blank grid */}
                </Grid>
                <Grid item xs={6}>
                    <FormControl variant="outlined">
                        <InputLabel>Class</InputLabel>
                        <Select
                            label="Class"
                            name="class"
                            value={values.class}
                            onChange={handleInputChange}
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value='PowerBoats'>Power Boats</MenuItem>
                        <MenuItem value='SailBoats'>Sail Boats</MenuItem>
                        <MenuItem value='PWCs'>PWCs</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl variant="outlined">
                        <InputLabel>Hull Type</InputLabel>
                        <Select
                            label="Hull Type"
                            name="hullType"
                            value={values.hullType}
                            onChange={handleInputChange}
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={"Aluminium"}>Aluminium</MenuItem>
                        <MenuItem value={"FerroCement"}>Ferro-Cement</MenuItem>
                        <MenuItem value={'FiberglassReinforced'}>Fiberglass Reinforced</MenuItem>
                        <MenuItem value={'Fiberglass/Composite'}>Fiberglass/Composite</MenuItem>
                        <MenuItem value={'Inflatable'}>Inflatable</MenuItem>
                        <MenuItem value={'Other/NA'}>Other/NA</MenuItem>
                        <MenuItem value={'Plastic'}>Plastic</MenuItem>
                        <MenuItem value={'Rigid Inflatable'}>Rigid Inflatable</MenuItem>
                        <MenuItem value={'Steel'}>Steel</MenuItem>
                        <MenuItem value={'Wood'}>Wood</MenuItem>
                        <MenuItem value={'Unknown'}>Unknown</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl variant="outlined">
                        <InputLabel>Fuel Type</InputLabel>
                        <Select
                            label="Fuel Type"
                            name="fuelType"
                            value={values.fuelType}
                            onChange={handleInputChange}
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={'Diesel'}>Diesel</MenuItem>
                        <MenuItem value={'Electric'}>Electric</MenuItem>
                        <MenuItem value={'gas'}>Gas</MenuItem>
                        <MenuItem value={'other'}>Other</MenuItem>
                        <MenuItem value={'Unknown'}>Unknown</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl variant="outlined">
                        <InputLabel>Category</InputLabel>
                        <Select
                            label="Category"
                            name="category"
                            value={values.category}
                            onChange={handleInputChange}
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={'Unknown'}>Unknown</MenuItem>
                        <MenuItem value={'Catamaran'}>Catamaran (Sail)</MenuItem>
                        <MenuItem value={'Classic'}>Classic (Sail)</MenuItem>
                        <MenuItem value={'Cruiser'}>Cruiser (Sail)</MenuItem>
                        <MenuItem value={'Cruiser/Racer'}>Cruiser/Racer</MenuItem>
                        <MenuItem value={'Cutter'}>Cutter</MenuItem>
                        <MenuItem value={'Daysailor/Weekender'}>Daysailor/Weekender</MenuItem>
                        <MenuItem value={'Ketch'}>Ketch</MenuItem>
                        <MenuItem value={'Motorsailer'}>Motorsailer</MenuItem>
                        <MenuItem value={'Multi-Hull'}>Multi-Hull</MenuItem>
                        <MenuItem value={'Racer'}>Racer</MenuItem>
                        <MenuItem value={'Yawl'}>Yawl</MenuItem>
                        <MenuItem value={'Other'}>Other</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                    variant="outlined"
                    label="Model"
                    name="model" 
                    value={values.model}
                    onChange = {handleInputChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                    variant="outlined"
                    label="Builder"
                    name="builder" 
                    value={values.builder}
                    onChange = {handleInputChange}
                    />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        label="Length"
                        id="outlined-start-adornment"
                        name='length'
                        value={values.length}
                        onChange={handleInputChange}
                        className={clsx(classes.margin, classes.textField)}
                        InputProps={{
                        endAdornment: <InputAdornment position="end">ft.</InputAdornment>,
                        }}
                        variant="outlined"
                        style={{marginLeft:'30%'}}
                    />
                </Grid>
                <Grid item xs={3}>
                    <FormControl variant="outlined">
                        <InputLabel>Make Year</InputLabel>
                        <Select
                            label="Make Year"
                            name="makeYear"
                            value={values.makeYear}
                            onChange={handleInputChange}>
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {/* <MenuItem value={yearOptions}><em>{yearOptions}</em></MenuItem> */}
                            {yearOptions}
                            {yearOptions.map((year, index) => <MenuItem key={index} value={year}/>)}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Button 
                size="large" 
                variant="contained" 
                color="secondary"
                style={{width:'20%', marginTop:'5%'}}
                onClick={buttonClicked}
                >
                Add
            </Button>
          </form>
        </div>
    )
}
