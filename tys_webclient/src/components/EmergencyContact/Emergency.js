import React from 'react'
import {
    Typography,
    Grid,
    makeStyles,
    Box,
  } from "@material-ui/core";
import * as FaIcons from "react-icons/fa";



const useStyle = makeStyles((theme) => ({
    root: {

    },
    iconStyle: {
        marginTop: "5%",
        height: "5vh",
        fontSize: "2rem",
        color: "white",
        textAlign: "center",
        paddingTop: "1%"
    },
    infoStyle: {
        marginTop: "5%",
        height: "5vh",
        color: "white",
        textAlign: "center"
    }
}));

function Emergency() {
    const classes = useStyle();
    return (
        <>
            <div className={classes.root}>
                <Typography>
                    <Box
                    fontWeight="fontWeightBold"
                    fontSize={20}
                    textAlign="center"
                    m={1}
                    >
                    Contact Information
                    </Box>
                </Typography>
            </div>
            <Grid container className={classes.containerStyle}>
                <Grid item xs={12} sm={4} style={{backgroundColor: "#08b9ca", height: "25vh"}}>
                    <div className={classes.iconStyle}>
                        <FaIcons.FaEnvelopeOpen/>
                    </div>
                    <div className={classes.infoStyle}>
                        <h2>Development Team</h2>
                    </div>
                    <div className={classes.infoStyle}>
                        <h3>info@theyachtsolution.com</h3>
                    </div>
                </Grid>
                <Grid item xs={12} sm={4} style={{backgroundColor: "#ff9d00", height: "25vh"}}>
                    <div className={classes.iconStyle}>
                        <FaIcons.FaPhoneAlt/>
                    </div>
                    <div className={classes.infoStyle}>
                        <h2>The Yacht Solution</h2>
                    </div>
                    <div className={classes.infoStyle}>
                        <h3>+1 (416) 907 - 9046</h3>
                    </div>
                </Grid>
                <Grid item xs={12} sm={4} style={{backgroundColor: "#ec3d45", height: "25vh"}}>
                <div className={classes.iconStyle}>
                        <FaIcons.FaHeartbeat/>
                    </div>
                    <div className={classes.infoStyle}>
                        <h2>SOS</h2>
                    </div>
                    <div className={classes.infoStyle}>
                        <h3>Please Contact 911</h3>
                    </div>
                </Grid>
            </Grid>
        </>
    )
}

export default Emergency
