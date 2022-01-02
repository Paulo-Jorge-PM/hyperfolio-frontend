import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Menu,
  MenuItem,
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles
} from '@material-ui/core';

import {
Menu as MenuIcon,
NotificationsOutlined as NotificationsIcon,
Input as InputIcon,
PostAdd
} from '@material-ui/icons';

import Logo from 'src/components/Logo';

import UserMenu from './UserMenu';

const useStyles = makeStyles(() => ({
  root: {},
}));

const TopBar = ({
  className,
  onMobileNavOpen,
  ...rest
}) => {

const classes = useStyles();
const [notifications] = useState([]);

  return (
    <AppBar
      className={clsx(classes.root, className)}
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <RouterLink to="/app/wall">
          <Logo />
        </RouterLink>
        <Box flexGrow={1} />
        <Hidden mdDown>
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit" style={{marginRight:"7px"}}>
            <PostAdd aria-controls="simple-menu" aria-haspopup="true" />
          </IconButton>

          <UserMenu/>

        </Hidden>

        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default TopBar;
