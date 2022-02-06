import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle,
  Typography,
  Card,
  Grid,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  makeStyles
} from '@material-ui/core';

import AddAssets from './AddAssets';
import AddThumbnail from './AddThumbnail';


const useStyles = makeStyles((theme) => ({
  root: {},
  image: {
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important',
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}));

const FormAssets = ({ className, formData, ...rest }) => {
  const classes = useStyles();

  const [openAssets, setOpenAssets] = React.useState(false);
  const [openIllustration, setIllustration] = React.useState(false);

  const handleClickOpenAssets = (number) => {
    setOpenAssets(true);
  };

  const handleClickOpenIllustration = (number) => {
    setIllustration(true);
  };

  const handleClose = (number) => {
    setOpenAssets(false);
    setIllustration(false);
  };


  return (
      <Card>
        <CardHeader
          subheader="Attach your creations"
          title="Assets"
        />
        <Divider />
        <CardContent>

        <Grid style={{marginTop: "0px"}}
          direction="row"
          justify="center"
          alignItems="center"
          spacing={1}
          container
        >
          <Grid item xs={6}>
            <ButtonBase
              onClick={handleClickOpenAssets}

              focusRipple
              key="{image.title}"
              className={classes.image}
              focusVisibleClassName={classes.focusVisible}
              style={{
                width: '100%',
              }}
            >
              <span
                className={classes.imageSrc}
                style={{
                  backgroundImage: `url(/static/images/assets.jpg)`,
                }}
              />
              <span className={classes.imageBackdrop} />
              <span className={classes.imageButton}>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  className={classes.imageTitle}
                >
                  ADD ASSETS{formData.assets.length!=0 ? " (" + formData.assets.length.toString() + ")":""}
                  <span className={classes.imageMarked} />
                </Typography>
              </span>
            </ButtonBase>
          </Grid>
          <Grid item xs={6}>
            <ButtonBase
              onClick={handleClickOpenIllustration}
              
              focusRipple
              key="{image.title}"
              className={classes.image}
              focusVisibleClassName={classes.focusVisible}
              style={{
                width: '100%',
              }}
            >
              <span
                className={classes.imageSrc}
                style={{
                  backgroundImage: `url(/static/images/illustration.jpg)`,
                }}
              />
              <span className={classes.imageBackdrop} />
              <span className={classes.imageButton}>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  className={classes.imageTitle}
                >
                  ADD ILLUSTRATION{formData.thumbnail.length!=0 ? " (" + formData.thumbnail.length.toString() + ")":""}
                  <span className={classes.imageMarked} />
                </Typography>
              </span>
            </ButtonBase>
          </Grid>
        </Grid>



      <Dialog 
            open={openAssets} 
            fullWidth={true}
            maxWidth="md"
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            >

          <AddAssets
            handleClose={handleClose}
            formData={formData}
          />

      </Dialog>


      <Dialog 
            open={openIllustration} 
            fullWidth={true}
            maxWidth="md"
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            >

          <AddThumbnail
            handleClose={handleClose}
            formData={formData}
          />

      </Dialog>



        </CardContent>

      </Card>
  );
};

FormAssets.propTypes = {
  className: PropTypes.string
};

export default FormAssets;
