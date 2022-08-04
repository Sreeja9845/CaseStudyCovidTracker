import { FormControl, Grid, Input, InputLabel, Snackbar } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import * as React from 'react';
import { editHospitals } from '../util/apiCalls';

export default function EditHospital({ editHospitalModal, hospitalId, efreeBeds, egeneralBeds, eicuBeds }) {
    const [freeBeds, setFreeBeds] = React.useState(efreeBeds);
    const [generalBeds, setGeneralBeds] = React.useState(egeneralBeds);
    const [icuBeds, setICUBeds] = React.useState(eicuBeds);
    const [totalBeds, setTotalBeds] = React.useState(parseInt(eicuBeds)+parseInt(egeneralBeds)+parseInt(efreeBeds));
    const [snackMessage, setSnackMessage] = React.useState('');
    const [openSnack, setOpenSnack] = React.useState(false);
    const handleSnackClose = () => {
        setOpenSnack(!openSnack);
    };
    function editHospital() {
        if (freeBeds === "" || freeBeds === undefined || generalBeds === "" || 
        generalBeds === undefined || icuBeds === "" || icuBeds === undefined || totalBeds === "" || totalBeds === undefined
        ) {
            setSnackMessage('Fields cannot be blank');
            setOpenSnack(true);
        } else if(parseInt(totalBeds) !== (parseInt(icuBeds)+parseInt(freeBeds)+parseInt(generalBeds))) {
            setSnackMessage('Total beds count is not matching!');
            setOpenSnack(true);
        } else {
            editHospitals(hospitalId, freeBeds, generalBeds, icuBeds).then(resp => {
                console.log(resp);
                if (resp.status === 500) {
                    setSnackMessage('Error occured while update hospital');
                    setOpenSnack(true);
                } else {
                    let data = resp.data;
                    console.log(data);
                    setSnackMessage('Hospital updated successfully');
                    setOpenSnack(true);
                    editHospitalModal();
                }
            });
        }
    }
    const handleFreebedsChange = (e) => {
        setFreeBeds(e.target.value);
    };

    const handleTotalbedsChange = (e) => {
        setTotalBeds(e.target.value);
    };
    const handleGeneralBedsChange = (e) => {
        setGeneralBeds(e.target.value);
    };
    const handleIcuBedsChange = (e) => {
        setICUBeds(e.target.value);
    };

    return (
        <React.Fragment>
            <Grid container >
                <Grid xs={12}>
                    <DialogContent>
                    <FormControl required={true} fullWidth variant="standard" style={{ textAlign: 'center' }}>
                            <InputLabel htmlFor="standard-adornment-fname">Update Total Beds</InputLabel>
                            <Input
                                id="standard-adornment-fname"
                                type={'number'}
                                inputProps= {{ min: 0}} 
                                value={totalBeds}
                                onChange={handleTotalbedsChange}
                            />
                        </FormControl>
                        <br></br><br></br>
                        <FormControl required={true} fullWidth variant="standard" style={{ textAlign: 'center' }}>
                            <InputLabel htmlFor="standard-adornment-fname">Update Free Beds</InputLabel>
                            <Input
                                id="standard-adornment-fname"
                                type={'number'}
                                inputProps= {{ min: 0}} 
                                value={freeBeds}
                                onChange={handleFreebedsChange}
                            />
                        </FormControl>
                        <br></br><br></br>

                        <FormControl required={true} fullWidth variant="standard" style={{ textAlign: 'center' }}>
                            <InputLabel htmlFor="standard-adornment-fname">Update General Beds</InputLabel>
                            <Input
                                id="standard-adornment-fname"
                                type={'number'}
                                inputProps= {{ min: 0}} 
                                value={generalBeds}
                                onChange={handleGeneralBedsChange}
                            />
                        </FormControl>

                        <br></br><br></br>
                        <FormControl required={true} fullWidth variant="standard" style={{ textAlign: 'center' }}>
                            <InputLabel htmlFor="standard-adornment-fname">Update ICU beds</InputLabel>
                            <Input
                                id="standard-adornment-fname"
                                type={'number'}
                                inputProps= {{ min: 0}} 
                                value={icuBeds}
                                onChange={handleIcuBedsChange}
                            />
                        </FormControl>

                    </DialogContent>
                    <DialogActions align='center'>
                        <Button variant="contained" style={{ backgroundColor: "green" }} onClick={editHospital}>&nbsp;UPDATE</Button>

                        {/* <Typography>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Dont have an account? <Button color="primary" onClick={clickSignUp}>Sign up</Button></Typography> */}
                    </DialogActions>
                </Grid>

            </Grid>
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