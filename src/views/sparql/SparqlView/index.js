import React, { useState } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';

import Sparql from './Sparql';

const POSTS_URL = 'http://127.0.0.1:8003/posts/';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

var getPosts = []

export default function SparqlView() {
  const classes = useStyles();

  const [userPosts, setUserPosts] = useState([]);

  function getPosts() {
      fetch(POSTS_URL+'?user=1', {
          method: 'GET',
          headers: {
            'Authorization': 'Basic '+btoa(global.config.AUTH.STARDOG.user+':'+global.config.AUTH.STARDOG.pass),
            'Accept': 'application/json',
          },
        })
      .then(response => response.json())
      .then(data => setUserPosts(data) )
  }

  return (
    <Page
      className={classes.root}
      title="Sparql"
    >
      <Container maxWidth="lg">
        <Sparql userPosts={userPosts} />
      </Container>
    </Page>
  );
};


