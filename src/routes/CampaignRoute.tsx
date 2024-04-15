import { CampaignLayout } from 'layouts/CampaignLayout';
import { CampaignDashboard } from 'pages/CampaignDashboard';
import LocationHub from 'pages/LocationHub';
import { CampaignDetails } from 'pages/details/campaigns/CampaignDetails';
import { NpcDetails } from 'pages/details/characters/npcs/NpcDetails';
import { PcDetails } from 'pages/details/characters/pcs/PcDetails';
import { MonsterDetails } from 'pages/details/monsters/MonsterDetails';
import MonsterList from 'pages/listing/MonsterList';
import NpcList from 'pages/listing/NpcList';
import PcList from 'pages/listing/PcList';
import { Route, Routes } from 'react-router';

export const CampaignRoute = () => {
  return (
    <Routes>
      <Route element={<CampaignLayout />}>
        <Route path="update" element={<CampaignDetails />} />
        <Route path="npcs" element={<NpcList />} />
        <Route path="npcs/create" element={<NpcDetails />} />
        <Route path="npcs/update/:npcId" element={<NpcDetails />} />
        <Route path="pcs" element={<PcList />} />
        <Route path="pcs/create" element={<PcDetails />} />
        <Route path="pcs/update/:pcId" element={<PcDetails />} />
        <Route path="location-hub" element={<LocationHub />} />
        <Route path="worlds/create" element={<LocationHub />} />
        <Route path="/monsters" element={<MonsterList />} />
        <Route path="/monsters/create" element={<MonsterDetails />} />
        <Route
          path="/monsters/update/:monsterId"
          element={<MonsterDetails />}
        />
        <Route path="" element={<CampaignDashboard />} />
      </Route>
    </Routes>
  );
};
