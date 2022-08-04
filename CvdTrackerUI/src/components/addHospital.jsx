import { FormControl, Grid, Input, InputLabel, Snackbar, Typography, MenuItem, Checkbox, ListItemText } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';

import * as React from 'react';
import { addDisease, addHospital, getAllDiseases } from '../util/apiCalls';

export default function AddHospital({ addHospitalModal }) {
    const [hospitalName, setHospitalName] = React.useState('');
    const [hospitalType, setHospitalType] = React.useState('');
    const [freeBeds, setFreeBeds] = React.useState(0);
    const [totalBeds, setTotalBeds] = React.useState(0);
    const [generalBeds, setGeneralBeds] = React.useState(0);
    const [icuBeds, setIcuBeds] = React.useState(0);
    const [zone, setZone] = React.useState('');
    const [street, setStreet] = React.useState('');
    const [city, setCity] = React.useState('');
    const [state, setState] = React.useState('');
    const [diseases, setDiseases] = React.useState([]);
    const [selectedDiseases, setSelectedDiseases] = React.useState([]);
    const [snackMessage, setSnackMessage] = React.useState('');
    const [openSnack, setOpenSnack] = React.useState(false);
    const [diseaseList, setDiseaseList] = React.useState([]);

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
    const handleHospitalNameChange = (e) => {
        setHospitalName(e.target.value);
    };
    const handleHospitalTypeChange = (e) => {
        setHospitalType(e.target.value);
    };

    const handleTotalBedsChange = (e) => {
        setTotalBeds(e.target.value);
    };
    const handleFreeBedsChange = (e) => {
        setFreeBeds(e.target.value);
    };
    const handleGeneralBedsChange = (e) => {
        setGeneralBeds(e.target.value);
    };
    const handleIcuBedsChange = (e) => {
        setIcuBeds(e.target.value);
    };
    const handleZoneChange = (e) => {
        setZone(e.target.value);
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
    const handleDiseaseChange = (event) => {
        const {
            target: { value },
          } = event;
      
          console.log(value);
      
          const filterdValue = value.filter(
            (item) => diseases.findIndex((o) => o.id === item.id) >= 0
          );
      
          let duplicatesRemoved = value.filter((item, itemIndex) =>
            value.findIndex((o, oIndex) => o.id === item.id && oIndex !== itemIndex)
          );
      
          let duplicateRemoved = [];
      
          value.forEach((item) => {
            if (duplicateRemoved.findIndex((o) => o.id === item.id) >= 0) {
              duplicateRemoved = duplicateRemoved.filter((x) => x.id === item.id);
            } else {
              duplicateRemoved.push(item);
            }
          });
          let hospitalIds = [];
          console.log(duplicateRemoved);
          duplicateRemoved.map(each=> {
            hospitalIds.push(each.id);
          })
          setSelectedDiseases(hospitalIds);
          setDiseases(duplicateRemoved);
      };
    React.useEffect(() => {
        getAllDiseases().then(resp => {
          console.log(resp);
          let data = resp.data;
          console.log(data);
          setDiseaseList(data);
        }).catch(error => {
          console.log("login user err " + error);
        });
    
      }, []);
    function addNewHospital() {
        if (hospitalName === "" || hospitalName === undefined || hospitalType === "" || hospitalType === undefined ||
            zone === "" || zone === undefined || freeBeds === "" || freeBeds === undefined || generalBeds === "" || generalBeds === undefined ||
            totalBeds === "" || totalBeds === undefined || icuBeds === "" || icuBeds === undefined || street === "" || street === undefined || state === "" || state === undefined ||
            selectedDiseases.length===0
        ) {
            setSnackMessage('Fields cannot be blank');
            setOpenSnack(true);
        } else if (parseInt(totalBeds) !== (parseInt(icuBeds)+parseInt(freeBeds)+parseInt(generalBeds))){
            setSnackMessage('Total beds count is not matching!');
            setOpenSnack(true);
        } else {
            addHospital(hospitalName, hospitalType, zone, freeBeds, generalBeds, icuBeds,
                street, city, state, selectedDiseases).then(resp => {
                console.log(resp);
                let data = resp.data;
                console.log(data);
                setSnackMessage('Hospital added successfully');
                setOpenSnack(true);
                addHospitalModal();
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
                            <InputLabel htmlFor="standard-adornment-fname">Enter Hospital Name</InputLabel>
                            <Input
                                id="standard-adornment-fname"
                                type={'text'}
                                value={hospitalName}
                                onChange={handleHospitalNameChange}
                            />
                        </FormControl>
                        <br></br><br></br>

                        <FormControl required={true} fullWidth variant="standard" style={{ textAlign: 'center' }}>
                            <InputLabel htmlFor="standard-adornment-fname">Enter Hospital Type</InputLabel>
                            <Input
                                id="standard-adornment-fname"
                                type={'text'}
                                value={hospitalType}
                                onChange={handleHospitalTypeChange}
                            />
                        </FormControl>

                        <br></br><br></br>
                        <FormControl required={true} fullWidth variant="standard">
                            <InputLabel htmlFor="standard-adornment-fname">Enter Zone</InputLabel>
                            <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={zone}
          onChange={handleZoneChange}
          label="Age"
        >
          <MenuItem value="" disabled>
            <em>None</em>
          </MenuItem>
          <MenuItem value={'red'}>RED</MenuItem>
          <MenuItem value={'orange'}>ORANGE</MenuItem>
          <MenuItem value={'green'}>GREEN</MenuItem>
        </Select>
                        </FormControl>
                        <br></br><br></br>
                        </Grid>
                        <Grid item xs={4}>
                        <br></br><br></br>
                        <Typography>Beds count:</Typography>
                        <FormControl required={true} fullWidth variant="standard" style={{ textAlign: 'center' }}>
                            <InputLabel htmlFor="standard-adornment-fname">Enter Total Beds</InputLabel>
                            <Input
                                id="standard-adornment-fname"
                                type={'number'}
                                inputProps= {{ min: 0}} 
                                value={totalBeds}
                                onChange={handleTotalBedsChange}
                            />
                        </FormControl>
                        

                        <br></br><br></br>
                        <FormControl required={true} fullWidth variant="standard" style={{ textAlign: 'center' }}>
                            <InputLabel htmlFor="standard-adornment-fname">Enter General Beds</InputLabel>
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
                            <InputLabel htmlFor="standard-adornment-fname">Enter ICU Beds</InputLabel>
                            <Input
                                id="standard-adornment-fname"
                                type={'number'}
                                inputProps= {{ min: 0}} 
                                value={icuBeds}
                                onChange={handleIcuBedsChange}
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
                        <br></br><br></br>

                        <Grid item xs={4}>
                        

                        <FormControl fullWidth>
                            <InputLabel id="demo-multiple-checkbox-label">Treatment for</InputLabel>
                            <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={diseases}
                            onChange={handleDiseaseChange}
                            input={<OutlinedInput label="Treatment for" />}
                            renderValue={(selected) => selected.map((x) => x.diseaseName+"("+x.variant+")").join(', ')}
                            MenuProps={MenuProps}
                            >
                            {
                                diseaseList.map(variant => (
                                    <MenuItem key={variant.id} value={variant}>
                                        <Checkbox
                                        checked={
                                            diseases.findIndex((item) => item.id === variant.id) >= 0
                                            }
                                        />
                                        <ListItemText primary={variant.diseaseName+"("+variant.variant+")"} />
                                    </MenuItem>
                                ))
                            }
                            </Select>
                        </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                        <FormControl required={true} fullWidth variant="standard" style={{ textAlign: 'center' }}>
                            <InputLabel htmlFor="standard-adornment-fname">Enter Free Beds</InputLabel>
                            <Input
                                id="standard-adornment-fname"
                                type={'number'}
                                inputProps= {{ min: 0}} 
                                value={freeBeds}
                                onChange={handleFreeBedsChange}
                            />
                        </FormControl>


                        </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions align='center'>
                        <Button variant="contained" style={{ backgroundColor: "green" }} onClick={addNewHospital}>&nbsp;Add</Button>

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