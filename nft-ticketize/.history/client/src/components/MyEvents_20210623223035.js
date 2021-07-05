import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { EnvConstant} from "../const";
import Async from 'react-async';
import { firebase } from '@firebase/app';
import { useHistory } from "react-router-dom";
import LoadingOverlay from 'react-loading-overlay';
import { ethers } from "ethers";
import '@firebase/database';


// Styles template
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});


//const deployedContract = zilliqa.contracts.at(EnvConstant.contractAddress);

// Firebase initialization
if (!firebase.apps.length) {
  firebase.initializeApp(EnvConstant.firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}
const dbRef = firebase.database().ref();

// Ethers.js initialization
const provider = new ethers.providers.Web3Provider(window.ethereum); 
const NFTicketizeContractArt = require( "../contracts/NFTicketize.json");

// IPFS initialization
const IPFS = require('ipfs-core');

function EventsDetail() {  
  let history = useHistory();

  // Get my projects
  const getMyEvents = async () => {
    return [];
  }

  // Get project detail from database
  const getEventsDetail = async(projectKey) =>  {
      return dbRef.child("projects").child(projectKey).get().then((snapshot) => {
        if (snapshot.exists()) {
          var obj = snapshot.val();
          obj.key = projectKey;
          return obj;
        } else {
          return null;
        }
      }).catch((error) => {
        console.error(error);
        return null;
      });
  }

  const classes = useStyles();

  // Go to project detail page
  const navigateToDetailPage = (projectKey, projectName) =>{
    history.push('/project_detail', {"projectKey": projectKey, "myProject": "true", "projectName": projectName});
  };

  return (<div>
    <Async promiseFn={getMyEvents}>
      <Async.Loading>Loading...</Async.Loading>
      <Async.Fulfilled>
        {data => {
        return (
          <Grid container spacing={3} direction='column'>
            {data.map(project=> (
              <Grid item xs>
                    <Card className={classes.root}>
                      <CardContent>
                        <Typography variant="h5" component="h2">
                        {project.name}
                        </Typography>  
                        <Typography variant="body2" component="p">
                        {project.description}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" onClick={()=>navigateToDetailPage(project.key, project.name)}>Detail</Button>
                      </CardActions>
                    </Card>
                </Grid>
            ))}
          </Grid>
        )
      }}
        
      </Async.Fulfilled>
      <Async.Rejected>
        {error => `Something went wrong: ${error.message}`}
      </Async.Rejected>
    </Async>
  </div>);
}

function ButtonsBox({ onReloadList, onSetOverlay}) {

  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [nameValidation, setNameValidation] = React.useState(false);
  const [description, setDescription] = React.useState("");
  const [descriptionValidation, setDescriptionValidation] = React.useState(false);
  const [location, setLocation] = React.useState("");
  const [locationValidation, setLocationValidation] = React.useState(false);
  const [locationAddress, setLocationAddress] = React.useState("");
  const [locationAddressValidation, setLocationAddressValidation] = React.useState(false);
  const [startTime, setStartTime] = React.useState("");
  const [startTimeValidation, setStartTimeValidation] = React.useState(false);

  // Dialog button open
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Diallog button close
  const handleClose = () => {
    setOpen(false);
  };
  
  // Create new event - button
  const handleCreateNewEvent = () => {
    // Validation for event name
    if (!name){
      setNameValidation(true);
      return;
    } else {
      setNameValidation(false);
    }

    // Validation for event description
    if (!description) {
      setDescriptionValidation(true);
      return;
    } else {
      setDescriptionValidation(false);
    }

    // Validation for event location
    if (!location) {
      setLocationValidation(true);
      return;
    } else {
      setLocationValidation(false);
    }

    // Validation for event location address
    if (!locationAddress) {
      setLocationAddressValidation(true);
      return;
    } else {
      setLocationAddressValidation(false);
    }

    // Validation for event start time
    if (!startTime) {
      setStartTimeValidation(true);
      return;
    } else {
      setStartTimeValidation(false);
    }


    createEvent();

    //Close event create dialog
    //setOpen(false);
  };

  const createEvent = async () => {

    const nftTicketizeContract = new ethers.Contract(EnvConstant.contractAddress, NFTicketizeContractArt.abi, provider);

    //Insert into IPFS
    const ipfs = await IPFS.create();
    const { cid } = await ipfs.add('Hello world');
    console.info(cid);

    for await (const file of ipfs.get(cid.string)) {
      console.log(file.type, file.path)
    
      if (!file.content) continue;
    
      const content = []
    
      for await (const chunk of file.content) {
        content.push(chunk)
      }
    
    
    }

    ipfs.files.get(cid.string, function (err, files) {
      files.forEach((file) => {
      console.log(file.path)
      console.log("File content >> ",file.content.toString('utf8'))
      })
    })

    const rm = await ipfs.files.rm(cid.string)

    for await (const file of ipfs.ls(cid.string)) {
      console.log(file.path)
    }

    //Convert time to milliseconds
    var startTimeObj = new Date(startTime);
    var startTimeMilliseconds = startTimeObj.getTime() / 1000;

    //Insert into smart contract
    const signer = provider.getSigner()
    const nftTicketizeContractWithSigner = nftTicketizeContract.connect(signer);
    var result = await nftTicketizeContractWithSigner.createEvent(startTimeMilliseconds);


    console.log(result);
  }

    return (
      <div>
        <Box m={2} pt={1}>
          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            New event
          </Button>
        </Box>
        <Dialog open={open} validate onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">New event</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="event_name"
              label="Event name"
              required
              fullWidth
              onChange={event => {
                setName(event.target.value);
              }}
              error={nameValidation}
            />
            <TextField
              margin="dense"
              id="event_description"
              label="Event description"
              required
              multiline
              rows={4}
              fullWidth
              onChange={event => {
                setDescription(event.target.value);
              }}
              error={descriptionValidation}
            />
            <TextField
              margin="dense"
              id="location"
              label="Location"
              required
              fullWidth
              onChange={event => {
                setLocation(event.target.value);
              }}
              error={locationValidation}
            />
            <TextField
              margin="dense"
              id="location_address"
              label="Location address"
              required
              fullWidth
              onChange={event => {
                setLocationAddress(event.target.value);
              }}
              error={locationAddressValidation}
            />
            <TextField
              margin="dense"
              id="start_time"
              label="Start time"   
              required
              fullWidth
              type="datetime-local"
              onChange={event => {
                setStartTime(event.target.value);
              }}
              InputLabelProps={{
                shrink: true,
              }}
              error={startTimeValidation}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClose()} color="primary">
              Cancel
            </Button>
            <Button onClick={() => handleCreateNewEvent()} color="primary">
              Create New
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}

function MyEvents() {

  const [reloadList, setReloadList] = React.useState(false);
  const [isActiveOverlay, setIsActiveOverlay] = React.useState(false);

  const reloadListFunc = () => {
    setReloadList(true);
  }

  // Set loading overlay
  const setOverlayFunc = (value) => {
    setIsActiveOverlay(value);
  }

  useEffect(() => {
    setReloadList(false);
 }, [reloadList]);

  return (
    <LoadingOverlay
      active={isActiveOverlay}
      spinner
      text='Waiting for response...'
      styles={{
        wrapper: {
          overflow: isActiveOverlay ? 'hidden' : 'visible'
        }
      }}
    >
      <div>
          <Box m={2} pt={1}>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <h4>My events</h4>
            </div>
          </Box>
          <ButtonsBox onReloadList={reloadListFunc} onSetOverlay={setOverlayFunc}>
          </ButtonsBox>
          <EventsDetail>
          </EventsDetail>      
      </div>
    </LoadingOverlay>
  );
}

export default MyEvents;