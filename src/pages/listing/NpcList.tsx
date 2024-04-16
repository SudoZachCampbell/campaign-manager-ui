import { Box } from '@mui/material';
import { useDndCollectionApi } from 'api/dndDb';
import { Client } from 'api/model';
import { Button } from 'components/Button/Button';
import { Table, TableColumn } from 'components/Table/Table';
import { useAuth } from 'hooks/useAuth';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const client = new Client();

interface NpcListProps {}

const NpcList = () => {
  client.setAuthToken(useAuth().token);
  const navigate = useNavigate();
  const { campaignId } = useParams<{ campaignId: string }>();

  const columns: TableColumn[] = [
    {
      name: 'name',
      header: 'Name',
      link: (instance) => `update/${instance.id}`,
    },
    { name: 'monster.name', header: 'Monster Name' },
    { name: 'location', header: 'Location' },
  ];

  const {
    loading,
    invoke,
    response: npcs,
  } = useDndCollectionApi(() => client.npcs_GetNpcs(campaignId ?? ''));

  useEffect(() => {
    invoke();
  }, []);

  const contents = loading ? (
    <p>
      <em>Loading...</em>
    </p>
  ) : npcs ? (
    <>
      <Table dataSet={npcs} columns={columns} />
      <Button onClick={() => navigate(`/campaigns/${campaignId}/npcs/create`)}>
        Create
      </Button>
    </>
  ) : (
    <p>Fecked</p>
  );

  return (
    <Box p={5}>
      <Box>{contents}</Box>
    </Box>
  );
};

export default NpcList;
