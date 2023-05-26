import { useEffect } from 'react';
import { CampaignsClient } from '../api/Model';
import { useDndCollectionApi } from '../api/dndDb';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const client = new CampaignsClient();

export const CampaignList = () => {
  client.setAuthToken(useAuth().token);
  const navigate = useNavigate();

  const { invoke, response: campaigns } = useDndCollectionApi(() =>
    client.getCampaigns(),
  );

  useEffect(() => {
    invoke();
  }, []);

  return (
    <div>
      <table>
        <thead></thead>
        <tbody>
          {campaigns?.map((campaign) => (
            <tr>{campaign.id}</tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => navigate('/campaigns/create')}>
        New Campaign
      </button>
    </div>
  );
};
