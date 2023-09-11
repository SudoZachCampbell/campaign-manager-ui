import { Route, Routes } from 'react-router';
import { CompendiumLayout } from '../layouts/CompendiumLayout';
import { MonsterDetails } from '../pages/details/monsters/MonsterDetails';
import MonsterList from '../pages/listing/MonsterList';

export const CompendiumRoute = () => {
  return (
    <Routes>
      <Route element={<CompendiumLayout />}>
        <Route path="/monsters" element={<MonsterList />} />
        <Route path="/monsters/create" element={<MonsterDetails />} />
        <Route path="/monsters/update/:id" element={<MonsterDetails />} />
        <Route path="/" element={<MonsterList />} />
      </Route>
    </Routes>
  );
};
