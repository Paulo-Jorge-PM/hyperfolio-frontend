import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import UsersView from 'src/views/users/UsersView';
import DashboardView from 'src/views/homepage/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import CommunitiesView from 'src/views/communities/CommunitiesView';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';
import PostView from 'src/views/post/PostView';
import CvView from 'src/views/cv/CvView';
import SearchView from 'src/views/search/SearchView';

const routes = [
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { path: 'wall', element: <DashboardView /> },
      { path: 'account', element: <AccountView /> },
      { path: 'users', element: <UsersView /> },
      { path: 'cv', element: <CvView /> },
      { path: 'search', element: <SearchView /> },
      { path: 'communities', element: <CommunitiesView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: 'post', element: <PostView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },

      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
