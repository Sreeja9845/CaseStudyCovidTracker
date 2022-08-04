import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AppsIcon from '@mui/icons-material/Apps';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import MedicationIcon from '@mui/icons-material/Medication';
import ForwardIcon from '@mui/icons-material/Forward';
import { FormControl, Grid, InputLabel, MenuItem, Snackbar, Select, Input, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import * as React from 'react';
import '../App.css';
import { deleteHospitals, getAllDiseases, getAllHospitals, searchHospitals } from '../util/apiCalls';
import AddHospital from './addHospital';
import EditHospital from './editHospital';
import Header from './Header';
import ViewHospital from './viewHospital';
export default function Hospital() {
  const [value, setValue] = React.useState(1);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isAddHospitalOpen, setIsAddHospitalOpen] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [isEditHospitalOpen, setIsEditHospitalOpen] = React.useState(false);
  const [isViewHospitalOpen, setIsViewHospitalOpen] = React.useState(false);
  const [hospitalInfo, setHospitalInfo] = React.useState({});

  const [selectedZone, setSelectedZone] = React.useState('');
  const [selectedType, setSelectedType] = React.useState('');
  const [isFreeBeds, setIsFreeBeds] = React.useState(false);
  const [isGeneralBeds, setIsGeneralBeds] = React.useState(false);
  const [isICUBeds, setIsICUBeds] = React.useState(false);

  const [eHospitalId, seteHospitalId] = React.useState('');
  const [eFreeBeds, seteFreeBeds] = React.useState('');
  const [eGeneralBeds, seteGeneralBeds] = React.useState('');
  const [eIcuBeds, seteIcuBeds] = React.useState('');


  const [snackMessage, setSnackMessage] = React.useState('');
  const handleSnackClose = () => {
    setOpenSnack(!openSnack);
  };
  const [diseaseList, setDiseaseList] = React.useState([]);
  const [hospitalList, setHospitalList] = React.useState([]);
  const loginHandler = (value) => {
    setIsLoggedIn(value);
  }

  const handleSelectedZoneChange = (e) => {
    setSelectedZone(e.target.value);
  };
  const handleSelectedType = (e) => {
      setSelectedType(e.target.value);
  };
  const handleIsGeneralBedsChange = (e) => {
    setIsGeneralBeds(e.target.value);
};
const handleIsFreeBedsChange = (e) => {
  setIsFreeBeds(e.target.value);
};
  const handleIsIcuBedsChange = (e) => {
      setIsICUBeds(e.target.value);
  };

  React.useEffect(() => {
    getLoggedInStatus();
  }, [value]);

  const viewHospital = (id, pos) => {
    console.log(hospitalList[pos])
    seteHospitalId(id);
    setHospitalInfo(hospitalList[pos]);
    toggleViewHospitalModal();
  }

  const editHospital = (id, pos) => {
    
    seteHospitalId(id);
    seteFreeBeds(hospitalList[pos].freeBeds);
    seteGeneralBeds(hospitalList[pos].generalBeds);
    seteIcuBeds(hospitalList[pos].icuBeds);
    toggleEditHospitalModal();
  }

  const searchHospital = () => {
    searchHospitals(selectedZone, selectedType, isFreeBeds, isGeneralBeds, isICUBeds).then(resp => {
      console.log(resp);
      let data = resp.data;
      console.log(data);
      setHospitalList(data);
    }).catch(error => {
      console.log("login user err " + error);
    });
  }

  const deleteHospital = (id) => {
    console.log(id);
    deleteHospitals(id).then(resp => {
      if (resp.status === 500) {
        setSnackMessage('Error occured during delete hospital');
        setOpenSnack(true);
      } else {
        console.log(resp);
        setSnackMessage('Hospital deleted successfully');
        setOpenSnack(true);
        getAllHospitals().then(resp => {
          console.log(resp);
          let data = resp.data;
          console.log(data);
          setHospitalList(data);
        }).catch(error => {
          console.log("login user err " + error);
        });
      }

    }).catch(error => {
      console.log("login user err " + error);
    })
  }

  React.useEffect(() => {
    getAllDiseases().then(resp => {
      console.log(resp);
      let data = resp.data;
      console.log(data);
      setDiseaseList(data);
    }).catch(error => {
      console.log("login user err " + error);
    });
    getAllHospitals().then(resp => {
      console.log(resp);
      let data = resp.data;
      console.log(data);
      setHospitalList(data);
    }).catch(error => {
      console.log("login user err " + error);
    });

  }, []);

  function getLoggedInStatus() {
    if (localStorage.getItem("name") !== "" && localStorage.getItem("name") !== undefined
      && localStorage.getItem("name") !== null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }
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

  const BootstrapDialogEditHospital = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
      padding: theme.spacing(2),
      minWidth: '500px !important',
      height: '380px'
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  const BootstrapDialogViewHospital = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
      padding: theme.spacing(2),
      minWidth: '1200px !important',
      height: '850px'
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


  function toggleEditHospitalModal() {
    setIsEditHospitalOpen(!isEditHospitalOpen);
    if (isEditHospitalOpen === true) {
      getAllHospitals().then(resp => {
        console.log(resp);
        let data = resp.data;
        console.log(data);
        setHospitalList(data);
      }).catch(error => {
        console.log("login user err " + error);
      });
    }
  }
  const columns = [
    { id: 'hospitalName', label: 'Hospital Name', minWidth: 100 },
    { id: 'hospitalType', label: 'Type', minWidth: 40 },
    { id: 'zoneType', label: 'Zone', minWidth: 20 },
    { id: 'freeBeds', label: 'Free Beds', minWidth: 20 },
    { id: 'icuBeds', label: 'ICU Beds', minWidth: 20 },
    { id: 'generalBeds', label: 'General Beds', minWidth: 20 },
    { id: 'city', label: 'City', minWidth: 20 },
    { id: 'state', label: 'State', minWidth: 20 },
    { id: 'patientSize', label: 'Patient count', minWidth: 20 },
    { id: 'diseases', label: 'Treatment For', maxWidth: 20 },
    { id: 'id', label: 'Action', minWidth: 250 },
  ];

  function toggleAddHospitalModal() {
    setIsAddHospitalOpen(!isAddHospitalOpen);
    if (isAddHospitalOpen === true) {
      getAllHospitals().then(resp => {
        console.log(resp);
        let data = resp.data;
        console.log(data);
        setHospitalList(data);
      }).catch(error => {
        console.log("login user err " + error);
      });

    }
  }

  function toggleViewHospitalModal() {
    setIsViewHospitalOpen(!isViewHospitalOpen);
    if (isViewHospitalOpen === true) {
      getAllHospitals().then(resp => {
        console.log(resp);
        let data = resp.data;
        console.log(data);
        setHospitalList(data);
      }).catch(error => {
        console.log("login user err " + error);
      });

    }
  }

  return (
    <React.Fragment>
      <Header loginHandler={loginHandler} />
      <br></br><br></br><br></br><br></br><br></br>

      <Grid container direction="row" style={{ padding: '10px' }}>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>


        <FormControl required={true}  variant="standard" style={{ textAlign: 'center', width:'20%' }}>
                            <InputLabel htmlFor="standard-adornment-fname">SELECT ZONE</InputLabel>
                            <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={selectedZone}
          onChange={handleSelectedZoneChange}
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
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <FormControl required={true} variant="standard" style={{ textAlign: 'center', width:'20%' }}>
                            <InputLabel htmlFor="standard-adornment-fname">HOSPITAL TYPE</InputLabel>
                            <Input
                                id="standard-adornment-fname"
                                type={'text'}
                                value={selectedType}
                                onChange={handleSelectedType}
                            />
                        </FormControl>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <FormControl required={true}  variant="standard" style={{ textAlign: 'center', width:'20%' }}>
                            <InputLabel htmlFor="standard-adornment-fname">WITH FREE BEDS</InputLabel>
                            <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={isFreeBeds}
          onChange={handleIsFreeBedsChange}
          label="Age"
        >
          <MenuItem value="" disabled>
            <em>None</em>
          </MenuItem>
          <MenuItem value={'true'}>YES</MenuItem>
          <MenuItem value={'false'}>NO</MenuItem>
        </Select>
        </FormControl>
        {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <FormControl required={true}  variant="standard" style={{ textAlign: 'center', width:'10%' }}>
                            <InputLabel htmlFor="standard-adornment-fname">WITH GENERAL BEDS</InputLabel>
                            <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={isGeneralBeds}
          onChange={handleIsGeneralBedsChange}
          label="Age"
        >
          <MenuItem value="" disabled>
            <em>None</em>
          </MenuItem>
          <MenuItem value={'true'}>YES</MenuItem>
          <MenuItem value={'false'}>NO</MenuItem>
        </Select>
        </FormControl>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <FormControl required={true}  variant="standard" style={{ textAlign: 'center', width:'10%' }}>
                            <InputLabel htmlFor="standard-adornment-fname">WITH ICU BEDS</InputLabel>
                            <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={isICUBeds}
          onChange={handleIsIcuBedsChange}
          label="Age"
        >
          <MenuItem value="" disabled>
            <em>None</em>
          </MenuItem>
          <MenuItem value={'true'}>YES</MenuItem>
          <MenuItem value={'false'}>NO</MenuItem>
        </Select>
        </FormControl>&nbsp;&nbsp;&nbsp; */}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button variant="contained" style={{ backgroundColor: "orange", marginTop:'10px'}} onClick={searchHospital}><SearchIcon />&nbsp;SEARCH</Button>
          <Button variant="contained" style={{ backgroundColor: "darkkhaki", float: 'right', marginTop:'10px' }} onClick={toggleAddHospitalModal}><MedicationIcon />&nbsp;ADD HOSPITAL</Button>
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
                {hospitalList.map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {(column.id === 'city') ? (row['address'].city) : 
                              (column.id === 'state') ? (row['address'].state) : 
                                  (column.id === 'patientSize') ? (row['patients'].length): 
                                      (column.id === 'diseases') ? (row['diseases'].map((each, index) => (
                                        
                                        <Typography sx={{ fontSize: 14 }} ><ForwardIcon/>{each.diseaseName + "(" + each.variant + ")"}</Typography>))): 
                                        (column.id === 'id') ? (
                                          <>
                                          <IconButton aria-label="view" onClick={(e) => viewHospital(value, index)} style={{ color: 'rgb(38, 38, 115)' }} size="large">
                                            <AppsIcon />
                                          </IconButton>
                                          <IconButton aria-label="edit" onClick={(e) => editHospital(value, index)} style={{ color: 'rgb(38, 38, 115)' }} size="large">
                                            <ModeEditIcon />
                                          </IconButton>
                                          <IconButton style={{ color: 'red' }} onClick={(e) => deleteHospital(value)} aria-label="delete" size="large">
                                            <DeleteIcon />
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

      <BootstrapDialog
        onClose={toggleAddHospitalModal}
        aria-labelledby="customized-dialog-title"
        open={isAddHospitalOpen}
      >
        <BootstrapDialogTitle id="customized-dialog-title" className="toolHeader" style={{ textAlign: 'center', backgroundColor: '#262673', color: 'white' }}>
          ADD HOSPITAL
        </BootstrapDialogTitle>

        <AddHospital addHospitalModal={toggleAddHospitalModal} />

      </BootstrapDialog>

      <BootstrapDialogViewHospital
        onClose={toggleViewHospitalModal}
        aria-labelledby="customized-dialog-title"
        open={isViewHospitalOpen}
      >
        <BootstrapDialogTitle id="customized-dialog-title" className="toolHeader" style={{ textAlign: 'center', backgroundColor: '#262673', color: 'white' }}>
          VIEW HOSPITAL
        </BootstrapDialogTitle>

        <ViewHospital viewHospitalModal={toggleViewHospitalModal} hospitalInfo={hospitalInfo}/>

      </BootstrapDialogViewHospital>

      <BootstrapDialogEditHospital
        onClose={toggleEditHospitalModal}
        aria-labelledby="customized-dialog-title"
        open={isEditHospitalOpen}
      >
        <BootstrapDialogTitle id="customized-dialog-title" className="toolHeader" style={{ textAlign: 'center', backgroundColor: '#262673', color: 'white' }}>
          EDIT HOSPITAL
        </BootstrapDialogTitle>

        <EditHospital editHospitalModal={toggleEditHospitalModal}
          hospitalId={eHospitalId}
          efreeBeds={eFreeBeds}
          egeneralBeds={eGeneralBeds} 
          eicuBeds={eIcuBeds} />


      </BootstrapDialogEditHospital>
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