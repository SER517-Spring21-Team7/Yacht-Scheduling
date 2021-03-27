import React, { useState, useEffect} from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Box } from '@material-ui/core';
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
  paper1: {
    padding: theme.spacing(1),
    textAlign: 'center',
    backgroundColor: "#FFFF00",
    color: theme.palette.text.secondary,
  },
}));

const ListOfWaterCrafts = () => {

    const [watercrafts, setWatercrafts] = useState([]);

    const [alerts, setAlerts] = useState([]);
    const url = "http://localhost:8080/watercraft/getAllWaterCraft"
    var urlForAlert = "http://localhost:8080/displayAlert/get/"
    const urlAll = "http://localhost:8080/watercraft/getAllWaterCraft";
    const urlMember = "http://localhost:8080/watercraft/getWaterCraftByMemberId/" + sessionStorage.getItem("userId");
    
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
        urlForAlert = urlForAlert.concat(sessionStorage.getItem("userId"));
        
        const responseAlter = await axios.get(urlForAlert)
        setAlerts(responseAlter.data);
        console.log(alerts);
    }
    useEffect(() => { 
        getWaterCraft();
    },[])
    // console.log(craft);
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container direction="row" alignItems="left" justify="space-between">
                <Grid>
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
                <Grid className={classes.containerStyle}>
                    <Typography style={{margin:'5%', width:"30%"}}>
                        <Box fontWeight="fontWeightBold" fontSize={20} textAlign="left" m={1}>
                            <h2>Alerts</h2>
                        </Box>
                    </Typography>
                {
                    alerts.map((singleCraft) => {
                            return <Grid key={singleCraft.id}>
                                <Paper className={classes.paper1}>
                                    {singleCraft.text}
                                </Paper>
                        </Grid> 
                    })
                }
                </Grid>
            </Grid>
            
            
        </div>
    )
}

export default ListOfWaterCrafts
