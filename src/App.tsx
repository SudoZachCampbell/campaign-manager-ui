import React from 'react';
import { useState } from 'react';
import { Route } from 'react-router';
import { Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import NpcList from './pages/NpcList';
import MonsterList from './pages/MonsterList';
import 'typeface-roboto';

import './custom.css';
import NpcDetails from './pages/NpcDetails';
import MonsterDetails from './pages/MonsterDetails';
import {
  createTheme,
  ThemeProvider,
  Theme,
  StyledEngineProvider,
} from '@mui/material';
import LocationHub from './pages/LocationHub';

export default function App() {
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
    <ThemeProvider theme={theme}>
      <Layout>
        <Routes>
          <Route path='/npcs' element={<NpcList />} />
          <Route path='/monsters' element={<MonsterList />} />
          <Route path='/location-hub' element={<LocationHub />} />
          <Route path='/npcs/:id' element={<NpcDetails />} />
          <Route path='/monsters/:id' element={<MonsterDetails />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}
