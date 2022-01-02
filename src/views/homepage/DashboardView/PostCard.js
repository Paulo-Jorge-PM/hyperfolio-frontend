import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  SvgIcon,
  IconButton,
  Badge,
  Container,
  Card,
  CardMedia,
  CardHeader,CardActionArea,
  CardContent,
  Divider,
  Link,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';

//ICONS
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import GetAppIcon from '@material-ui/icons/GetApp';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MessageIcon from '@material-ui/icons/Message';

import { Award as Artifact } from 'react-feather';
import { Send as Activity } from 'react-feather';
import { MessageCircle as Text } from 'react-feather';

import Page from 'src/components/Page';
import {
  MoreHorizontal as MoreHorizontal,
  Paperclip as Paperclip,
} from 'react-feather';

const componentsMap = { Artifact, Activity, Text };

function TypePOst(props) {
  const type = props.type;
  if (type=="Artifact") {
  return (
    <React.Fragment>
      <Artifact />;
      <Typography>
      DID THIS!
      </Typography>
    </React.Fragment>
  )
  }
  else if (type=="Activity") {
    return <Activity />;
  }
  else if (type=="Text") {
    return <Text />;
  }
  /*const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;*/
}

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

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -15,
    top: 4,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

const PostCard = ({ className, post, ...rest }) => {
  const classes = useStyles();

  return (
    <Card style={{position:"relative", overflow:"visible"}}
      className={clsx(classes.root, className)}
      {...rest}
    >

      <CardContent>

      <Card style={{position:"absolute", top:"0px", left:"-46px", padding:"5px 10px"}}>
      <SvgIcon 
              fontSize="medium"
              color="action"
            >
              <TypePOst type={post.typePost} />
            </SvgIcon>
        </Card>

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
            src={`/static/images/avatars/avatar_${post.user}.png`}
            variant="square"
          />

            <Box
              display="block"
              justifyContent="left"
              flexDirection="row"
              alignItems="top"
              lineHeight={0}
            >
              <Typography display="block" className={classes.userName} color="textSecondary" m={20} p={30} lineHeight={0}>
              Paulo Martins
              </Typography>

              <Typography display="block" 
              color="textSecondary" 
              m={0} 
              p={0} 
              lineHeight={0}
              variant="body2"
              >
              Engenheiro Informático
              </Typography>
            </Box>


            <Box
              display="block"
              justifyContent="right"
              flexDirection="row-reverse"
              alignItems="center"
              style={{position: 'absolute', top:0, right: 0}}
            >
            <Typography display="block" color="textSecondary" m={0} p={0} lineHeight={0}>
              <Link
              href="#"
              >
              <MoreHorizontal />
              </Link>
            </Typography>
            </Box>

        </Box>

        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          {post.title}
        </Typography>
</CardContent>


     <CardMedia
        className={classes.media}
        component="img"
        src={`/static/images/artifacts/${post.thumbnail}`}
        title="Artifact"
      />

<CardContent>
        <Typography
          align="left"
          color="textPrimary"
          variant="body1"
        >
          {post.body}
        </Typography>
      </CardContent>


      <Box flexGrow={1} />
      <Divider />
      <Box p={2}>
        <Grid
          container
          justify="space-between"
          spacing={2}
        >
          <Grid
            className={classes.statsItem}
            item
          >



        <IconButton aria-label="cart" p={0} title="Vote up" style={{padding:'0px', marginRight:'26px'}}>
          <StyledBadge badgeContent='99' color="secondary">
            <ArrowUpwardIcon />
          </StyledBadge>
        </IconButton>

        <IconButton aria-label="cart" p={0} title="Vote down" style={{padding:'0'}}>
            <ArrowDownwardIcon />
        </IconButton>




         {/*<Link
          href="#"
          >
            <ArrowUpwardIcon 
          />
          </Link>

         <Link
          href="#"
          >
            <ArrowDownwardIcon 
              color="action"
            />
          </Link>

          <Typography
            color="textSecondary"
            display="inline"
            variant="body2"
          >
          (55)
          </Typography>
          */}


            <Box
            display="flex"
            align="left"
            alignItems="center"
            pl={2}
            >
              <AccessTimeIcon
                className={classes.statsIcon}
                color="action"
              />
              <Typography
                color="textSecondary"
                display="inline"
                variant="body2"
              >
                Updated: 2h
              </Typography>
            </Box>

            <Box
            display="flex"
            align="left"
            alignItems="center"
            pl={2}
            >
              <AttachFileIcon
                color="action"
              />
              <Typography
                color="textSecondary"
                display="inline"
                variant="body2"
              >
                Assets: 3 {' '}
              </Typography>
            </Box>
          </Grid>
          
          <Grid
            className={classes.statsItem}
            item
          >
            <GetAppIcon
              className={classes.statsIcon}
              color="action"
            />
            <Typography
              color="textSecondary"
              display="inline"
              variant="body2"
            >
              {post.views}
              {' '}
              Clicks
            </Typography>
          </Grid>


        </Grid>
      </Box>
    </Card>
  );
};

PostCard.propTypes = {
  className: PropTypes.string,
  post: PropTypes.object.isRequired
};

export default PostCard;
