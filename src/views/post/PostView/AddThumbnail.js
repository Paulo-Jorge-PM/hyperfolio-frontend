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

import Not from '@material-ui/icons/NotInterested';

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
      background:'#90EE90'
    }
  }
}));

const Assets = ({ className, formData, handleClose, ...rest }) => {

  const classes = useStyles()

  const [open, setOpen] = React.useState(false);

  if(formData.thumbnail.length>0) {
    var id = formData.thumbnail[0].id;
  }
  else {
    var id = null;
  }

  const [thumbnailID, setThumbnailID] = React.useState(id);
  const [assets, setAssets] = React.useState(formData.assets);

  const [selectedFileID, setSelectedFileID] = React.useState(null);
  const [selectedFileType, setSelectedFileType] = React.useState(null);



function selectThumbnail(id, type) {
  setSelectedFileID(id);
  setSelectedFileType(type);

  formData.assets.forEach((item) => {
    if(item.id==id) {
      formData.thumbnail = [item];
      setThumbnailID(formData.thumbnail[0].id);
    }
  });
}


  return (

<Box>
        <DialogTitle id="form-dialog-title">
          Illustration

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
            Select an illustration from the uploaded assets. Illustrations highlight your creations. Or create one <a href="http://0.0.0.0:8866/" target="_blank">here</a>.
          </DialogContentText>


          <div style={{ position:"relative"}}>

            <Typography style={{ position:'absolute', top:'9px', right:'15px' }}><strong>{selectedFileType}</strong></Typography>

            <Grid className={classes.fileTypes} style={{ paddingRight: '100px' }}>
              <Tooltip TransitionComponent={Zoom} title="Image">
              <Image className={selectedFileType=="Image" ? classes.iconOn : classes.iconOff} />
              </Tooltip>

              <Tooltip TransitionComponent={Zoom} title="Video">
              <Video className={selectedFileType=="Video" ? classes.iconOn : classes.iconOff} />
              </Tooltip>

              <Tooltip TransitionComponent={Zoom} title="Sound">
              <Sound className={selectedFileType=="Sound" ? classes.iconOn : classes.iconOff} />
              </Tooltip>

              <Tooltip TransitionComponent={Zoom} title="Animation">
              <Animation className={selectedFileType=="Animation" ? classes.iconOn : classes.iconOff} />
              </Tooltip>


            </Grid>

          </div>

          {assets.length == 0 ? 
            <DialogContentText><br /><em>First add assets. Images, Videos, Animations and Sounds will be showcased here.</em></DialogContentText>
            : "" }

        </DialogContent>



<Grid style={{ paddingRight: '20px', paddingLeft: '15px' }}>
      <List component="nav" aria-label="secondary mailbox folders">
      {assets.map((asset) => 
        <ListItem key={asset.originalName} button className={["Image", "Video", "Animation", "Sound"].includes(asset.fType) ? classes.delItem : classes.hidden} style={{ borderBottom:'1px dashed #333333', marginBottom:'5px' }} onClick={() => selectThumbnail(asset.id, asset.fType)}>
          {asset.id == thumbnailID ?
          <Done style={{ marginRight:'15px', color:"green" }} /> : <Not style={{ marginRight:'15px' }} /> } <ListItemText primary={"File: "+asset.originalName+" | Type: "+asset.fType} />
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
