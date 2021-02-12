import React from 'react'
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
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container direction="row" justify="space-between" alignItems="center">
                <Grid>
                    <Paper className={classes.paper}><Watercrafts/></Paper>
                </Grid> 
                <Grid>
                    <Paper className={classes.paper}><Watercrafts/></Paper>
                </Grid> 
                <Grid>
                    <Paper className={classes.paper}><Watercrafts/></Paper>
                </Grid> 
                <Grid>
                    <Paper className={classes.paper}><Watercrafts/></Paper>
                </Grid> 
            </Grid>
        </div>
    )
}

export default ListOfWaterCrafts
