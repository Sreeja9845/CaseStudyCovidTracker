import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import * as React from 'react';
import {
  NavLink
} from 'react-router-dom';
import "../App.css";
import image from '../assets/logo.png';
import Login from './Login';

export default function Header({ loginHandler }) {

  //This js file is to design & api calls related to header section in ui screen

  const [isOpen, setIsOpen] = React.useState(false);
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const [selectValue, setSelectValue] = React.useState("");
 

  const [value, setValue] = React.useState(1);
  let datas = {
    label: ""
  }
  const [logButtonName, setlogButtonName] = React.useState(isUserSessionAlreadyExist());


  //This function is to validate user session exists or not
  function isUserSessionAlreadyExist() {
    if (localStorage.getItem("name") !== "" && localStorage.getItem("name") !== undefined
      && localStorage.getItem("name") !== null) {
      loginHandler(true);
      return "LOGOUT";
    } else {
      loginHandler(false);
      return "LOGIN";
    }
  }

  function toggleModal() {
    //alert(selectValue);
    if (logButtonName === 'LOGOUT') {
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("mobile");
      localStorage.removeItem("role");
      localStorage.removeItem("userId");


      setlogButtonName("LOGIN");
      window.location.replace("/")
    } else {
      setIsOpen(!isOpen);
    }
  }

  function toggleProfileModal() {
    setIsProfileOpen(!isProfileOpen);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };





  //alert(selectValue);
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
      //width: '300px !important',
      overflowY: 'unset'
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

  const BootstrapProfileDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      // padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      // padding: theme.spacing(1),
      // minWidth: '700px'
    },
  }));

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      border: '2px SOLID red',
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));
  const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };

  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };
  return (
    <Box sx={{ flexGrow: 1, display: "flex" }}>
      <AppBar position="fixed"  >
        <Toolbar className="toolBar" position="fixed" style={{ backgroundColor: '#262673', height: '100px', width: '100%', position: 'fixed', borderBottom: '0.1em solid #B1F4F1', padding: '0.5em' }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 1 }}
          >
            <img src={image} className="img" style={{ height: '65px' }} />
          </IconButton>
          <Typography variant="h4" component="div" style={{ color: '#ffffff', fontFamily: 'fantasy' }} >
          COVID TRACKER
          </Typography>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

          {/* <NavLink className="navbar-item" to="/home" style={{ color: '#373C83', textDecoration: 'none' }}> */}
          {/* <Search style={{backgroundColor:'white', borderRadius:'20px'}}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={posts}
              defaultValue={selectValue}
             // getOptionLabel={(option) => option.label}
              onChange={(event, value) => setSelectValue(value.label)}
              sx={{ width: 700 }}
              PopperComponent={({ style, ...props }) => (
                <Popper
                  {...props}
                  style={{ ...style, height: 0 , color:'white', borderRadius:'20px'}} // width is passed in 'style' prop
                />
              )}
              style={{marginTop:'-4px', color:'white', backgroundColor:'white', borderRadius:'20px'}}
              renderInput={(params) => <TextField {...params} label="Seach post.." style={{color:'white', backgroundColor:'white  !important', borderRadius:'20px'}}/>}
            />
          </Search> */}
{(localStorage.getItem("name") !== undefined && localStorage.getItem("name") !== null && localStorage.getItem("name").trim() !== "") ? (
          <NavLink className="navbar-item" to="/home" style={{ color: '#ffffff', textDecoration: 'none' }}>
            <IconButton>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                fontSize: '19px',
                color: '#ffffff',
              }}><ListAltIcon />&nbsp;<span>HOME</span>
              </div>
            </IconButton>
          </NavLink>
):""}
          {
             (localStorage.getItem("role") !== undefined && localStorage.getItem("role") !== null && localStorage.getItem("role").trim() === "admin") ? (

              <NavLink className="navbar-item" to="/disease" style={{ color: '#ffffff', textDecoration: 'none' }}>
                <IconButton>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    fontSize: '19px',
                    color: '#ffffff',
                  }}><CoronavirusIcon />&nbsp;<span>ADD DISEASE</span>
                  </div>
                </IconButton>
              </NavLink>
            ) : ""
          }
          {
            (localStorage.getItem("role") !== undefined && localStorage.getItem("role") !== null && localStorage.getItem("role").trim() === "admin") ? (

              <NavLink className="navbar-item" to="/hospital" style={{ color: '#ffffff', textDecoration: 'none' }}>
                <IconButton>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    fontSize: '19px',
                    color: '#ffffff',
                  }}><LocalHospitalIcon />&nbsp;<span>ADD HOSPITAL</span>
                  </div>
                </IconButton>
              </NavLink>
            ) : ""
          }
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;




          <div style={{ flex: '1' }}></div>
          
          {
            (localStorage.getItem("name") !== undefined && localStorage.getItem("name") !== null && localStorage.getItem("name").trim() !== "") ? (
              <div style={{ cursor: 'pointer', color: '#ffffff', fontSize: '19px' }}><span> Hello {localStorage.getItem("name")}!</span>&nbsp;&nbsp;</div>
            ) : ""
          }

          <Button variant="contained" style={{ backgroundColor: 'goldenrod', color: 'white' }} onClick={toggleModal} >{logButtonName}</Button>
          <BootstrapDialog
            onClose={toggleModal}
            aria-labelledby="customized-dialog-title"
            open={isOpen}
          >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={toggleModal} className="toolHeader" style={{ textAlign: 'center', backgroundColor: '#262673', color: 'white' }}>
              LOGIN
            </BootstrapDialogTitle>




            <TabContext value={value}>
              <Tabs value={value} onChange={handleChange} style={{ textAlign: 'center' }}>
                <Tab label="User Login" value={1} style={{ width: '200px' }} />
                <Tab label="Admin Login" value={2} style={{ width: '200px' }} />
              </Tabs>

              <TabPanel value={1} index={0}>
                <Login toggleModal={toggleModal} loginButton={setlogButtonName} isEmployee={false} />
              </TabPanel>

              <TabPanel value={2} index={1}>
                <Login toggleModal={toggleModal} loginButton={setlogButtonName} isEmployee={true} />
              </TabPanel>

            </TabContext>
          </BootstrapDialog>


        </Toolbar>
      </AppBar>
    </Box>
  );
}