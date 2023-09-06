import React, { useEffect, useState } from 'react';
import {
  CollapsibleTable,
  TableColumn,
} from '../../components/CollapsibleTable';
import { Box } from '@mui/material';
import _ from 'lodash';
import { useDndCollectionApi } from '../../api/dndDb';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { MonstersClient } from '../../api/model';
import { Button } from '../../components/Button/Button';

const client = new MonstersClient();

export default function MonsterList() {
  client.setAuthToken(useAuth().token);
  const navigate = useNavigate();

  const columns: TableColumn[] = [
    {
      name: 'name',
      header: 'Name',
      link: (instance) => `/monsters/update/${instance.id}`,
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
      <CollapsibleTable dataSet={monsters} columns={columns} />
      <Button onClick={() => navigate('/monsters/create')} text="Create" />
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
