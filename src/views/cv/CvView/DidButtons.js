import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Grid,
  Divider,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
  makeStyles
} from '@material-ui/core';
import { PenTool as PenTool } from 'react-feather';

import Fab from '@material-ui/core/Fab';
import { Award as Artifact } from 'react-feather';
import { Send as Activity } from 'react-feather';
import { MessageCircle as Text } from 'react-feather';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  },
  userName: {
    fontWeight: 'bold',
    color:'#000000'
  },
  userPhoto: {
    borderRadius:'50%',
    marginRight:'10px',
  }
}));



const DidButtons = ({pressButton, did, lived, said}) => {

  const classes = useStyles();

  return (
        <Grid style={{paddingTop: "10px"}}
          direction="row"
          justify="center"
          alignItems="center"
          spacing={8}
          container
        >

          <Grid item style={{paddingBottom: "20px"}}>
          <Fab
            variant="extended"
            size="small"
            aria-label="add"
            color={did ? "primary":"default"}
            style={{paddingLeft:'15px',paddingRight:'15px'}}
            onClick={() => pressButton('Artifact')}
          >

            Did this!&nbsp;<SvgIcon
                fontSize="small"
                //color="action"
              >
                <Artifact />
              </SvgIcon>
          </Fab>
          </Grid>

          <Grid item style={{paddingBottom: "20px"}}>
          <Fab
            variant="extended"
            size="small"
            color={lived ? "primary":"default"}
            aria-label="add"
            style={{paddingLeft:'15px',paddingRight:'15px'}}
            onClick={() => pressButton('Activity')}
          >
            Lived this!&nbsp;<SvgIcon
                fontSize="small"
                //color="action"
              >
                <Activity />
              </SvgIcon>
          </Fab>
          </Grid>

          <Grid item style={{paddingBottom: "20px"}}>
          <Fab
            variant="extended"
            size="small"
            color={said ? "primary":"default"}
            aria-label="add"
            style={{paddingLeft:'15px',paddingRight:'15px'}}
            onClick={() => pressButton('Text')}
          >
            Said this!&nbsp;<SvgIcon
                fontSize="small"
                //color="action"
              >
                <Text />
              </SvgIcon>
          </Fab>
          </Grid>
        </Grid>
  );
};

export default DidButtons;