import { useDndCollectionApi } from 'api/dndDb';
import { CampaignDto, Client } from 'api/model';
import { Button } from 'components/Button/Button';
import { Table } from 'components/Table/Table';
import { TableColumn } from 'components/Table/Table.model';
import { useAuth } from 'hooks/useAuth';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';

const client = new Client();

const columns: TableColumn<CampaignDto>[] = [
  {
    id: 'name',
    header: 'Name',
    Render: ({ id, name }) => <Link to={`${id}`}>{name}</Link>,
  },
  {
    id: 'players',
    header: 'Player Count',
    Render: ({ players }) => players?.length,
  },
  { id: 'type', header: 'Type', accessor: ['type'] },
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
      <Table data={campaigns} columns={columns} />
      <Button onClick={() => navigate('/campaigns/create')}>
        New Campaign
      </Button>
    </div>
  ) : (
    <PuffLoader />
  );
};
