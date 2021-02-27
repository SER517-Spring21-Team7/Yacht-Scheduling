import React, {useState} from 'react'
import {Link} from 'react-router-dom';
import {SidebarData} from './SidebarData';
import './Sidebar.css';
import { IconContext } from 'react-icons';
import { makeStyles, AppBar, Toolbar, Typography, Paper } from '@material-ui/core';
import tysLogo  from '../../tysLogo.png';



const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
  }));



function ToolbarUI() {

    // const [sidebar, setSidebar] = useState(false);
    // const handleSidebar = () => setSidebar(!sidebar);
    const classes = useStyles();

    return (
        <div style={{position:'static'}}>
            <div className={classes.root}>
                <AppBar position="fixed" style={{backgroundColor:'#8ad4eb'}} >
                    <Toolbar>
                            <img src={ tysLogo } alt='Logo' style={{
                                height: '20%',
                                width: '10%',
                                margin: '1%',
                            }}/>
                    </Toolbar>
                </AppBar>
            </div>
            <IconContext.Provider value={{ color: '#fff' }}>
                <nav className='nav-menu active'>
                    <ul className='nav-menu-items'>
                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </IconContext.Provider>
        </div>
    )
}

export default ToolbarUI
