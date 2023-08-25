import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';
import { useDndCollectionApi } from '../api/dndDb';
import { CollapsibleTable, TableColumn } from '../components/CollapsibleTable';
import { useAuth } from '../hooks/useAuth';
import { CampaignsClient } from '../api/client/campaignsClient';

const client = new CampaignsClient();

const columns: TableColumn[] = [
  {
    name: 'id',
    header: 'ID',
    link: ({ id }) => `/campaigns/${id}/dashboard`,
  },
  { name: 'name', header: 'Name' },
  { name: 'type', header: 'Type' },
];

export const CampaignList = () => {
  client.setAuthToken(useAuth().token);
  const navigate = useNavigate();

  const { invoke, response: campaigns } = useDndCollectionApi(() =>
    client.getCampaigns(),
  );

  useEffect(() => {
    invoke();
  }, []);

  return campaigns ? (
    <div>
      <CollapsibleTable dataSet={campaigns} columns={columns} />
      <button onClick={() => navigate('/campaigns/create')}>
        New Campaign
      </button>
    </div>
  ) : (
    <PuffLoader />
  );
};
