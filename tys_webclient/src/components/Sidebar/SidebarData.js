import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as GiIcons from "react-icons/gi";

export const SidebarData = [
  {
    title: "Dashboard",
    path: "/listwatercraft",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  sessionStorage.getItem("role") === "Admin" &&
  {
  title: "Add Watercraft",
      path: "/watercrafts",
      icon: <GiIcons.GiSailboat />,
      cName: "nav-text",
  },
  // sessionStorage.getItem("role") === "Admin" &&
  {
    title: "Reserve Watercraft",
    path: "/reservation",
    icon: <AiIcons.AiOutlineSchedule />,
    cName: "nav-text",
    
  },
  {
    title: "View Member",
    path: "/viewmember",
    icon: <FaIcons.FaUsers />,
    cName: "nav-text",
  },
  sessionStorage.getItem("role") === "Admin" &&
  {
    title: "Enroll Member",
    path: "/member",
    icon: <AiIcons.AiOutlineUserAdd />,

    cName: "nav-text",
  },
  sessionStorage.getItem("role") === "Admin" &&
  {
    title: "Scheduler Settings",
    path: "/scheduler",
    icon: <FaIcons.FaCog />,
    cName: "nav-text",
  },
  // {
  //   title: "Service Request",
  //   path: "/service",
  //   icon: <FaIcons.FaTools />,
  //   cName: "nav-text",
  // },
  // {
  //   title: "Checklists",
  //   path: "/checklist",
  //   icon: <FaIcons.FaListAlt />,
  //   cName: "nav-text",
  // },
  {
    title: "My Account",
    path: "/MyAccount",
    icon: <FaIcons.FaRegUserCircle />,
    cName: "nav-text",
  },
  {
    title: "Emergency Contact",
    path: "/emergency",
    icon: <FaIcons.FaBriefcaseMedical />,
    cName: "nav-text",
  },
    sessionStorage.getItem("role") === "Admin" &&
  {
    title: "Add Alerts",
    path: "/displayAlert",
    icon: <FaIcons.FaBroadcastTower />,
    cName: "nav-text",
  },

  sessionStorage.getItem("role") === "Admin" &&
  {
    title: "Manage Alerts",
    path: "/manageAlert",
    icon: <FaIcons.FaBroadcastTower />,
    cName: "nav-text",
  },

  sessionStorage.getItem("role") === "Admin" &&
  {
    title: "Add CheckList",
    path: "/checkList",
    icon: <FaIcons.FaRegStickyNote />,
    cName: "nav-text",
  },
    sessionStorage.getItem("role") !== "Admin" &&
  {
    title: "Show CheckList",
    path: "/checklistView",
    icon: <FaIcons.FaRegStickyNote />,
    cName: "nav-text",
  },
    
];
