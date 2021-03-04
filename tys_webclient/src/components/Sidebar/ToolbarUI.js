import React, {useState} from 'react'
import {NavLink, Link} from 'react-router-dom';
import {SidebarData} from './SidebarData';
import './Sidebar.css';
import { IconContext } from 'react-icons';
import { makeStyles, AppBar, Toolbar} from '@material-ui/core';
import tysLogo  from '../../tysLogo.png';

import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";



const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    itemTitle:{
        marginLeft: '10%'
    },
  }));



function ToolbarUI(props) {

    const [sidebar, setSidebar] = useState(true);
    const showSidebar = () => {
        setSidebar(!sidebar)
        props.passChildData(!sidebar);
    };
    
    const classes = useStyles();

    return (
        <>
            {/* <div className={classes.root}>
                <AppBar position="fixed" style={{backgroundColor:'#8ad4eb'}} >
                    <Toolbar>
                            <img src={ tysLogo } alt='Logo' style={{
                                height: '20%',
                                width: '10%',
                                margin: '1%',
                            }}/>
                    </Toolbar>
                </AppBar>
            </div> */}
            <IconContext.Provider value={{ color: '#fff' }}>
                <div className='navbar'>
                    <Link to='#' className='menu-bars'>
                        <FaIcons.FaBars onClick={showSidebar} />
                    </Link>
                    <img src={ tysLogo } alt='Logo' style={{
                            height: '7vh',
                            width: '15vw',
                            // margin: '1%',
                            zIndex: '1',
                            borderRadius:'5px'
                        }}
                    />
                </div>
            
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items'>
                        <li className='navbar-toggle' onClick={showSidebar}>
                            <Link to='#' className='menu-bars'>
                                <FaIcons.FaArrowLeft/>
                            </Link>
                        </li>
                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <NavLink to={item.path} activeClassName="activeLink">
                                        {item.icon}
                                        <span className={classes.itemTitle}>{item.title}</span>
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    );
}

export default ToolbarUI
