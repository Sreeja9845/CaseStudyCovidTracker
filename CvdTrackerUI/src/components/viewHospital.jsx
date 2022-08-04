import { Box, CardContent, FormControl, Grid, Input, InputLabel, Snackbar, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { addDisease, getHospitalById } from '../util/apiCalls';
import { Card } from 'react-bootstrap';
import AddPatient from './addPatient';
import EditPatient from './editPatient';

export default function ViewHospital({ viewHospitalModal, hospitalInfo }) {
    const [hospitalId, setHospitalId] = React.useState(hospitalInfo.id);
    const [patientList, setPatientList] = React.useState(hospitalInfo.patients);
    const [patientName, setPatientName] = React.useState('');
    const [patientStatus, setPatientStatus] = React.useState('');
    const [selectedPatientId, setSelectedPatientId] = React.useState('');
    const [diseaseList, setDiseaseList] = React.useState(hospitalInfo.diseases);
    const [isAddPatientOpen, setIsAddPatientOpen] = React.useState(false);
    const [diseaseId, setDiseaseId] = React.useState(hospitalInfo.id);
    const [city, setCity] = React.useState('');
    const [state, setState] = React.useState('');
    const [street, setStreet] = React.useState('');
    const [patientAge, setPatientAge] = React.useState('');
    const [labTest, setLabTest] = React.useState('');
    const [isEditPatientOpen, setIsEditPatientOpen] = React.useState(false);
    const [snackMessage, setSnackMessage] = React.useState('');
    const [openSnack, setOpenSnack] = React.useState(false);
    const handleSnackClose = () => {
        setOpenSnack(!openSnack);
    };
    // const handleDiseaseVarientChange = (e) => {
    //     setDiseaseVarient(e.target.value);
    // };
    // const handleDiseaseNameChange = (e) => {
    //     setDiseaseName(e.target.value);
    // };
    // const handleVirusNameChange = (e) => {
    //     setVirusName(e.target.value);
    // };
    const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        '& .MuiDialog-paper': {
          padding: theme.spacing(2),
          minWidth: '1200px !important',
          height: '550px'
        },
        '& .MuiDialogActions-root': {
          padding: theme.spacing(1),
        },
      }));

      const BootstrapDialogEditPatient = styled(Dialog)(({ theme }) => ({
        '& .MuiDialog-paper': {
          padding: theme.spacing(2),
          minWidth: '500px !important',
          height: '370px'
        },
        '& .MuiDialogActions-root': {
          padding: theme.spacing(1),
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

      function toggleAddPatientModal() {
        setIsAddPatientOpen(!isAddPatientOpen);
        if (isAddPatientOpen === true) {
            getHospitalById(hospitalId).then(resp => {
                console.log(resp);
                let data = resp.data;
                console.log(data);
                setPatientList(data.patients);
              }).catch(error => {
                console.log("login user err " + error);
              });
        }
      }

      function toggleEditPatientModal() {
        setIsEditPatientOpen(!isEditPatientOpen);
        if (isEditPatientOpen === true) {
            getHospitalById(hospitalId).then(resp => {
                console.log(resp);
                let data = resp.data;
                console.log(data);
                setPatientList(data.patients);
              }).catch(error => {
                console.log("login user err " + error);
              });
        }
      }
    const columns = [
        { id: 'patientName', label: 'Patient Name', minWidth: 140 },
        { id: 'patientStatus', label: 'Current status', minWidth: 40 },
        { id: 'patientAge', label: 'Age', minWidth: 40 },
        { id: 'labTest', label: 'Lab Test', minWidth: 40 },
        { id: 'disease', label: 'Disease', minWidth: 120 },
        { id: 'city', label: 'City', minWidth: 120 },
        { id: 'state', label: 'State', minWidth: 120 },
        { id: 'id', label: 'Action', minWidth: 120 },
      ];

      React.useEffect(() => {
        getHospitalById(hospitalId).then(resp => {
          console.log(resp);
          let data = resp.data;
          console.log(data);
          setPatientList(data.patients);
        }).catch(error => {
          console.log("login user err " + error);
        });
      }, []);

    //function editPatient(id){alert(id)}
    const editPatient = (id, pos) => {
        setSelectedPatientId(id);
        toggleEditPatientModal();
      }
    return (
        <React.Fragment>
            <DialogContent>
                <Grid container >
                    <Grid xs={4}>
                        <Box sx={{ minWidth: 275 }}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {hospitalInfo.hospitalName} ({hospitalInfo.hospitalType})

                                    </Typography>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        {hospitalInfo.address.street}, <br></br>
                                        {hospitalInfo.address.city}, <br></br>
                                        {hospitalInfo.address.state}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        ZONE: {hospitalInfo.zoneType}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Box>
                    </Grid>
                    <Grid xs={4}>
                        <br></br>

                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 150 }} aria-label="simple table">

                                <TableBody>
                                    <TableRow>
                                        <TableCell>Free Beds</TableCell>
                                        <TableCell> {hospitalInfo.freeBeds}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>General Beds</TableCell>
                                        <TableCell> {hospitalInfo.generalBeds}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>ICU Beds</TableCell>
                                        <TableCell> {hospitalInfo.icuBeds}</TableCell>
                                    </TableRow></TableBody></Table>
                        </TableContainer>
                    </Grid> <br></br>
                    <Grid xs={3} style={{ padding: '30px', marginLeft: '20px', marginTop: '20px', backgroundColor: 'aliceblue' }} component={Paper}>

                        <Typography variant="h6" component="div">Treatment for:</Typography>
                        {
                            hospitalInfo.diseases.map(each => (
                                <Typography sx={{ fontSize: 14 }} > {each.diseaseName + "(" + each.variant + ")"}</Typography>
                            ))
                        }
                    </Grid>
                </Grid>
                <Grid container direction="row" style={{ padding: '10px' }}>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
            
          <Button variant="contained" style={{ backgroundColor: "darkkhaki", float: 'right' }} onClick={toggleAddPatientModal}><PersonAddAlt1Icon />&nbsp;ADD PATIENT</Button>
          <br></br><br></br>
          <TableContainer component={Paper}>
            <Table stickyHeader aria-label="customized table">
              <TableHead>
                <TableRow>
                  {
                    columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth, fontWeight: '700', backgroundColor: 'rgb(38, 38, 115)', color: 'white' }}
                      >
                        {column.label}
                      </TableCell>
                    ))
                  }

                </TableRow>
              </TableHead>
              <TableBody>
                {patientList.map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {(column.id === 'city') ? (row['address'].city) : 
                             (column.id === 'disease') ? (row['disease'].diseaseName+"("+row['disease'].variant+")") : 
                              (column.id === 'state') ? (row['address'].state) : 
                                        (column.id === 'id') ? (
                                          <>
                                          <IconButton aria-label="edit" onClick={(e) => editPatient(value, index)} style={{ color: 'rgb(38, 38, 115)' }} size="large">
                                            <ModeEditIcon />
                                          </IconButton>
                                        </>
                                        ):value}


                            
                            {/* {(column.id === 'id') ? (
                              <>
                                <IconButton aria-label="edit" onClick={(e) => editHospital(value, index)} style={{ color: 'rgb(38, 38, 115)' }} size="large">
                                  <ModeEditIcon />
                                </IconButton>
                                <IconButton style={{ color: 'red' }} onClick={(e) => deleteHospital(value)} aria-label="delete" size="large">
                                  <DeleteIcon />
                                </IconButton>
                              </>
                            ) : value} */}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
            </DialogContent>
            <DialogActions align='center'>
                <Button variant="contained" style={{ backgroundColor: "green" }} onClick={viewHospitalModal}>&nbsp;CLOSE</Button>

                {/* <Typography>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Dont have an account? <Button color="primary" onClick={clickSignUp}>Sign up</Button></Typography> */}
            </DialogActions>
           
           
           
           
           
           
            <BootstrapDialog
        onClose={toggleAddPatientModal}
        aria-labelledby="customized-dialog-title"
        open={isAddPatientOpen}
      >
        <BootstrapDialogTitle id="customized-dialog-title" className="toolHeader" style={{ textAlign: 'center', backgroundColor: '#262673', color: 'white' }}>
          ADD PATIENT
        </BootstrapDialogTitle>

        <AddPatient addPatientModal={toggleAddPatientModal} diseaseList={diseaseList} hospitalId={hospitalId}/>

      </BootstrapDialog>

      <BootstrapDialogEditPatient
        onClose={toggleEditPatientModal}
        aria-labelledby="customized-dialog-title"
        open={isEditPatientOpen}
      >
        <BootstrapDialogTitle id="customized-dialog-title" className="toolHeader" style={{ textAlign: 'center', backgroundColor: '#262673', color: 'white' }}>
          UPDATE PATIENT
        </BootstrapDialogTitle>

        <EditPatient editPatientModal={toggleEditPatientModal} patientId={selectedPatientId}/>

      </BootstrapDialogEditPatient>


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