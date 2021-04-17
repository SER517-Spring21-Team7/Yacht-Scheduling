import React, {useEffect} from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import { Grid } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import { List, Box } from "@material-ui/core/";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import tysLogo from "../../tysLogo.png";
import ListOfWaterCrafts from "../../listWaterCraft/ListOfWaterCrafts";
import AddMember from "../AddMember/AddMember";
import AddWatercraft from "../AddWatercraftComponent/AddWatercraft";
import MyAccount from "../MyAccount/MyAccount";
import { EditWatercraft } from "../../editWaterCraft/EditWatercraft";
import SchedulerSetting from "../SchedulerSettings/SchedulerSetting";
import ListMember from "../../listMember/ListMember";
import HolidayCalendar from "../SchedulerSettings/HolidayCalendar";
import { SidebarData } from "../Sidebar/SidebarData";
import ToolbarSearch from "./ToolbarSearch";
import GlobalContext from "./../GlobalContext";
import Emergency from "./../EmergencyContact/Emergency";
import DisplayAlert from "../../displayAlert/DisplayAlert";
import WatercraftSchedulerUI from './../WatercraftScheduler/WatercraftSchedulerUI'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  userWelcome:{
    display:'inlineflex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  search: {
    padding: theme.spacing(0, 2),
  },

}));

var loggedMember = ''
var loggedMemberImage = ''

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [selectedWatercraft, setSelectedWatercraft] = React.useState(0);
  const [getMemberName, setMember] = React.useState(loggedMember);
  const [getMemberImage, setMemberImage] = React.useState(loggedMemberImage);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleGlobalWatercraft = (watercraftId) => {
    setSelectedWatercraft(watercraftId);
    sessionStorage.setItem("globalWatercraftId", watercraftId);
    window.location.reload();
    console.log("Sidebar watercraft id::" + watercraftId);
  };

  const logout = () => {
    sessionStorage.clear();
    window.location.href = '/';
  }

  const loggedInMember = () => {
    const url = "http://localhost:8080/userprofile/"+sessionStorage.getItem("userId");
    axios.get(url).then(res => {
      setMember(res.data.firstName)
      setMemberImage(res.data.image)
    }, error => {
      alert("Unable to fetch member details. Please try again later!");
    });
  }

  useEffect(() => { 
    loggedInMember();
  },[])

  return (
    <GlobalContext.Provider value={selectedWatercraft}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          style={{ backgroundColor: "#4db6ac" }}
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <Grid alignItems={"center"} container>
              <Grid item xs="auto" sm="auto">
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  className={clsx(classes.menuButton, {
                    [classes.hide]: open,
                  })}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
              <Grid item xs={1} sm={4}>
                <img
                  src={tysLogo}
                  alt="Logo"
                  style={{
                    height: "7vh",
                    width: "15vw",
                    // margin: '1%',
                    zIndex: "1",
                    borderRadius: "5px",
                  }}
                />
              </Grid>

              <Grid item xs={4}>
                <ToolbarSearch parentCallback={handleGlobalWatercraft} />
              </Grid>

              <Grid item xs="auto">
                <Avatar alt="Test" src={getMemberImage}/>
              </Grid>

              <Grid item xs={3}>
                <h3 style={{marginLeft:'2%'}}>Welcome, {getMemberName}!</h3>
              </Grid>
            </Grid>
              <Grid item xs="auto" align="center">
                <IconButton
                  color="inherit"
                  aria-label="logout"
                  onClick={logout}
                  style={{
                    width: "20px",
                    height: "20px"
                  }}
                  >
                  <ExitToAppIcon />
                </IconButton>
                <p>Logout</p>
              </Grid>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <Typography>
              <Box
                fontWeight="fontWeightBold"
                fontSize={20}
                textAlign="left"
                paddingRight="2vw"
                m={2}
              >
                Menu
              </Box>
            </Typography>
            <IconButton
              onClick={handleDrawerClose}
              style={{ backgroundColor: "#e0f2f1" }}
            >
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List style={{ fontSize: "1.8rem", backgroundColor: "#e0f2f1" }}>
            {SidebarData.map((text, index) => (
              text &&
              <ListItem button key={text.title} component={Link} to={text.path}>
                <ListItemIcon>{text.icon}</ListItemIcon>
                <ListItemText primary={text.title} />
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route exact path="/" exact component={ListOfWaterCrafts}/>
            {/* <Route path="watercraft" render={() => <div> Page inbox</div>} />
            <Route path="/Starred" render={() => <div>Page starred</div>} /> */}
            <Route path="/listwatercraft" exact component={ListOfWaterCrafts} />
            <Route path="/watercrafts">
            {
                sessionStorage.getItem("role") === "Admin" &&
                <AddWatercraft data={null} />
              }
            </Route>
            {
              sessionStorage.getItem("role") === "Admin" &&
              <Route path="/member" component={AddMember} />
            }
            <Route path="/viewmember" component={ListMember} />
            <Route path="/MyAccount" component={MyAccount} />
            <Route
              path="/editWatercraft/:idOfWatercraft"
              component={EditWatercraft}
            />
            <Route path="/scheduler" component={SchedulerSetting} />
            <Route path="/" exact />
            <Route
              path="/holidaycalendar/:idOfHolidayCalendar"
              component={HolidayCalendar}
            />
            <Route path="/emergency" component={Emergency} />
            <Route path="/displayAlert" component={DisplayAlert} />
            <Route path="/reservation" component={WatercraftSchedulerUI} />
          </Switch>
        </main>
      </div>
    </GlobalContext.Provider>
  );
}
