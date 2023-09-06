import React from 'react';
import { useState } from 'react';
import { Route } from 'react-router';
import { Routes } from 'react-router-dom';
import Home from './pages/Home';
import NpcList from './pages/listing/NpcList';
import MonsterList from './pages/listing/MonsterList';
import 'typeface-roboto';

import './custom.css';
import { NpcDetails } from './pages/details/npcs/NpcDetails';
import { MonsterDetails } from './pages/details/monsters/MonsterDetails';
import { createTheme, ThemeProvider } from '@mui/material';
import LocationHub from './pages/LocationHub';
import Login from './pages/Login';
import { GuestLayout } from './layouts/GuestLayout';
import { AuthLayout } from './layouts/AuthLayout';
import { AccountLayout } from './layouts/AccountLayout';
import { CampaignList } from './pages/CampaignList';
import { CampaignDetails } from './pages/CampaignDetails';
import { CampaignDashboard } from './pages/CampaignDashboard';

export default function App() {
  const theme = createTheme({
    typography: {
      fontWeightLight: 100,
      fontWeightRegular: 300,
      fontWeightMedium: 400,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route element={<AccountLayout />}>
            <Route path="/campaigns" element={<CampaignList />} />
            <Route path="/campaigns/create" element={<CampaignDetails />} />
            <Route path="/campaigns/update/:id" element={<CampaignDetails />} />
            <Route
              path="/campaigns/:id/dashboard"
              element={<CampaignDashboard />}
            />
            <Route path="/npcs" element={<NpcList />} />
            <Route path="/npcs/:id" element={<NpcDetails />} />
            <Route path="/monsters" element={<MonsterList />} />
            <Route path="/monsters/create" element={<MonsterDetails />} />
            <Route path="/monsters/update/:id" element={<MonsterDetails />} />
            <Route path="/location-hub" element={<LocationHub />} />
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<GuestLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
