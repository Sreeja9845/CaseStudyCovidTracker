import { FormControl, Grid, Input, InputLabel, Snackbar, Typography, MenuItem, Checkbox, ListItemText } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';

import * as React from 'react';
import { addDisease, addHospital, addPatients, getAllDiseases } from '../util/apiCalls';

export default function AddPatient({ addPatientModal, diseaseList, hospitalId}) {
    const [patientName, setPatientName] = React.useState('');
    const [patientStatus, setPatientStatus] = React.useState('');
    const [age, setAge] = React.useState('');
    const [labtest, setLabTest] = React.useState('');
    const [street, setStreet] = React.useState('');
    const [city, setCity] = React.useState('');
    const [state, setState] = React.useState('');
    const [diseases, setDiseases] = React.useState([]);
    const [diseaseId, setDiseaseId] = React.useState('');
    const [snackMessage, setSnackMessage] = React.useState('');
    const [openSnack, setOpenSnack] = React.useState(false);

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    };

    const handleDiseaseChange = (event) => {
        const {
            target: { value },
          } = event;
      
          console.log(value);
          setDiseaseId(value.id);
          setDiseases(value);
      };

    const handleSnackClose = () => {
        setOpenSnack(!openSnack);
    };
    const handlePatientNameChange = (e) => {
        setPatientName(e.target.value);
    };
    const handlePatientStatusChange = (e) => {
        setPatientStatus(e.target.value);
    };
    const handleAgeChange = (e) => {
        setAge(e.target.value);
    };
    const handleLabTestChange = (e) => {
        setLabTest(e.target.value);
    };
    const handleDiseaseIdChange = (e) => {
        setDiseaseId(e.target.value);
    };
    const handleStreetChange = (e) => {
        setStreet(e.target.value);
    };
    const handleCityChange = (e) => {
        setCity(e.target.value);
    };
    const handleStateChange = (e) => {
        setState(e.target.value);
    };
    
      function addPatient() {
        if (patientName === "" || patientName === undefined || patientStatus === "" || patientStatus === undefined ||
        age === "" || age === undefined || labtest === "" || labtest === undefined  || diseaseId ==="" || diseaseId === undefined
        || city === undefined || city === "" || state === undefined || state === "" || street === undefined || street === "" 
        ) {
            alert(diseaseId);
            setSnackMessage('Fields cannot be blank');
            setOpenSnack(true);
        } else {
            addPatients(patientName, patientStatus, age, labtest, hospitalId, diseaseId,
                street, city, state
                ).then(resp => {
                console.log(resp);
                let data = resp.data;
                console.log(data);
                setSnackMessage('Patient added successfully');
                setOpenSnack(true);
                addPatientModal();
            });
        }
    }
    return (
        <React.Fragment>
           
                    <DialogContent>
                    <Grid container spacing={2} >
                        <Grid item xs={4}>
                        <br></br><br></br>
                            <Typography>Details:</Typography>
                        <FormControl required={true} fullWidth variant="standard" style={{ textAlign: 'center' }}>
                            <InputLabel htmlFor="standard-adornment-fname">Enter Patient Name</InputLabel>
                            <Input
                                id="standard-adornment-fname"
                                type={'text'}
                                value={patientName}
                                onChange={handlePatientNameChange}
                            />
                        </FormControl>
                        <br></br><br></br>

                        <FormControl required={true} fullWidth variant="standard">
                            <InputLabel htmlFor="standard-adornment-fname">Enter Patient Status</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={patientStatus}
          onChange={handlePatientStatusChange}
        >
          <MenuItem value="" disabled>
            <em>None</em>
          </MenuItem>
          <MenuItem value={'recovered'}>RECOVERED</MenuItem>
          <MenuItem value={'isolated'}>ISOLATED</MenuItem>
          <MenuItem value={'confirmed'}>CONFIRMED</MenuItem>
          <MenuItem value={'death'}>DEATH</MenuItem>
        </Select>



                        </FormControl>

                        <br></br><br></br>
                        <FormControl required={true} fullWidth variant="standard" style={{ textAlign: 'center' }}>
                            <InputLabel htmlFor="standard-adornment-fname">Enter Age</InputLabel>
                            <Input min={0}
                                id="standard-adornment-fname"
                                type={'number'}
                                inputProps= {{ min: 0}} 
                                value={age}
                                onChange={handleAgeChange}
                            />
                        </FormControl>
                        <br></br><br></br>
                        </Grid>
                        
                        <Grid item xs={4}>
                        <br></br><br></br>
                        <Typography>Address:</Typography>
                        <FormControl required={true} fullWidth variant="standard" style={{ textAlign: 'center' }}>
                            <InputLabel htmlFor="standard-adornment-fname">Enter Street</InputLabel>
                            <Input
                                id="standard-adornment-fname"
                                type={'text'}
                                value={street}
                                onChange={handleStreetChange}
                            />
                        </FormControl>

                       


                        <br></br><br></br>
                        <FormControl required={true} fullWidth variant="standard" style={{ textAlign: 'center' }}>
                            <InputLabel htmlFor="standard-adornment-fname">Enter City</InputLabel>
                            <Input
                                id="standard-adornment-fname"
                                type={'text'}
                                value={city}
                                onChange={handleCityChange}
                            />
                        </FormControl>
                        <br></br><br></br>
                        <FormControl required={true} fullWidth variant="standard" style={{ textAlign: 'center' }}>
                            <InputLabel htmlFor="standard-adornment-fname">Enter State</InputLabel>
                            <Input
                                id="standard-adornment-fname"
                                type={'text'}
                                value={state}
                                onChange={handleStateChange}
                            />
                        </FormControl>
                        </Grid>

                        <Grid item xs={4}>
                        <br></br><br></br>
                        <FormControl required={true} fullWidth variant="standard">
                        <InputLabel id="demo-simple-select-standard-label">Enter Lab Test</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={labtest}
          onChange={handleLabTestChange}
          label="Age"
        >
          <MenuItem value="" disabled>
            <em>None</em>
          </MenuItem>
          <MenuItem value={'positive'}>POSITIVE</MenuItem>
          <MenuItem value={'negative'}>NEGATIVE</MenuItem>
        </Select>
                            
                            
                            
                        </FormControl>

                        
                        <br></br><br></br>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel id="demo-multiple-checkbox-label">Treatment for</InputLabel>
                            <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            value={diseases}
                            onChange={handleDiseaseChange}
                            MenuProps={MenuProps}
                            >
                            {
                                diseaseList.map(variant => (
                                    <MenuItem key={variant.id} value={variant}>
                                        
                                        <ListItemText primary={variant.diseaseName+"("+variant.variant+")"} />
                                    </MenuItem>
                                ))
                            }
                            </Select>
                        </FormControl>
                        </Grid>
                        <br></br><br></br>
                        

                        
                        </Grid>
                    </DialogContent>
                    <DialogActions align='center'>
                        <Button variant="contained" style={{ backgroundColor: "green" }} onClick={addPatient}>&nbsp;Add</Button>

                        {/* <Typography>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Dont have an account? <Button color="primary" onClick={clickSignUp}>Sign up</Button></Typography> */}
                    </DialogActions>
                
            <Snackbar
                style={{ whiteSpace: 'pre-wrap', width: '300px', top: '50%', bottom: '50%', left: '40%', right: '50%' }}
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