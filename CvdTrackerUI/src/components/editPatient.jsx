import { FormControl, Grid, Input, InputLabel, Snackbar, Typography, MenuItem, Checkbox, ListItemText } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';

import * as React from 'react';
import { addDisease, addHospital, addPatients, editPatients, getAllDiseases } from '../util/apiCalls';

export default function EditPatient({ editPatientModal, patientId}) {
    const [patientStatus, setPatientStatus] = React.useState('');
    const [labtest, setLabTest] = React.useState('');
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
    const handleSnackClose = () => {
        setOpenSnack(!openSnack);
    };
    const handlePatientStatusChange = (e) => {
        setPatientStatus(e.target.value);
    };
    const handleLabTestChange = (e) => {
        setLabTest(e.target.value);
    };
    
    
      function editPatient() {
        if (patientStatus === "" || patientStatus === undefined || labtest === "" || labtest === undefined) {
            setSnackMessage('Fields cannot be blank');
            setOpenSnack(true);
        } else {
            editPatients(patientStatus, labtest, patientId).then(resp => {
                console.log(resp);
                let data = resp.data;
                console.log(data);
                setSnackMessage('Patient updated successfully');
                setOpenSnack(true);
                editPatientModal();
            });
        }
    }
    return (
        <React.Fragment>
           
                    <DialogContent>
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

                        
                    </DialogContent>
                    <DialogActions align='center'>
                        <Button variant="contained" style={{ backgroundColor: "green" }} onClick={editPatient}>&nbsp;UPDATE</Button>

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