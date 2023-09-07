import { Route, Routes } from 'react-router';
import './custom.css';
import { CampaignLayout } from './layouts/CampaignLayout';
import { CampaignDashboard } from './pages/CampaignDashboard';
import LocationHub from './pages/LocationHub';
import { CampaignDetails } from './pages/details/campaigns/CampaignDetails';
import { NpcDetails } from './pages/details/npcs/NpcDetails';
import { PlayerDetails } from './pages/details/players/PlayerDetails';
import NpcList from './pages/listing/NpcList';
import PlayerList from './pages/listing/PlayerList';

export const CampaignRoute = () => {
  return (
    <Routes>
      <Route element={<CampaignLayout />}>
        <Route path="dashboard" element={<CampaignDashboard />} />
        <Route path="update" element={<CampaignDetails />} />
        <Route path="npcs" element={<NpcList />} />
        <Route path="npcs/create" element={<NpcDetails />} />
        <Route path="npcs/update/:id" element={<NpcDetails />} />
        <Route path="players" element={<PlayerList />} />
        <Route path="players/create" element={<PlayerDetails />} />
        <Route path="players/update/:id" element={<PlayerDetails />} />
        <Route path="location-hub" element={<LocationHub />} />
      </Route>
    </Routes>
  );
};
