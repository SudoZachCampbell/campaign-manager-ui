import { Box } from '@mui/material';
import { useDndCollectionApi } from 'api/dndDb';
import { Client, MonsterDto } from 'api/model';
import { Button } from 'components/Button/Button';
import { Table } from 'components/Table/Table';
import { TableColumn } from 'components/Table/Table.model';
import { useAuth } from 'hooks/useAuth';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const client = new Client();

export default function MonsterList() {
  client.setAuthToken(useAuth().token);
  const navigate = useNavigate();

  const columns: TableColumn<MonsterDto>[] = [
    {
      id: 'name',
      header: 'Name',
      Render: (instance) => (
        <Link to={`update/${instance.id}`}>{instance.name}</Link>
      ),
    },
    {
      id: 'passivePerception',
      accessor: ['challenge_rating'],
      header: 'Passive Perception',
    },
    { id: 'alignment', accessor: ['alignment'], header: 'Alignment' },
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
      <Table data={monsters} columns={columns} />
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
