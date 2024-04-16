import { Box } from '@mui/material';
import { useDndCollectionApi } from 'api/dndDb';
import { Client } from 'api/model';
import { Button } from 'components/Button/Button';
import { Table, TableColumn } from 'components/Table/Table';
import { useAuth } from 'hooks/useAuth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const client = new Client();

export default function MonsterList() {
  client.setAuthToken(useAuth().token);
  const navigate = useNavigate();

  const columns: TableColumn[] = [
    {
      name: 'name',
      header: 'Name',
      link: (instance) => `update/${instance.id}`,
    },
    { name: 'passivePerception', header: 'Passive Perception' },
    { name: 'alignment', header: 'Alignment' },
  ];

  const {
    loading,
    invoke,
    response: monsters,
  } = useDndCollectionApi(() => client.monsters_GetMonsters());

  useEffect(() => {
    invoke();
  }, []);

  const contents = loading ? (
    <p>
      <em>Loading...</em>
    </p>
  ) : monsters ? (
    <>
      <Table dataSet={monsters} columns={columns} />
      <Button onClick={() => navigate('/compendium/monsters/create')}>
        Create
      </Button>
    </>
  ) : (
    <p>
      <em>Error loading Monsters</em>
    </p>
  );

  return (
    <Box p={5}>
      <Box>{contents}</Box>
    </Box>
  );
}
