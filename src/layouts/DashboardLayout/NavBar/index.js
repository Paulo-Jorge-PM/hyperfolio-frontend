import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';

import {
  Home as Home,
  BookOpen as BookOpen,
  Bell as Bell,
  Users as UsersIcon,
  Settings as SettingsIcon,
  User as UserIcon,
  Search as SearchIcon,

  /*Lock as LockIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon*/
} from 'react-feather';

import {
PostAdd
} from '@material-ui/icons';

import NavItem from './NavItem';

const website = {
  logo: './static/images/logo/baton.png',
  title: 'Hiperfolio',
  description: 'Portfolios Social Network'
};

const items = [
  {
    href: 'wall',
    icon: Home,
    title: 'Wall'
  },
  {
    href: 'post',
    icon: PostAdd,
    title: 'Create'
  },
  {
    href: 'cv',
    icon: BookOpen,
    title: 'Curriculum'
  },
  {
    href: 'search',
    icon: SearchIcon,
    title: 'Search'
  },
  {
    href: 'users',
    icon: UserIcon,
    title: 'Users & Companies'
  },
  {
    href: 'communities',
    icon: UsersIcon,
    title: 'Communities'
  },
  {
    href: 'sparql',
    icon: Bell,
    title: 'Premium'
  },
  {
    href: 'settings',
    icon: SettingsIcon,
    title: 'Settings'
  },
  /*{
    href: '/app/account',
    icon: UserIcon,
    title: 'Account'
  },
  {
    href: '/login',
    icon: LockIcon,
    title: 'Login'
  },
  {
    href: '/register',
    icon: UserPlusIcon,
    title: 'Register'
  }*/
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={website.logo}
          to="/app/wall"
        />
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5"
        >
          {website.title}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {website.description}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>

    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
