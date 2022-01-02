import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  ButtonBase,
  Typography,
  Card,
  Grid,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  makeStyles
} from '@material-ui/core';


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

const FormAssets = ({ className, ...rest }) => {
  const classes = useStyles();

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
                  ADD ASSETS
                  <span className={classes.imageMarked} />
                </Typography>
              </span>
            </ButtonBase>
          </Grid>
          <Grid item xs={6}>
            <ButtonBase
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
                  ADD ILLUSTRATION
                  <span className={classes.imageMarked} />
                </Typography>
              </span>
            </ButtonBase>
          </Grid>
        </Grid>


        </CardContent>

      </Card>
  );
};

FormAssets.propTypes = {
  className: PropTypes.string
};

export default FormAssets;
