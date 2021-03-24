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
    const urlAll = "http://localhost:8080/watercraft/getAllWaterCraft";
    const urlMember = "http://localhost:8080/watercraft/getWaterCraftByMemberId/"+sessionStorage.getItem("userId");
    const getWaterCraft = async () => { 
         var url = null;
        if(sessionStorage.getItem('role') === 'Admin') {
            url = urlAll;
        }
        else {
            url = urlMember;
        }
        const response = await axios.get(url);
        const watercrafts = response.data;
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
