import React, { useState, useEffect} from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Watercrafts from './Watercrafts';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const ListOfWaterCrafts = () => {

    const [watercrafts, setWatercrafts] = useState([]);
    const url = "http://localhost:8080/watercraft/getAllWaterCraft"
    var urlForAlert = "http://localhost:8080/displayAlert/get/"
    const getWaterCraft = async () => { 

        const response = await axios.get(url)
        const watercrafts = response.data;
        console.log(watercrafts);
        setWatercrafts(watercrafts);
        urlForAlert = urlForAlert.concat(sessionStorage.getItem("userId"));
        
        const responseAlter = await axios.get(urlForAlert)
        console.log(responseAlter);
    }
    useEffect(() => { 
        getWaterCraft();
    },[])
    // console.log(craft);
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container direction="row" alignItems="center">
            {
                watercrafts.map((singleCraft) => {
                        return <Grid key={singleCraft.watercraftId}>
                            <Paper className={classes.paper}><Watercrafts {...singleCraft}
                                parentState={watercrafts} parentState1={ setWatercrafts}/>
                            </Paper>
                    </Grid> 
                })
            }
            </Grid>
        </div>
    )
}

export default ListOfWaterCrafts
