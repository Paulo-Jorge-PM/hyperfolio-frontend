import React from 'react';
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

import Toolbar from './Toolbar';


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

const Post = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Container maxWidth={false}>

    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="left"
          alignItems="center"
          mb={3}
          style={{position: 'relative'}}
        >
          <Avatar
            className={classes.userPhoto}
            alt="User Photo"
            src=""
            variant="square"
          />

            <Toolbar />

        </Box>

<Divider />

          <Grid style={{paddingTop: "10px"}}
            direction="row"
            justify="center"
            alignItems="center"
            spacing={8}
            container
          >

          <Grid item style={{paddingBottom: "20px"}}>
          <Button className={classes.importButton} 
            //color="primary"
            variant="contained"
          >
            Did this! &nbsp; <SvgIcon
              fontSize="small"
              //color="action"
            >
              <Artifact />
            </SvgIcon>
          </Button>
          </Grid>

          <Grid item style={{paddingBottom: "20px"}}>
          <Button className={classes.exportButton} 
            //color="primary"
            variant="contained"
          >
            Lived this! &nbsp; <SvgIcon
              fontSize="small"
              //color="action"
            >
              <Activity />
            </SvgIcon>
          </Button>
          </Grid>

          <Grid item style={{paddingBottom: "20px"}}>
          <Button 
            //color="primary"
            variant="contained"
          >
            Said this! &nbsp; <SvgIcon
              fontSize="small"
              //color="action"
            >
              <Text />
            </SvgIcon>
          </Button>
          </Grid>

        </Grid>
      </CardContent>
    </Card>
  </Container>
  );
};

Post.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired
};

export default Post;
