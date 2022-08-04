import {
  FormControl, Grid, Input, InputLabel, Snackbar
} from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { registerUser } from '../util/apiCalls';



export default function Register({ toggleModal }) {
  //This js file is mainly to register users and it will take care all validations as well
  const [openSnack, setOpenSnack] = React.useState(false);
  const [emailError, setEmailError] = React.useState('');
  const [mobileError, setMobileError] = React.useState('');
  const [cpasswordError, setcPasswordError] = React.useState('');
  const [invalidError, setInvalidError] = React.useState('');
  const [snackMessage, setSnackMessage] = React.useState('');
  const passwordChange = (event) => {
    setPassword(event.target.value);
    if (!passwordLength(event.target.value)) {
      setcPasswordError('Password length should more than 8');
    } else {
      setcPasswordError('');
    }
  }

  const emailChange = (event) => {
    setEmail(event.target.value);
    if (!ValidateEmail(event.target.value)) {
      setEmailError('Enter valid Email!');
    } else {
      setEmailError('');
    }
  }

  const fnameChange = (event) => {
    setFName(event.target.value);
  }

  const lnameChange = (event) => {
    setLName(event.target.value);
  }
 
  const cnumberChange = (event) => {
    setCnumber(event.target.value);
    if (!phonenumber(event.target.value)) {
      setMobileError('Enter valid Mobile!');
    } else {
      setMobileError('');
    }
  }

  const roleChange = (event) => {
    setRole(event.target.value);
  }

  const clickRegister = () => {
    if (email === "" || email === undefined || password === "" || password === undefined ||
      fname === "" || fname === undefined || lname === "" || lname === undefined || cnumber === ""
      || cnumber === undefined || role === "" || role === undefined) {
      setSnackMessage('Please fill out this field');
      setOpenSnack(true);
    } else if (!ValidateEmail(email) || !phonenumber(cnumber)) {
      return false;
    } else if (!passwordLength(password)) {
      return false;
    } else {
      registerUser(fname, lname, email, password, cnumber, role).then(res => {
        setFName("");
        setLName("");
        setEmail("");
        setPassword("");
        setCnumber("");
        setRole("");
        setSnackMessage('Registration success!, Please log in');
        setOpenSnack(true);
      })
        .catch(error => {
          console.log("Regiter failed" + error);
          setInvalidError(error.response.data.message);
        })
    }
  }

  function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return (true)
    }
    return (false)
  }

  function phonenumber(mobile) {
    var phoneno = /^\d{10}$/;
    if (mobile.match(phoneno)) {
      return true;
    }
    else {
      return false;
    }
  }

  function passwordLength(password){
    return password.length>=8;
  }

  const [logButtonName, setlogButtonName] = React.useState("LOGIN");

  const handleSnackClose = () => {
    setOpenSnack(!openSnack);
  };
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [fname, setFName] = React.useState("");
  const [lname, setLName] = React.useState("");
  const [cnumber, setCnumber] = React.useState("");
  const [role, setRole] = React.useState("");
  return (
    <React.Fragment>
      <DialogContent>
        <FormControl required={true}  fullWidth variant="standard" style={{ textAlign: 'center' }}>
          <InputLabel htmlFor="standard-adornment-fname">First Name</InputLabel>
          <Input
            id="standard-adornment-fname"
            type={'text'}
            value={fname}
            onChange={fnameChange}
          />
        </FormControl><br></br><br></br>
        <FormControl required={true}  fullWidth variant="standard" style={{ textAlign: 'center' }}>
          <InputLabel htmlFor="standard-adornment-fname">Last Name</InputLabel>
          <Input
            id="standard-adornment-fname"
            type={'text'}
            value={lname}
            onChange={lnameChange}
          />
        </FormControl><br></br><br></br>
        <FormControl required={true} fullWidth variant="standard" style={{ textAlign: 'center' }}>
          <InputLabel htmlFor="standard-adornment-email">Email</InputLabel>
          <Input
            id="standard-adornment-email"
            type={'text'}
            value={email}
            onChange={emailChange}
          />
        </FormControl>
        <br></br>
        <span style={{
          fontWeight: 'bold',
          color: 'red',
        }}>{emailError}</span>
        <br></br>
        <FormControl required={true} fullWidth variant="standard" style={{ textAlign: 'center' }}>
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={'password'}
            value={password}
            onChange={passwordChange}
          />
        </FormControl>
        <span style={{
          fontWeight: 'bold',
          color: 'red',
        }}>{cpasswordError}</span>
        <br></br><br></br>
        <FormControl required={true} fullWidth variant="standard" style={{ textAlign: 'center' }}>
          <InputLabel htmlFor="standard-adornment-cnumber">Contact Number</InputLabel>
          <Input
            id="standard-adornment-cnumber"
            type={'text'}
            value={cnumber}
            onChange={cnumberChange}
          />
        </FormControl><br></br>
        <span style={{
          fontWeight: 'bold',
          color: 'red',
        }}>{mobileError}</span>
        <br></br>
        
        <FormControl fullWidth required={true}  variant="standard">
        <InputLabel id="demo-simple-select-label">Role</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={role}
          label="Role"
          onChange={roleChange}
        >
          <MenuItem value={"admin"}>ADMIN</MenuItem>
          <MenuItem value={"user"}>USER</MenuItem>
        </Select>
      </FormControl>
      <br></br>
            <span style={{
              fontWeight: 'bold',
              color: 'red',
            }}>{invalidError}</span>
      </DialogContent>
      <DialogActions align='center'>
        <Grid container justify="center">
          <Button variant="contained" style={{ backgroundColor: "darkkhaki" }} onClick={clickRegister} >REGISTER</Button>
          <Typography>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Already had an account? <Button color="primary" onClick={toggleModal}>Sign IN</Button></Typography>
        </Grid>
      </DialogActions>

      <Snackbar
       style={{whiteSpace: 'pre-wrap', width:'300px', top:'50%',bottom:'50%', left:'40%', right:'50%'}}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center"
        }}
        open={openSnack}
        onClose={handleSnackClose}
        message={snackMessage}
      />
    </React.Fragment>
  );
}