import { FormControl, Grid, Input, InputLabel, Snackbar } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import * as React from 'react';
import { editDiseases } from '../util/apiCalls';

export default function EditDisease({ editDiseaseModal, diseaseId, diseaseNameFromDb, virusNameFromDb, varientNameFromDb }) {
    const [diseaseName, setDiseaseName] = React.useState(diseaseNameFromDb);
    const [virusName, setVirusName] = React.useState(virusNameFromDb);
    const [varientName, setVarientName] = React.useState(varientNameFromDb);

    const [snackMessage, setSnackMessage] = React.useState('');
    const [openSnack, setOpenSnack] = React.useState(false);
    const handleSnackClose = () => {
        setOpenSnack(!openSnack);
    };
    function editDisease() {
        if (diseaseName === "" || diseaseName === undefined || virusName === "" || virusName === undefined || varientName === "" || varientName === undefined
        ) {
            setSnackMessage('Fields cannot be blank');
            setOpenSnack(true);
        } else {
            editDiseases(diseaseId, diseaseName, virusName, varientName).then(resp => {
                console.log(resp);
                if (resp.status === 500) {
                    setSnackMessage('Error occured while update disease');
                    setOpenSnack(true);
                } else {
                    let data = resp.data;
                    console.log(data);
                    setSnackMessage('Disease updated successfully');
                    setOpenSnack(true);
                    editDiseaseModal();
                }
            });
        }
    }
    const handleDiseaseNameChange = (e) => {
        setDiseaseName(e.target.value);
    };
    const handleVirusNameChange = (e) => {
        setVirusName(e.target.value);
    };
    const handleVarientNameChange = (e) => {
        setVarientName(e.target.value);
    };

    return (
        <React.Fragment>
            <Grid container >
                <Grid xs={12}>
                    <DialogContent>
                        <FormControl required={true} fullWidth variant="standard" style={{ textAlign: 'center' }}>
                            <InputLabel htmlFor="standard-adornment-fname">Update Disease Name</InputLabel>
                            <Input
                                id="standard-adornment-fname"
                                type={'text'}
                                value={diseaseName}
                                onChange={handleDiseaseNameChange}
                            />
                        </FormControl>
                        <br></br><br></br>

                        <FormControl required={true} fullWidth variant="standard" style={{ textAlign: 'center' }}>
                            <InputLabel htmlFor="standard-adornment-fname">Update Virus Name</InputLabel>
                            <Input
                                id="standard-adornment-fname"
                                type={'text'}
                                value={virusName}
                                onChange={handleVirusNameChange}
                            />
                        </FormControl>

                        <br></br><br></br>
                        <FormControl required={true} fullWidth variant="standard" style={{ textAlign: 'center' }}>
                            <InputLabel htmlFor="standard-adornment-fname">Update Varient Name</InputLabel>
                            <Input
                                id="standard-adornment-fname"
                                type={'text'}
                                value={varientName}
                                onChange={handleVarientNameChange}
                            />
                        </FormControl>

                    </DialogContent>
                    <DialogActions align='center'>
                        <Button variant="contained" style={{ backgroundColor: "green" }} onClick={editDisease}>&nbsp;UPDATE</Button>

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