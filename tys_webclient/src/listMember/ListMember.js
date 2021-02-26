import React from 'react'
import Member from './Member'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

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

const ListMember = () => {
    return (
        <div className={useStyles.root}>
            <Grid container direction="row" alignItems="center">
                <Member></Member>
                <Member></Member>
                <Member></Member>
                <Member></Member>
                <Member></Member>
                <Member></Member>
            </Grid>
        </div>
    )
}

export default ListMember
