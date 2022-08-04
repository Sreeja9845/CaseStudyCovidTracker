import { FormControl, Grid, Input, InputLabel, Snackbar } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import * as React from 'react';
import { addDisease } from '../util/apiCalls';

export default function AddDisease({ addDiseaseModal }) {
    const [diseaseName, setDiseaseName] = React.useState('');
    const [diseaseVarient, setDiseaseVarient] = React.useState('');
    const [virusName, setVirusName] = React.useState('');
    const [snackMessage, setSnackMessage] = React.useState('');
    const [openSnack, setOpenSnack] = React.useState(false);
    const handleSnackClose = () => {
        setOpenSnack(!openSnack);
    };
    const handleDiseaseVarientChange = (e) => {
        setDiseaseVarient(e.target.value);
    };
    const handleDiseaseNameChange = (e) => {
        setDiseaseName(e.target.value);
    };
    const handleVirusNameChange = (e) => {
        setVirusName(e.target.value);
    };

    function addNewDisease() {
        if (diseaseName === "" || diseaseName === undefined || virusName === "" || virusName === undefined ||
            diseaseVarient === "" || diseaseVarient === undefined
        ) {
            setSnackMessage('Fields cannot be blank');
            setOpenSnack(true);
        } else {
            addDisease(diseaseName, virusName, diseaseVarient).then(resp => {
                console.log(resp);
                let data = resp.data;
                console.log(data);
                setSnackMessage('Disease added successfully');
                setOpenSnack(true);
                addDiseaseModal();
            });
        }
    }
    return (
        <React.Fragment>
            <Grid container >
                <Grid xs={12}>
                    <DialogContent>

                        <FormControl required={true} fullWidth variant="standard" style={{ textAlign: 'center' }}>
                            <InputLabel htmlFor="standard-adornment-fname">Enter Disease Name</InputLabel>
                            <Input
                                id="standard-adornment-fname"
                                type={'text'}
                                value={diseaseName}
                                onChange={handleDiseaseNameChange}
                            />
                        </FormControl>
                        <br></br><br></br>

                        <FormControl required={true} fullWidth variant="standard" style={{ textAlign: 'center' }}>
                            <InputLabel htmlFor="standard-adornment-fname">Enter Virus Name</InputLabel>
                            <Input
                                id="standard-adornment-fname"
                                type={'text'}
                                value={virusName}
                                onChange={handleVirusNameChange}
                            />
                        </FormControl>

                        <br></br><br></br>
                        <FormControl required={true} fullWidth variant="standard" style={{ textAlign: 'center' }}>
                            <InputLabel htmlFor="standard-adornment-fname">Enter Varient Name</InputLabel>
                            <Input
                                id="standard-adornment-fname"
                                type={'text'}
                                value={diseaseVarient}
                                onChange={handleDiseaseVarientChange}
                            />
                        </FormControl>


                    </DialogContent>
                    <DialogActions align='center'>
                        <Button variant="contained" style={{ backgroundColor: "green" }} onClick={addNewDisease}>&nbsp;Add</Button>

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