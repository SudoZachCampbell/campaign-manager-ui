import { Route } from 'react-router';
import { Routes } from 'react-router-dom';
import 'typeface-roboto';
import Home from './pages/Home';
import MonsterList from './pages/listing/MonsterList';
import NpcList from './pages/listing/NpcList';

import { createTheme, ThemeProvider } from '@mui/material';
import './custom.css';
import { AccountLayout } from './layouts/AccountLayout';
import { AuthLayout } from './layouts/AuthLayout';
import { GuestLayout } from './layouts/GuestLayout';
import { CampaignDashboard } from './pages/CampaignDashboard';
import { CampaignDetails } from './pages/CampaignDetails';
import { CampaignList } from './pages/CampaignList';
import { MonsterDetails } from './pages/details/monsters/MonsterDetails';
import { NpcDetails } from './pages/details/npcs/NpcDetails';
import { PlayerDetails } from './pages/details/players/PlayerDetails';
import PlayerList from './pages/listing/PlayerList';
import LocationHub from './pages/LocationHub';
import Login from './pages/Login';

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
            <Route path="/players" element={<PlayerList />} />
            <Route path="/players/:id" element={<PlayerDetails />} />
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
