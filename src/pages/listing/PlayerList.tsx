import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDndCollectionApi } from '../../api/dndDb';
import { PlayersClient } from '../../api/model';
import { Button } from '../../components/Button/Button';
import {
  CollapsibleTable,
  TableColumn,
} from '../../components/CollapsibleTable';
import { useAuth } from '../../hooks/useAuth';

const client = new PlayersClient();

interface PlayerListProps {}

const PlayerList = () => {
  client.setAuthToken(useAuth().token);
  const navigate = useNavigate();

  const columns: TableColumn[] = [
    { name: 'name', header: 'Name' },
    { name: 'location', header: 'Location' },
  ];

  const {
    loading,
    invoke,
    response: npcs,
  } = useDndCollectionApi(() => client.getPlayers());

  useEffect(() => {
    invoke();
  }, []);

  const contents = loading ? (
    <p>
      <em>Loading...</em>
    </p>
  ) : npcs ? (
    <>
      <CollapsibleTable dataSet={npcs} columns={columns} />
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
