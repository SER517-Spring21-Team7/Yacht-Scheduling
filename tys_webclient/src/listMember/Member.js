import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
        width: 345,
      height:300
  },
  
});

const Member = () => {

    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    
    return (
        <>
            <Card className={classes.root}>
                <div style={{ flexDirection: 'column' }}>
                    <div style={{display: 'flex', flexDirection: 'row', "height":"30%"}}>
                        <div style={{display: 'flex', "height":"50%"}}>hiiiiiiiiiiiiii1</div>
                        <div style={{display: 'flex', "height":"50%"}}>hiiiiiiiiiiiii2</div>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', "height":"60%"}}>
                        byeeeeeeeeeeeee
                         byeeeeeeeeeeeee
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row', "height":"10%"}}>
                        <div>bye11111</div>
                        <div>bye11111111</div>
                    </div>
                </div>
        </Card>
        </>
    )
}

export default Member
