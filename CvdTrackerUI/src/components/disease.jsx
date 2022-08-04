import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Grid, Snackbar } from '@mui/material';
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
import { deleteDiseases, getAllDiseases } from '../util/apiCalls';
import AddDisease from './addDisease';
import EditDisease from './editDisease';
import Header from './Header';
export default function Disease() {
  const [value, setValue] = React.useState(1);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isAddDiseaseOpen, setIsAddDiseaseOpen] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [isEditDiseaseOpen, setIsEditDiseaseOpen] = React.useState(false);

  const [eDiseaseId, seteDiseaseId] = React.useState('');
  const [eVirusName, seteVirusName] = React.useState('');
  const [eDiseaseName, seteDiseaseName] = React.useState('');
  const [eVarientName, seteVarientName] = React.useState('');


  const [snackMessage, setSnackMessage] = React.useState('');
  const handleSnackClose = () => {
    setOpenSnack(!openSnack);
  };
  const [diseaseList, setDiseaseList] = React.useState([]);
  const loginHandler = (value) => {
    setIsLoggedIn(value);
  }



  React.useEffect(() => {
    getLoggedInStatus();
  }, [value]);

  const editDisease = (id, pos) => {
    seteDiseaseId(id);
    seteDiseaseName(diseaseList[pos].diseaseName);
    seteVarientName(diseaseList[pos].variant);
    seteVirusName(diseaseList[pos].virusName);
    toggleEditDiseaseModal();
  }

  const deleteDisease = (id) => {
    console.log(id);
    deleteDiseases(id).then(resp => {
      if (resp.status === 500) {
        setSnackMessage('Error occured during delete disease');
        setOpenSnack(true);
      } else {
        console.log(resp);
        setSnackMessage('Disease deleted successfully');
        setOpenSnack(true);
        getAllDiseases().then(resp => {
          console.log(resp);
          let data = resp.data;
          console.log(data);
          setDiseaseList(data);
        }).catch(error => {
          setOpenSnack(true);
          setSnackMessage(error.response.data.message);
          
          console.log("login user err " + error);
        });
      }

    }).catch(error => {
      setOpenSnack(true);
          setSnackMessage("Deletion failed: "+error.response.data.message);
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
      minWidth: '700px !important',
      height: '380px'
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


  function toggleEditDiseaseModal() {
    setIsEditDiseaseOpen(!isEditDiseaseOpen);
    if (isEditDiseaseOpen === true) {
      getAllDiseases().then(resp => {
        console.log(resp);
        let data = resp.data;
        console.log(data);
        setDiseaseList(data);
      }).catch(error => {
        console.log("login user err " + error);
      });
    }
  }
  const columns = [
    { id: 'diseaseName', label: 'Disease Name', minWidth: 100 },
    { id: 'variant', label: 'Variant', minWidth: 70 },
    { id: 'virusName', label: 'Virus Name', minWidth: 70 },
    { id: 'id', label: 'ACTION', minWidth: 100 },
  ];

  function toggleAddDiseaseModal() {
    setIsAddDiseaseOpen(!isAddDiseaseOpen);
    if (isAddDiseaseOpen === true) {
      getAllDiseases().then(resp => {
        console.log(resp);
        let data = resp.data;
        console.log(data);
        setDiseaseList(data);
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
          <Button variant="contained" style={{ backgroundColor: "darkkhaki", float: 'right' }} onClick={toggleAddDiseaseModal}><AddCircleOutlineIcon />&nbsp;ADD DISEASE</Button>
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
                {diseaseList.map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>

                            {(column.id === 'id') ? (
                              <>
                                <IconButton aria-label="edit" onClick={(e) => editDisease(value, index)} style={{ color: 'rgb(38, 38, 115)' }} size="large">
                                  <ModeEditIcon />
                                </IconButton>
                                <IconButton style={{ color: 'red' }} onClick={(e) => deleteDisease(value)} aria-label="delete" size="large">
                                  <DeleteIcon />
                                </IconButton>
                              </>
                            ) : value}
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
        onClose={toggleAddDiseaseModal}
        aria-labelledby="customized-dialog-title"
        open={isAddDiseaseOpen}
      >
        <BootstrapDialogTitle id="customized-dialog-title" className="toolHeader" style={{ textAlign: 'center', backgroundColor: '#262673', color: 'white' }}>
          ADD DISEASE
        </BootstrapDialogTitle>

        <AddDisease addDiseaseModal={toggleAddDiseaseModal} />

      </BootstrapDialog>
      <BootstrapDialog
        onClose={toggleEditDiseaseModal}
        aria-labelledby="customized-dialog-title"
        open={isEditDiseaseOpen}
      >
        <BootstrapDialogTitle id="customized-dialog-title" className="toolHeader" style={{ textAlign: 'center', backgroundColor: '#262673', color: 'white' }}>
          EDIT DISEASE
        </BootstrapDialogTitle>

        <EditDisease editDiseaseModal={toggleEditDiseaseModal}
          diseaseId={eDiseaseId}
          diseaseNameFromDb={eDiseaseName}
          virusNameFromDb={eVirusName} varientNameFromDb={eVarientName} />


      </BootstrapDialog>
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