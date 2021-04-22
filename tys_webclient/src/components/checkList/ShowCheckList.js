import { makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { useStyles } from '@material-ui/pickers/views/Calendar/SlideTransition';
import axios from 'axios';
import React from 'react';
import { useState, useEffect } from "react";

const useStyle = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    containerStyle: {
        padding: theme.spacing(1),
        marginTop: "1%",
        border: "4px solid #4db6ac",
        borderRadius: '5px'
    },
}));
const ShowCheckList = (props) => {

    const classes = useStyles();
    const [checkLists, setcheckLists] = useState([]);

    const getChecklist = async () => {
        var watercraftId = sessionStorage.getItem('globalWatercraftId');
        if (watercraftId === null) {
            alert("Please select watercraft");
            return;
        }
        var url = "http://localhost:8080/checkList/get/";
        url += watercraftId;
        const response = await axios.get(url);
        const checkList = response.data;
        props.parentCallBack(checkList);
    };

    useEffect(() => {
        getChecklist();
        
    }, []);

    return (
        <div style={{ border: "4px solid #4db6ac", marginTop: "1%", borderRadius: '5px'}}>
        <TableContainer component={Paper} >
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Check List Details</TableCell>
                <TableCell align="right">Stage</TableCell>
                <TableCell align="right">Publish&nbsp;</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {props.data.listOfCheckList.map((checkList) => (
                <TableRow key={checkList.id}>
                <TableCell component="th" scope="row">
                    {checkList.id}
                </TableCell>
                <TableCell align="right">{checkList.checkListName}</TableCell>
                <TableCell align="right">{checkList.stage}</TableCell>
                <TableCell align="right">{checkList.publish+""}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        </div>
    )
}

export default ShowCheckList
