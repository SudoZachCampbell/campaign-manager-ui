import { AccountLayout } from 'layouts/AccountLayout';
import { AuthLayout } from 'layouts/AuthLayout';
import { GuestLayout } from 'layouts/GuestLayout';
import Home from 'pages/Home';
import Login from 'pages/Login';
import { CampaignDetails } from 'pages/details/campaigns/CampaignDetails';
import { CampaignList } from 'pages/listing/CampaignList';
import { Route } from 'react-router';
import { Routes } from 'react-router-dom';
import { CampaignRoute } from './CampaignRoute';
import { CompendiumRoute } from './CompendiumRoute';

export default function BaseRoute() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route element={<AccountLayout />}>
          <Route path="/campaigns/:campaignId/*" element={<CampaignRoute />} />
          <Route path="/campaigns" element={<CampaignList />} />
          <Route path="/campaigns/create" element={<CampaignDetails />} />
          <Route path="/compendium/*" element={<CompendiumRoute />} />
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<GuestLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Route>
    </Routes>
  );
}
