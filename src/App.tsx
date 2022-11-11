import React from 'react';
import { useState } from 'react';
import { Route } from 'react-router';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import NpcList from './pages/NpcList';
import MonsterList from './pages/MonsterList';
import 'typeface-roboto';

import './custom.css';
import NpcDetails from './pages/NpcDetails';
import MonsterDetails from './pages/MonsterDetails';
import { createTheme, MuiThemeProvider } from '@material-ui/core';
import LocationHub from './pages/LocationHub';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryConfig = new QueryClient({
  defaultOptions: {
    queries: { suspense: true, staleTime: 60000 },
  },
});

export default function App(props) {
  const [pageName, setPageName] = useState('');
  const [pageBanner, setPageBanner] = useState('');

  const theme = createTheme({
    typography: {
      fontWeightLight: 100,
      fontWeightRegular: 300,
      fontWeightMedium: 400,
    },
  });

  return (
    <QueryClientProvider client={queryConfig}>
      <MuiThemeProvider theme={theme}>
        <Layout pageName={pageName} pageBanner={pageBanner}>
          <Route
            exact
            path='/'
            render={(props) => <Home setPageName={setPageName} />}
          />
          <Route
            path='/npcs'
            render={(props) => <NpcList setPageName={setPageName} />}
          />
          <Route
            path='/monsters'
            render={(props) => <MonsterList setPageName={setPageName} />}
          />
          <Route
            path='/location-hub'
            render={(props) => <LocationHub setPageName={setPageName} />}
          />
          <Route
            path='/npc-details/:id'
            render={(props) => (
              <NpcDetails
                setPageName={setPageName}
                setPageBanner={setPageBanner}
              />
            )}
          />
          <Route
            path='/monster-details/:id'
            render={(props) => (
              <MonsterDetails
                setPageName={setPageName}
                setPageBanner={setPageBanner}
              />
            )}
          />
        </Layout>
      </MuiThemeProvider>
    </QueryClientProvider>
  );
}
