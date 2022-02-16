import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Paper,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
}));



const StyleCV = ({selectedPosts, updateCSS, defaultCSS}) => {

  const classes = useStyles();

  const generalUpdate = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    updateCSS(value);
  }

  return (
    <Paper elevation={1} style={{background:"#FFFFFF"}}>
      
      <Card>
        {/*<CardHeader
          subheader="Custom the default portfolio template wth your own CSS."
          title="2. Portfolio Template"
        />*/}
        <Divider />
        <CardContent>

        <TextField
          id="filled-multiline-flexible"
          label="CSS"
          name="body"
          multiline
          rows={2}
          rowsMax={10}
          variant="outlined"
          fullWidth={true}
          defaultValue={defaultCSS}

          onChange={generalUpdate}
        />

        </CardContent>
        </Card>

    </Paper>
  );
};

export default StyleCV;