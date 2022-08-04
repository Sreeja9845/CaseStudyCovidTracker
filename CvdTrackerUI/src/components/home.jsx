import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import * as React from 'react';
import '../App.css';
import image1 from '../assets/fight.jpg';
import image from '../assets/home.jpg';
import { getAllPatientsHistory } from '../util/apiCalls';
import Header from './Header';
export default function Home() {

  //This js is home page, contains static data

  const [value, setValue] = React.useState(1);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [totalCases, setTotalCases] = React.useState('');
  const [totalCasesInLast24Hrs, setTotalCasesInLast24Hrs] = React.useState('');
  const [totalLabTest, setTotalLabTest] = React.useState('');
  const [totalConfirmedCases, setTotalConfirmedCases] = React.useState('');
  const [totalIsolatedCases, setTotalIsolatedCases] = React.useState('');
  const [totalRecoveredCases, setTotalRecoveredCases] = React.useState('');
  const [totalDeathCases, setTotalDeathCases] = React.useState('');

  const [snackMessage, setSnackMessage] = React.useState('');
  const handleSnackClose = () => {
    setOpenSnack(!openSnack);
  };
 
  const loginHandler = (value) => {
    setIsLoggedIn(value);
  }



  React.useEffect(() => {
    getLoggedInStatus();

  }, [value]);


  React.useEffect(() => {
    getAllPatientsHistory().then(resp => {
      console.log(resp);
      let data = resp.data;
      setTotalCases(data.totalCases);
      setTotalCasesInLast24Hrs(data.totalCasesInLast24Hrs);
      setTotalLabTest(data.totalLabTest);
      setTotalConfirmedCases(data.totalConfirmedCases);
      setTotalIsolatedCases(data.totalIsolatedCases);
      setTotalRecoveredCases(data.totalRecoveredCases);
      setTotalDeathCases(data.totalDeathCases);

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
      minWidth: '1000px !important',
      height: '800px'
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
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
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


  return (
    <React.Fragment>
      <Header loginHandler={loginHandler} />
      <br></br><br></br><br></br><br></br><br></br>
      <Grid container direction="row" spacing={1} style={{padding:'50px', display: 'flex'}}>
     { (localStorage.getItem("name") !== undefined && localStorage.getItem("name") !== null && localStorage.getItem("name").trim() !== "") ? (
      
      <><Card variant="outlined" sx={{ minWidth: 320 , padding: '10px', marginRight:'50px', marginBottom:'40px'}}>
        <Typography level="h2" sx={{ fontSize: 'md', mt: 2 }}>
          TOTAL CASES
        </Typography>
        <Typography variant='h5'fontWeight={700} fontFamily={'fantasy'}  color='rgb(38, 38, 115)'>
          {totalCases}
        </Typography>
    </Card>


    <Card variant="outlined" sx={{ minWidth: 320, padding: '10px' , marginRight:'50px', marginBottom:'40px'}}>
        <Typography level="h2" sx={{ fontSize: 'md', mt: 2 }}>
         TOTAL CASES IN LAST 24 HOURS
        </Typography>
        <Typography variant='h5'fontWeight={700} fontFamily={'fantasy'} color='rgb(38, 38, 115)' >
        {totalCasesInLast24Hrs}
        </Typography>
    </Card>


    <Card variant="outlined" sx={{ minWidth: 320, padding: '10px' , marginRight:'50px', marginBottom:'40px'}}>
        <Typography level="h2" sx={{ fontSize: 'md', mt: 2 }}>
         TOTAL LAB TEST
        </Typography>
        <Typography variant='h5'fontWeight={700} fontFamily={'fantasy'}  color='rgb(38, 38, 115)'>
        {totalLabTest}
        </Typography>
    </Card>


    <Card variant="outlined" sx={{ minWidth: 320, padding: '10px' , marginRight:'50px', marginBottom:'40px'}}>
        <Typography level="h2" sx={{ fontSize: 'md', mt: 2 }}>
         TOTAL CONFIRMED CASES
        </Typography>
        <Typography variant='h5'fontWeight={700} fontFamily={'fantasy'} color='rgb(38, 38, 115)' >
        {totalConfirmedCases}
        </Typography>
    </Card>


    <Card variant="outlined" sx={{ minWidth: 320, padding: '10px' , marginRight:'50px', marginBottom:'40px'}}>
        <Typography level="h2" sx={{ fontSize: 'md', mt: 2 }}>
        TOTAL ISOLATED CASES
        </Typography>
        <Typography variant='h5'fontWeight={700} fontFamily={'fantasy'} color='rgb(38, 38, 115)' >
        {totalIsolatedCases}
        </Typography>
    </Card>


    <Card variant="outlined" sx={{ minWidth: 320, padding: '10px' , marginRight:'50px', marginBottom:'40px'}}>
        <Typography level="h2" sx={{ fontSize: 'md', mt: 2 }}>
        TOTAL RECOVERED CASES
        </Typography>
        <Typography variant='h5'fontWeight={700} fontFamily={'fantasy'}  color='rgb(38, 38, 115)'>
        {totalRecoveredCases}
        </Typography>
    </Card>


    <Card variant="outlined" sx={{ minWidth: 320, padding: '10px' , marginRight:'50px', marginBottom:'40px'}}>
        <Typography level="h2" sx={{ fontSize: 'md', mt: 2 }}>
        TOTAL DEATH CASES
        </Typography>
        <Typography variant='h5'fontWeight={700} fontFamily={'fantasy'} color='rgb(38, 38, 115)'>
        {totalDeathCases}
        </Typography>
    </Card>
    </>
    ):(<><img src={image} className="img" style={{ height: '500px' }}></img>
    <img src={image1} className="img" style={{ height: '500px' }}></img></>)}
      </Grid>
    </React.Fragment>
  );
}