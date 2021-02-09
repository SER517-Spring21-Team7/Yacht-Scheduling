import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import './Watercrafts.css';

const useStyles = makeStyles({
    root: {  
        maxWidth: 345,
    },
    media: {  
        height: 100,
        width: 100,
    },
});


const Watercrafts = () => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardActionArea >
                <CardMedia
                    className={classes.media}
                    image="https://api1.nauticalmonkey.com/uploadedImages/ab68874bf7d941cb815e5ba28d0a7b07_small.jpg"
                    title="Boat"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Lizard
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Edit
            </Button>
                <Button size="small" color="primary">
                    Delete
                </Button>
            </CardActions>    
        </Card>
    )
}

export default Watercrafts
