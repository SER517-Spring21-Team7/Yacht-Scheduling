import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as GiIcons from "react-icons/gi";


export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/listwatercraft',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Watercrafts',
    path: '/watercrafts',
    icon: <GiIcons.GiSailboat />,
    cName: 'nav-text'
  },
  {
    title: 'Service Request',
    path: '/service',
    icon: <FaIcons.FaTools />,
    cName: 'nav-text'
  },
  {
    title: 'Checklists',
    path: '/checklist',
    icon: <FaIcons.FaListAlt />,
    cName: 'nav-text'
  },
  {
    title: 'Messages',
    path: '/messages',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text'
  },
  {
    title: 'My Account',
    path: '/MyAccount',
    icon: <FaIcons.FaRegUserCircle />,
    cName: 'nav-text'
  }
];
