import { useDndCollectionApi } from 'api/dndDb';
import { Client } from 'api/model';
import { Button } from 'components/Button/Button';
import { Table, TableColumn } from 'components/Table/Table';
import { useAuth } from 'hooks/useAuth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';

const client = new Client();

const columns: TableColumn[] = [
  {
    name: 'id',
    header: 'ID',
    link: ({ id }) => `${id}`,
  },
  { name: 'name', header: 'Name' },
  { name: 'type', header: 'Type' },
];

export const CampaignList = () => {
  client.setAuthToken(useAuth().token);
  const navigate = useNavigate();

  const { invoke, response: campaigns } = useDndCollectionApi(() =>
    client.campaigns_GetCampaigns(),
  );

  useEffect(() => {
    invoke();
  }, []);

  return campaigns ? (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <Table dataSet={campaigns} columns={columns} />
      <Button onClick={() => navigate('/campaigns/create')}>
        New Campaign
      </Button>
    </div>
  ) : (
    <PuffLoader />
  );
};
