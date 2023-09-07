import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDndCollectionApi } from '../../api/dndDb';
import { PcsClient } from '../../api/model';
import { Button } from '../../components/Button/Button';
import {
  CollapsibleTable,
  TableColumn,
} from '../../components/CollapsibleTable';
import { useAuth } from '../../hooks/useAuth';

const client = new PcsClient();

interface PlayerListProps {}

const PlayerList = () => {
  client.setAuthToken(useAuth().token);
  const navigate = useNavigate();

  const columns: TableColumn[] = [
    {
      name: 'name',
      header: 'Name',
      link: (instance) => `/players/update/${instance.id}`,
    },
    { name: 'location', header: 'Location' },
  ];

  const {
    loading,
    invoke,
    response: pcs,
  } = useDndCollectionApi(() => client.getPcs());

  useEffect(() => {
    invoke();
  }, []);

  const contents = loading ? (
    <p>
      <em>Loading...</em>
    </p>
  ) : pcs ? (
    <>
      <CollapsibleTable dataSet={pcs} columns={columns} />
      <Button onClick={() => navigate('/players/create')} text="Create" />
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

export default PlayerList;
