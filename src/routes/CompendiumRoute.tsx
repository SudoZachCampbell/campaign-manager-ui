import { Route, Routes } from 'react-router';
import { CampaignLayout } from '../layouts/CampaignLayout';
import { MonsterDetails } from '../pages/details/monsters/MonsterDetails';
import MonsterList from '../pages/listing/MonsterList';

export const CompendiumRoute = () => {
  return (
    <Routes>
      <Route element={<CampaignLayout />}>
        <Route path="/monsters" element={<MonsterList />} />
        <Route path="/monsters/create" element={<MonsterDetails />} />
        <Route path="/monsters/update/:id" element={<MonsterDetails />} />
        <Route path="/" element={<MonsterList />} />
      </Route>
    </Routes>
  );
};
