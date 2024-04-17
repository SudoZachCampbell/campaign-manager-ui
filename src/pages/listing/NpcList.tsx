import { Box } from '@mui/material';
import { useDndCollectionApi } from 'api/dndDb';
import { Client, NpcDto } from 'api/model';
import { Button } from 'components/Button/Button';
import { Table } from 'components/Table/Table';
import { TableColumn } from 'components/Table/Table.model';
import { useAuth } from 'hooks/useAuth';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const client = new Client();

const NpcList = () => {
  client.setAuthToken(useAuth().token);
  const navigate = useNavigate();
  const { campaignId } = useParams<{ campaignId: string }>();

  const columns: TableColumn<NpcDto>[] = [
    {
      id: 'name',
      header: 'Name',
      Render: (instance) => `update/${instance.id}`,
    },
    { id: 'background', header: 'Background', accessor: ['background'] },
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
      <Table data={npcs} columns={columns} />
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
