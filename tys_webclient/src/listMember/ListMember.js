import React, { useState, useEffect} from 'react'
import Member from './Member'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

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
    const [members, setMembers] = useState([]);
    const url = "http://localhost:8080/member/getAllMember"
    const getAllMember = async () => { 
        const response = await fetch(url, {
            method: "GET"
        });
        const members = await response.json();
        console.log(members);
        setMembers(members);
    }
        
    useEffect(() => { 
        getAllMember();
    }, [])
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container direction="row" alignItems="center">
            {
                members.map((singleMember) => {
                    console.log(singleMember.memberId);
                    const { memberId, model } = singleMember
                    return <Grid key={memberId}>
                        <Member name={singleMember}
                            memberId={memberId} parentState={members} parentState1={setMembers}
                            />
                    </Grid>
                })
            }
            </Grid>
        </div>
    )
}

export default ListMember