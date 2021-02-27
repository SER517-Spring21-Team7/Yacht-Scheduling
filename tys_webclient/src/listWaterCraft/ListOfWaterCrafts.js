import React, { useState, useEffect} from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Watercrafts from './Watercrafts'

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
    const getWaterCraft = async () => { 
        const response = await fetch(url, {
            method: "GET"
        });
        const watercrafts = await response.json();
        console.log(watercrafts);
        setWatercrafts(watercrafts);
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
                    console.log(singleCraft.watercraftId);
                    const {watercraftId, model } = singleCraft
                    return <Grid key={watercraftId }>
                        <Paper className={classes.paper}><Watercrafts name={model}
                            watercraftId={watercraftId} parentState={watercrafts} parentState1={ setWatercrafts}/>
                        </Paper>
                    </Grid> 
                })
            }
            </Grid>
        </div>
    )
}

export default ListOfWaterCrafts
