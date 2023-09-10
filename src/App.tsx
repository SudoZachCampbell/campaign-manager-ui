import { useEffect, useState } from 'react';
import { Route } from 'react-router';
import { Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { CampaignRoute } from './CampaignRoute';
import './base.styles.scss';
import { Button } from './components/Button/Button';
import { AccountLayout } from './layouts/AccountLayout';
import { AuthLayout } from './layouts/AuthLayout';
import { GuestLayout } from './layouts/GuestLayout';
import { CampaignList } from './pages/CampaignList';
import Home from './pages/Home';
import Login from './pages/Login';
import { CampaignDetails } from './pages/details/campaigns/CampaignDetails';
import { MonsterDetails } from './pages/details/monsters/MonsterDetails';
import MonsterList from './pages/listing/MonsterList';

export default function App() {
  const [darkTheme, toggleDarkTheme] = useState<boolean>(true);
  const toggleTheme = () => {
    toggleDarkTheme((currentTheme) => !currentTheme);
  };

  useEffect(() => {
    let html = document.querySelector('html');
    if (html) {
      html.dataset.theme = `theme-${darkTheme ? 'dark' : 'light'}`;
    }
  }, [darkTheme]);

  return (
    <RecoilRoot>
      <div className="app__body">
        <Routes>
          <Route element={<AuthLayout />}>
            <Route
              path="/campaigns/:campaignId/*"
              element={<CampaignRoute />}
            />
            <Route element={<AccountLayout />}>
              <Route path="/campaigns" element={<CampaignList />} />
              <Route path="/campaigns/create" element={<CampaignDetails />} />
              <Route path="/monsters" element={<MonsterList />} />
              <Route path="/monsters/create" element={<MonsterDetails />} />
              <Route path="/monsters/update/:id" element={<MonsterDetails />} />
            </Route>
            <Route element={<GuestLayout />}>
              <Route path="/login" element={<Login />} />
            </Route>
          </Route>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      <div className="app__footer">
        <Button onClick={toggleTheme} text="toggle theme" />
      </div>
    </RecoilRoot>
  );
}
