import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import MyProfile from "./MyProfile";
import NotificationSetting from "./NotificationSetting";
import ManagePassword from "./ManagePassword";

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function MyAccount() {
  const [indexValue, setIndexValue] = React.useState(0);
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setIndexValue(newValue);
  };

  return (
    <div>
      <AppBar position="static" color="default">
        <Tabs
          value={indexValue}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="My Profile" {...a11yProps(0)} />
          <Tab label="Notification Setting" {...a11yProps(1)} />
          <Tab label="Manage Password" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={indexValue} index={0}>
        <MyProfile />
      </TabPanel>
      <TabPanel value={indexValue} index={1}>
        <NotificationSetting />
      </TabPanel>
      <TabPanel value={indexValue} index={2}>
        <ManagePassword />
      </TabPanel>
    </div>
  );
}
