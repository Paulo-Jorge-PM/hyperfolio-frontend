import React, { Component } from 'react';
import { useState } from 'react';
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
import ChatBubbleOutline from '@material-ui/icons/ChatBubbleOutline';
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



import { Link as RouterLink } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import {
MoveToInbox,
Drafts,
Send,
Settings,
ExitToApp,
DataUsage,
AccountBox,
} from '@material-ui/icons';


const user = {
  avatar: './static/images/avatars/avatar_3.png',
  name: 'Paulo Martins',
  job: 'Engenheiro Informático'
};

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    disableScrollLock={true}
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));


const StyledMenuItem = withStyles((theme) => ({
  root: {
    //'&:focus': {
    //  backgroundColor: theme.palette.primary.main,
    //  '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
    //    color: theme.palette.common.white,
    //  },
    //},
  }
}))(MenuItem);








const componentsMap = { Artifact, Activity, Text };

function TypePost(props) {
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

function TypeThis(props) {
  const type = props.type;
  if (type=="Artifact") {
  return (
    <span>DID THIS!</span>
    )
  }
  else if (type=="Activity") {
  return (
    <span>LIVED THIS!</span>
    )
  }
  else if (type=="Text") {
  return (
    <span>SAID THIS!</span>
    )
  }
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
  },
  postMenu: {
    '&:hover': {
         color: 'red',
      }
  },
  badgeSide: {
    '&:hover': {
         background: '#bdbdbd',
      }
  },
  sideMetadata: {
    fontSize: '14px'
  },
  hidde: {
    display:"none"
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



function editPost(id) {
  //alert(event.currentTarget.getAttribute('name'));
  alert(id);
}








const PostCard = ({ className, post, ...rest }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [hidden, setHidden] = useState(true);

  const classes = useStyles();

  const handleClick = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function badgeEnter(event) {
    //alert(event.currentTarget);
    setHidden(false);
  }

  function badgeExit(event) {
    //alert(event.currentTarget);
    setHidden(true);
  }




  let jobs;
  {if(post.jobs.length!=0) {
    jobs = <Typography color="textSecondary" className={classes.sideMetadata}>
      <p><strong>Jobs:</strong></p>
      {post.jobs.map((item) =>
        <p style={{marginBottom:"5px"}}>{item}</p>
        )}
    </Typography>
    }
  }

  let skills;
  {if(post.skills.length!=0) {
    skills = <Typography color="textSecondary" className={classes.sideMetadata}>
      <p><strong>Skills:</strong></p>
      {post.skills.map((item) =>
        <p style={{marginBottom:"5px"}}>{item}</p>
        )}
    </Typography>
    }
  }

  return (
    <Card style={{position:"relative", overflow:"visible"}}
      className={clsx(classes.root, className)}
      {...rest}
    >

      <CardContent>


      <Box
      style={{position:"absolute", top:"0px", left:"-203px", width:"200px", textAlign:"right"}}
      >

      <Card
        onMouseEnter={badgeEnter}
        onMouseLeave={badgeExit}
        className={classes.badgeSide}
        style={{width:"44px", height:"38px", padding:"5px 10px", position:"absolute", right:"0px"}}
        >

      <SvgIcon 
              fontSize="default"
              color="action"
            >
              <TypePost type={post.typePost} />
            </SvgIcon>
        </Card>


          <Box
            className={ hidden ? classes.hidde : null }
            id="sideMetadata"
            style={{marginTop:"45px", paddingRight:"5px", width:"100%"}}
           >
              <Typography color="textSecondary" style={{ fontSize:"14px" }}>
              <strong><TypeThis type={post.typePost} /></strong>
              </Typography>

              <br />
              {jobs}

              <br />
              {skills}

          </Box>

      </Box>  

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
            >
              <Typography display="block" className={classes.userName} color="textSecondary" m={20} p={30}>
              Paulo Martins
              </Typography>

              <Typography display="block" 
              color="textSecondary" 
              m={0} 
              p={0} 
              variant="body2"
              >
              Investigador / Eng. Informático
              </Typography>
            </Box>


            <Box
              display="block"
              justifyContent="right"
              flexDirection="row-reverse"
              alignItems="center"
              style={{position: 'absolute', top:0, right: 0}}
            >
            <Typography display="block" color="textSecondary" m={0} p={0}>
              <a
              href="#"
              onClick={handleClick}
              className={classes.postMenu}
              >
              <MoreHorizontal />
              </a>


<StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={handleClose}
      >

        <StyledMenuItem onClick={() => {editPost(post.id)} }>
          <ListItemIcon>
            <DataUsage fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Edit" />
        </StyledMenuItem>

        <StyledMenuItem onClick={() => {editPost(post.id)} }>
          <ListItemIcon>
            <Send fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Share" />
        </StyledMenuItem>

        <StyledMenuItem onClick={() => {editPost(post.id)} }>
          <ListItemIcon>
            <Drafts fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Comments" />
        </StyledMenuItem>

        <StyledMenuItem component={RouterLink} to="/settings">
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Privacy" />
        </StyledMenuItem>

        <StyledMenuItem onClick={() => {editPost(post.id)} }>
          <ListItemIcon>
            <ExitToApp fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </StyledMenuItem>
      </StyledMenu>





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

    { post.thumbnail.length > 0 &&
     <CardMedia
        className={classes.media}
        component="img"
        src={`${global.config.ENDPOINTS.assets}user_${post.thumbnail[0].user}/${post.thumbnail[0].fName}`}
        title="Artifact"
      />
    }

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
              <ChatBubbleOutline
                className={classes.statsIcon}
                color="action"
              />
              <Typography
                color="textSecondary"
                display="inline"
                variant="body2"
              >
                Comments: {post.comments.length}
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
                Assets: {post.assets.length}
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
