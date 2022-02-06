// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import React, { useEffect, useState, useRef } from 'react';
import fetch from 'cross-fetch';

import axios from 'axios';

import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import {
  Grid,
  Box,
  Button,
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle,
  makeStyles,
  Input, 
  InputLabel,
  Typography
} from '@material-ui/core';

import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import DeleteForever from '@material-ui/icons/DeleteForever';

// Files
import Image from '@material-ui/icons/PhotoCamera';
import Document from '@material-ui/icons/Description';
import Animation from '@material-ui/icons/DirectionsRun';
import Video from '@material-ui/icons/OndemandVideo';
import Sound from '@material-ui/icons/Mic';
import Model from '@material-ui/icons/Apartment';
import Misc from '@material-ui/icons/Extension';

import Done from '@material-ui/icons/CheckCircleOutline';


const ASSETS_URL = 'http://127.0.0.1:8003/assets/';

const useStyles = makeStyles((theme) => ({
  uploadFile: {
    background:"#f4f6f8",
    boxSizing: 'border-box',
    padding:'5px',
    border:'1px solid #ffffff',
    borderBottom: '1px solid #e0e0e0',
    '&:hover': {
      border:'1px dashed #333333',
      borderBottom:'1px dashed #333333',
      textDecoration:'none',
      boxSizing: 'border-box',
    },
    '& *:hover': {
      textDecoration:'none !important',
      borderBottom:'none !important'
    },
    '& *': {
      textDecoration:'none !important',
      borderBottom:'none !important'
    }
  },
  fileTypes: {
    background:"#f4f6f8",
    padding:'7px',
    '& *': {
      padding:"3px",
      margin:"5px",
      fontSize:"52px",
      border: '#3f51b5 solid 3px',
    },
    '& *:hover': {
      color:'#3f51b5',
      border: '#3f51b5 solid 3px',
      cursor: 'pointer'
    },
  },
  iconOff: {
    color:'#333333',
    border: '#333333 solid 3px',
  },
  iconOn: {
    color:'#3f51b5',
    border: '#3f51b5 solid 3px',
  },
  hidden: {
    display: "none",
  },
  importLabel: {
    color: "black",
  },
  delItem: {
    '&:hover': {
      background:'#ffcccb'
    }
  }
}));

const Assets = ({ className, formData, handleClose, ...rest }) => {

  const classes = useStyles()

  const [open, setOpen] = React.useState(false);

  const [assets, setAssets] = React.useState(formData.assets);

  const [selectedFile, setSelectedFile] = React.useState(null)
  const [selectedFileType, setSelectedFileType] = React.useState(null)

  const [uploadsDone, setUploadsDone] = React.useState([]);


function addEntry() {
  //setAssets(assets => assets.concat(selectedFile.name));
  //alert(JSON.stringify(test));
  //formData.assets = formData.assets.concat(selectedFile.name);
  //let upData = {originalName: selectedFile.name, fType: selectedFileType, done: false}
  //setUploadsDone([...uploadsDone, upData])

  //setUploadsDone([...uploadsDone, selectedFile.name]);

  if(selectedFile) {
    let data = {id:"", user:formData.user, fName:"", fLink:"", fType:selectedFileType, originalName:selectedFile.name };

    setAssets([...assets, data]);

    onFileUpload();
  }

  /*setUploadsDone([77], () => {
    onFileUpload();
  })*/

  
}


/*useEffect(() => {
  if(uploadsDone.lenght>0) {
    onFileUpload();
  }
}, [uploadsDone]);*/


function listRemove(asset) {
  //setAssets(assets.filter(item => item !== asset));
  //formData.assets = formData.assets.filter(item => item !== asset);
  formData.assets = formData.assets.filter(item => item.originalName !== asset);
  setAssets(formData.assets);
  let upNew = uploadsDone.filter(item => item.originalName !== asset);
  setUploadsDone(upNew);
}

// On file select 
function onFileChange(event) {
    // Update the state 
    setSelectedFile(event.target.files[0]);

    setFileType(event.target.files[0].name, event.target.files[0].type);
    //this.setState({ selectedFile: event.target.files[0] });
}; 


// On file select 
function setFileType(fName, fType) {

  let extension = fName.split(".").pop();

  const images = ["jpg", "jpeg", "png"]
  const documents = ["doc", "docx", "odt", "pdf", "txt"]
  const animations = ["gif"]
  const videos = ["mp4"]
  const sounds = ["mp3","wav"]
  const models = ["blend", "stl", "obj", "fbx", "dae", "max"]

  if (images.includes(extension)) {
    setSelectedFileType("Image");
  }
  else if (documents.includes(extension)) {
    setSelectedFileType("Document");
  }
  else if (animations.includes(extension)) {
    setSelectedFileType("Animation");
  }
  else if (videos.includes(extension)) {
    setSelectedFileType("Video");
  }
  else if (sounds.includes(extension)) {
    setSelectedFileType("Sound");
  }
  else if (models.includes(extension)) {
    setSelectedFileType("3DModel");
  }
  else {
    setSelectedFileType("Misc");
  }
  
}; 

// On file upload (click on the add button)
// async function onFileUpload() {
function onFileUpload() {

  // Create an object of formData 
  let form = new FormData();
 
  //alert(selectedFile.type)

  // Update the formData object 
  form.append(
    "user",
    formData.user
  );

  form.append(
    "fileTye",
    selectedFileType
  );

  form.append(
    "fileUpload",
    selectedFile,
    selectedFile.name
  );

  // Send formData object 
  const requestOptions = {
      method: 'POST',
      headers: { 
        'Authorization': 'Basic cGF1bG86YWRtaW4=',
        'Accept': 'application/json',
        //'Content-Type': 'application/json',
        //'Content-Type': 'application/x-www-form-urlencoded',
        // => Seting Content-Type results in 403 error for the formData (no idea why), so don't set it
        //'Content-Type': 'multipart/form-data',
      },
      body: form
  };

  fetch(ASSETS_URL, requestOptions)
  .then(response => response.json())
  .then(data => {
    let fName = data.fileUpload.split("/").pop();
    let originalName = fName.split("_").slice(1).join("");
    let newAsset = {id:data.id, user:data.user, fName:fName, fLink:data.fileLink, fType:data.fileTye, originalName:originalName };
    formData.assets = formData.assets.concat(newAsset);
    //setAssets([...assets, newAsset]);
    setAssets(formData.assets);

    /*let upUpdate = [];
    uploadsDone.forEach((item) => {
      alert(JSON.stringify(item));
      if(item.originalName ==originalName) {
        item.done=true;
      }
      upUpdate.concat(item);
    });
    setUploadsDone([...uploadsDone, originalName]);*/
    //alert(JSON.stringify(upUpdate));
    //setUploadsDone(upUpdate);
    
    //alert(JSON.stringify(data));
  })
  .catch(error => alert("Error - Refresh page and try again"));
  
}; 

  return (

<Box>
        <DialogTitle id="form-dialog-title">
          Assets

          <Button onClick={() => handleClose()} color="primary" size="small" variant="outlined" style={{position: 'absolute', right: '25px'}}>
            Done
          </Button>
        </DialogTitle>

        {/*<DialogActions>
          <Button onClick={false} color="primary">
            Add
          </Button>
        </DialogActions>*/}

        <DialogContent>
          <DialogContentText>
            Add assets that testify your creation. Share your work with the world.
          </DialogContentText>


          <div style={{ position:"relative"}}>

            <InputLabel htmlFor="import-button" className={classes.uploadFile}>
                <Input
                    id="import-button"
                    /*inputProps={{
                      accept:
                        ".csv, .jpg, .jpeg, .gif, application/vnd.ms-excel",
                    }}*/
                    onChange={onFileChange}
                    name="fileUpload"
                    type="file"
                    /*value={""}*/
                />
            </InputLabel>

            <Typography style={{ position:'absolute', top:'9px', right:'15px' }}><strong>{selectedFileType}</strong></Typography>

            <Grid className={classes.fileTypes} style={{ paddingRight: '100px' }}>
              <Tooltip TransitionComponent={Zoom} title="Image">
              <Image onClick={ () => setSelectedFileType("Image") } className={selectedFileType=="Image" ? classes.iconOn : classes.iconOff} />
              </Tooltip>

              <Tooltip TransitionComponent={Zoom} title="Video">
              <Video onClick={ () => setSelectedFileType("Video") } className={selectedFileType=="Video" ? classes.iconOn : classes.iconOff} />
              </Tooltip>

              <Tooltip TransitionComponent={Zoom} title="Sound">
              <Sound onClick={ () => setSelectedFileType("Sound") } className={selectedFileType=="Sound" ? classes.iconOn : classes.iconOff} />
              </Tooltip>

              <Tooltip TransitionComponent={Zoom} title="Document">
              <Document onClick={ () => setSelectedFileType("Document") } className={selectedFileType=="Document" ? classes.iconOn : classes.iconOff} />
              </Tooltip>

              <Tooltip TransitionComponent={Zoom} title="Animation">
              <Animation onClick={ () => setSelectedFileType("Animation") } className={selectedFileType=="Animation" ? classes.iconOn : classes.iconOff} />
              </Tooltip>

              <Tooltip TransitionComponent={Zoom} title="3DModel">
              <Model onClick={ () => setSelectedFileType("3DModel") } className={selectedFileType=="Model" ? classes.iconOn : classes.iconOff} />
              </Tooltip>

              <Tooltip TransitionComponent={Zoom} title="Misc">
              <Misc onClick={ () => setSelectedFileType("Misc") } className={selectedFileType=="Misc" ? classes.iconOn : classes.iconOff} />
              </Tooltip>


            </Grid>

            <Button onClick={addEntry} color="primary" size="large" variant="contained" style={{ position: 'absolute', bottom:'10px', right: '15px' }}>
              Add
            </Button>
          </div>

        </DialogContent>

<Grid style={{ paddingRight: '20px', paddingLeft: '15px' }}>
      <List component="nav" aria-label="secondary mailbox folders">
      {assets.map((asset) => 
        <ListItem key={asset.originalName} button className={classes.delItem} style={{ borderBottom:'1px dashed #333333', marginBottom:'5px' }} onClick={() => listRemove(asset.originalName)}>
          {asset.fName == "" ?
          <CircularProgress style={{ marginRight:'15px' }} /> : <Done style={{ marginRight:'15px', color:"green" }} /> } <ListItemText primary={"File: "+asset.originalName+" | Type: "+asset.fType} />
         <ListItemIcon style={{ paddingLeft:'20px' }}>
            <DeleteForever />
          </ListItemIcon>
        </ListItem>
      )}
      </List>
</Grid>

    </Box>
  );
};

Assets.propTypes = {
  className: PropTypes.string,
};

export default Assets;
