import { Route, Routes } from 'react-router';
import { CampaignLayout } from '../layouts/CampaignLayout';
import { CampaignDashboard } from '../pages/CampaignDashboard';
import LocationHub from '../pages/LocationHub';
import { CampaignDetails } from '../pages/details/campaigns/CampaignDetails';
import { MonsterDetails } from '../pages/details/monsters/MonsterDetails';
import { NpcDetails } from '../pages/details/npcs/NpcDetails';
import { PcDetails } from '../pages/details/pcs/PcDetails';
import MonsterList from '../pages/listing/MonsterList';
import NpcList from '../pages/listing/NpcList';
import PcList from '../pages/listing/PcList';

export const CampaignRoute = () => {
  return (
    <Routes>
      <Route element={<CampaignLayout />}>
        <Route path="update" element={<CampaignDetails />} />
        <Route path="npcs" element={<NpcList />} />
        <Route path="npcs/create" element={<NpcDetails />} />
        <Route path="npcs/update/:id" element={<NpcDetails />} />
        <Route path="pcs" element={<PcList />} />
        <Route path="pcs/create" element={<PcDetails />} />
        <Route path="pcs/update/:id" element={<PcDetails />} />
        <Route path="location-hub" element={<LocationHub />} />
        <Route path="/monsters" element={<MonsterList />} />
        <Route path="/monsters/create" element={<MonsterDetails />} />
        <Route path="/monsters/update/:id" element={<MonsterDetails />} />
        <Route path="" element={<CampaignDashboard />} />
      </Route>
    </Routes>
  );
};
