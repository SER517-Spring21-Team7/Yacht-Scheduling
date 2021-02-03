import React, {useState} from 'react'
import { Grid, makeStyles, TextField, Select, InputLabel, MenuItem, FormControl } from '@material-ui/core'

const useStyle = makeStyles(theme =>({
    root: {
        '& .MuiFormControl-root':{
            width: '80%',
            margin:theme.spacing(3)
        },
    }
}))

const initialValues = {
    BName: '',
    year: '',
    description: '',
    class: '',
    builder: '',
    hull: '',
    lenght: '',
    category: '',
    model: '',
    fuel: '',
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


    return (
        <div>
          <form className={classes.root}>
            <Grid container>
                <Grid item xs={6}>
                    <TextField
                    variant="outlined"
                    label="Boat Name"
                    name="BName" 
                    value={values.name}
                    onChange = {handleInputChange}
                    />
                </Grid>
                
                <Grid item xs={6}>
                    <TextField
                        multiline
                        rowsMax={2}
                        label="Add Description"
                        name="description"
                        value={values.description}
                        onChange = {handleInputChange}
                        />
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={6}>
                    <FormControl variant="outlined">
                        <InputLabel>abc</InputLabel>
                        <Select
                            label="abc"
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
                            name="hull"
                            value={values.hull}
                            onChange={handleInputChange}
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value='Aluminium'>Aluminium</MenuItem>
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
            </Grid>
            <Grid container>
                <Grid item xs={6}>
                    <FormControl variant="outlined">
                        <InputLabel>Fuel Type</InputLabel>
                        <Select
                            label="Fuel Type"
                            name="fuel"
                            value={values.fuel}
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
            </Grid>
            <Grid container>
                <Grid item xs={2}>
                    
                </Grid>
                <Grid item xs={2}>
                    
                </Grid>
                <Grid item xs={2}>
                    
                </Grid>
            </Grid>
          </form>
        </div>
    )
}
