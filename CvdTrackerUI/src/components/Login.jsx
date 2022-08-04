import {
  FormControl, Grid, Snackbar, TextField
} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import * as React from 'react';
import { login } from '../util/apiCalls';
import Register from './Register';
export default function Login({ toggleModal, loginButton, isEmployee }) {


  //This js file is to handle login user related design & backend API calls
  const [openSnack, setOpenSnack] = React.useState(false);
  const [lusername, setLUsername] = React.useState("");
  const [lpassword, setLPassword] = React.useState("");
  const [invalidError, setInvalidError] = React.useState('');
  const [isSignUpOpen, setIsSignUpOpen] = React.useState(false);
  const handleSnackClose = () => {
    setOpenSnack(!openSnack);
  };
  const lpasswordChange = (event) => {
    setLPassword(event.target.value);
  }

  const lusernameChange = (event) => {
    setLUsername(event.target.value);
  }

  //This method is to call backend, once all validations success
  const clickSignUp = () => {

    toggleSignUpModal();
    //toggleModal();
    //setIsSignUpOpen(!isSignUpOpen);
  }


  const clickLogin = () => {
    console.log("signin clicked");
    if (lusername === "" || lusername === undefined || lpassword === "" || lpassword === undefined) {
      setOpenSnack(true);
    } else {
      console.log("signin clicked else");
      login(lusername, lpassword).then(resp => {
          console.log(resp);
          if (resp.status === 400) {
            setInvalidError('Invalid credentials!');
          } else {
            let data = resp.data;
              console.log(data);
              if (data !== null && data.email !== undefined && data.email !== "" && data.email !== "undefined"
                && data.email !== null) {
                localStorage.setItem("name", data.firstName + " " + data.lastName);
                localStorage.setItem("email", data.email);
                localStorage.setItem("mobile", data.mobile);
                localStorage.setItem("role", data.role);
                localStorage.setItem("userId", data.id);
                loginButton("LOGOUT");
                toggleModal();

              } else {
                setInvalidError('Invalid credentials!');
              }
          }

        }).catch(error => {
          console.log(error);
          setInvalidError(error.response.data.message);
          console.log("login user err " + error);
        });
    }
  }

  const toggleSignUpModal = () => {
    setIsSignUpOpen(!isSignUpOpen);

  }
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      overflowY: 'unset',
      padding: theme.spacing(2),

    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  const BootstrapProfileDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(1),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
      minWidth:'200px'
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
    <React.Fragment>
      <Grid container style={{ width: '1500px !important' }}>

        {/* <Grid item xs={5}>
          <img
            className=""
            //src={require("../../assets/img/pattern_react.png").default}
            src={loginImg}

            alt="..."
          />


        </Grid> */}
        <Grid item xs={12}>
          <DialogContent>
            <FormControl required={true} fullWidth sx={{ m: 1 }} variant="standard" style={{ textAlign: 'center' }}>
              <TextField
                label="Username"
                id="standard-adornment-lusername"
                type={'text'}
                defaultValue={lusername}
                onBlur={lusernameChange}
              />
            </FormControl><br></br><br></br>
            <FormControl required={true} fullWidth sx={{ m: 1 }} variant="standard" style={{ textAlign: 'center' }}>

              <TextField
                label="Password"
                id="standard-adornment-lpassword"
                type={'password'}
                defaultValue={lpassword}
                onBlur={lpasswordChange}
              />
            </FormControl>
            <br></br>
            <span style={{
              fontWeight: 'bold',
              color: 'red',
            }}>{invalidError}</span>

          </DialogContent>
          <DialogActions align='center'>
            <Button variant="contained" style={{ backgroundColor: "darkkhaki" }} onClick={clickLogin}>&nbsp;SIGNIN</Button>

            <Typography>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Dont have an account? <Button color="primary" onClick={toggleSignUpModal}>Sign up</Button></Typography>
          </DialogActions>
          <BootstrapProfileDialog
            onClose={toggleSignUpModal}
            aria-labelledby="customized-dialog-title"
            open={isSignUpOpen}
          >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={toggleSignUpModal} style={{ backgroundColor: '#262673', textAlign: 'center', color: 'white' }}>
              REGISTER
            </BootstrapDialogTitle>

            <Register toggleModal={toggleSignUpModal} />
          </BootstrapProfileDialog>
          <Snackbar
            style={{ whiteSpace: 'pre-wrap', width: '300px', top: '50%', bottom: '50%', left: '40%', right: '50%' }}
            autoHideDuration={1300}
            anchorOrigin={{
              vertical: "center",
              horizontal: "center"
            }}
            open={openSnack}
            onClose={handleSnackClose}
            message="Please fill out this field"
          />

        </Grid>
      </Grid>
    </React.Fragment>

  );
}