import React, { useState } from 'react';
import { Navigate } from "react-router-dom";
import { useCallback } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Container,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  SvgIcon,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import GetAppIcon from '@material-ui/icons/GetApp';

import { Award as Artifact } from 'react-feather';
import { Send as Activity } from 'react-feather';
import { MessageCircle as Text } from 'react-feather';

//import Toolbar from './Toolbar';
import Toolbar from '../../post/PostView/Toolbar';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
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

let formData = {
  title: "",
  typePost: "",
  isHomepage: true
}

const Post = ({ className, ...rest }) => {
  const classes = useStyles();
  const [redirect, setRedirect] = useState(null);

  // Callback function to communicate bettween parent and child component
  const updateForm = useCallback((field, value) => {
    //formData[field] = value;
    if(field=="redirect") {
      setRedirect(value);
    }
  }, []);

  if (redirect) {
    const toLink = "/post?typePost="+formData.typePost;
    return <Navigate to={toLink} />
  }

  return (
    <Container maxWidth={false}>

    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >

      <Toolbar 
        formData={formData}
        updateForm={updateForm}
      />

    </Card>
  </Container>
  );
};

Post.propTypes = {
  className: PropTypes.string,
  //product: PropTypes.object.isRequired
};

export default Post;
