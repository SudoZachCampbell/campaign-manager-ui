import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDndCollectionApi } from '../../api/dndDb';
import { MonstersClient } from '../../api/model';
import { Button } from '../../components/Button/Button';
import { Table, TableColumn } from '../../components/Table/Table';
import { useAuth } from '../../hooks/useAuth';

const client = new MonstersClient();

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
  } = useDndCollectionApi(() => client.getMonsters());

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
