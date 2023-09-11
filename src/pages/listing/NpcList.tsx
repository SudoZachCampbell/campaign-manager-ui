import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDndCollectionApi } from '../../api/dndDb';
import { NpcsClient } from '../../api/model';
import { Button } from '../../components/Button/Button';
import NpcSummary from '../../components/NpcSummary';
import { Table, TableColumn } from '../../components/Table/Table';
import { useAuth } from '../../hooks/useAuth';

const client = new NpcsClient();

interface NpcListProps {}

const NpcList = () => {
  client.setAuthToken(useAuth().token);
  const navigate = useNavigate();
  const { campaignId } = useParams<{ campaignId: string }>();

  const columns: TableColumn[] = [
    {
      name: 'name',
      header: 'Name',
      link: (instance) => `/campaigns/${campaignId}/npcs/update/${instance.id}`,
    },
    { name: 'monster.name', header: 'Monster Name' },
    { name: 'location', header: 'Location' },
  ];

  const {
    loading,
    invoke,
    response: npcs,
  } = useDndCollectionApi(() => client.getNpcs());

  useEffect(() => {
    invoke();
  }, []);

  const contents = loading ? (
    <p>
      <em>Loading...</em>
    </p>
  ) : npcs ? (
    <>
      <Table dataSet={npcs} Component={NpcSummary} columns={columns} />
      <Button
        onClick={() => navigate('/campaigns/${campaignId}/npcs/create')}
        text="Create"
      />
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
