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

const POSTS_URL = 'http://127.0.0.1:8003/posts/';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function Sparql() {
  const classes = useStyles();

  const generalUpdate = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    //updateCSS(value);
  }

  var defaultQ = `select ?skill where { 
  ?o a <http://data.europa.eu/esco/model#Skill> .
  ?o <http://www.w3.org/2004/02/skos/core#prefLabel> ?skill .
  FILTER langMatches( lang(?skill), "en" ) .
  } LIMIT 200`;

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
          label="Sparql query"
          name="body"
          multiline
          rows={2}
          rowsMax={10}
          variant="outlined"
          fullWidth={true}
          defaultValue={defaultQ}


          onChange={generalUpdate}
        />

        </CardContent>
        </Card>

    </Paper>
  );
}
