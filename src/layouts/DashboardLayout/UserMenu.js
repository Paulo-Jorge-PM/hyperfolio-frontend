import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
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

import {
  Link,
  Avatar,
  makeStyles
} from '@material-ui/core';

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

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    cursor: 'pointer',
    width: 40,
    height: 40,
    '&:hover': {
      boxShadow: '0px 0px 5px #333333;',
    },
  },
}));

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

export default function UserMenu() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();

  return (
    <div>
      <Avatar
        className={classes.avatar}
        //component={RouterLink}
        src={user.avatar}
        onClick={handleClick}
      />
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={handleClose}
      >
        <StyledMenuItem component={RouterLink} to="/account">
          <ListItemIcon>
            <AccountBox fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </StyledMenuItem>

        <StyledMenuItem component={RouterLink} to="/login">
          <ListItemIcon>
            <AccountBox fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Login" />
        </StyledMenuItem>

        <StyledMenuItem component={RouterLink} to="/register">
          <ListItemIcon>
            <AccountBox fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Register" />
        </StyledMenuItem>

        <StyledMenuItem component={RouterLink} to="/cv">
          <ListItemIcon>
            <Send fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="CV" />
        </StyledMenuItem>

        <StyledMenuItem component={RouterLink} to="/activity">
          <ListItemIcon>
            <DataUsage fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Activity" />
        </StyledMenuItem>

        <StyledMenuItem component={RouterLink} to="/messages">
          <ListItemIcon>
            <Drafts fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Messages" />
        </StyledMenuItem>

        <StyledMenuItem component={RouterLink} to="/settings">
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </StyledMenuItem>

        <StyledMenuItem component={RouterLink} to="/logout">
          <ListItemIcon>
            <ExitToApp fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}