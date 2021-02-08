import React, {useState} from 'react'
import * as FaIcons from 'react-icons/fa';
import {Link} from 'react-router-dom';
import * as AiIcons from 'react-icons/ai';
import {SidebarData} from './SidebarData';
import './Sidebar.css';
import { IconContext } from 'react-icons';



function ToolbarUI() {
    
    const [sidebar, setSidebar] = useState(false);
    const handleSidebar = () => setSidebar(!sidebar);

    return (
        <>
            <h1 style={{float:'right'}}>HEEEEEEE</h1>
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
        </>
    )
}

export default ToolbarUI
