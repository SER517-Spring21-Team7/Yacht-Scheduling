import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        width: 345,
        height:600
  },
  media: {  
        height: 50,
        width: 50,
    },
  
});

const Member = () => {

    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    var pix = '7px';
    const section = {
        marginTop: pix,
        marginLeft: pix,
        marginRight: pix,
        marginBotton: pix,
    };
    return (
        <>
            <Card className={classes.root} style={ section}>
                <Grid container direction="row" style={ section}>
                    <Grid container spacing={2} style={{ height: "25%" }}  >
                        <Grid item xs={ 4} spacing={2}>
                            <CardMedia
                                className={classes.media}
                                image="https://api1.nauticalmonkey.com/uploadedImages/ab68874bf7d941cb815e5ba28d0a7b07_small.jpg"
                                title="Boat"
                                alignItem='center'
                            />
                        </Grid>
                        <Grid item xs={ 8} spacing={2}>
                           <Typography gutterBottom variant="h5" component="h2">
                                Namee
                            </Typography> 
                            <Typography variant="h6" gutterBottom>
                                Premium & Standard
                            </Typography> 
                        </Grid>
                    </Grid>
                    
                    <Grid container spacing={2} style={{ height: "65%" }} >
                        <Grid item xs={12}>
                            <Typography variant="body1" gutterBottom style={{ whiteSpace: 'pre-line' }}>
                                email:sshah73@asu.edu
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1" gutterBottom style={{ whiteSpace: 'pre-line' }}>
                                Access dates: 10/17
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1" gutterBottom style={{ whiteSpace: 'pre-line' }}>
                                Premium slot
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1" gutterBottom style={{ whiteSpace: 'pre-line' }}>
                                Standard slot
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1" gutterBottom style={{ whiteSpace: 'pre-line' }}>
                                Limited to 0 FREE bookings per month.
                            </Typography>
                        </Grid>
                        
                    </Grid>

                    <Grid container spacing={2}  style={{ height: "15%" }}>
                        <Button size="small" color="primary" >
                            Edit
                        </Button>
                        <Button size="small" color="primary" >
                            Delete Member
                        </Button>
                    </Grid>
                </Grid>
                
            </Card>
        </>
    )
}

export default Member
