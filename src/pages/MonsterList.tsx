import React, { useEffect, useState } from 'react';
import { CollapsibleTable, TableColumn } from '../components/CollapsibleTable';
import { Box } from '@material-ui/core';
import _ from 'lodash';
import MonsterSummary from '../components/MonsterSummary';
import { MonstersClient } from '../api/Model';
import { useDndCollectionApi } from '../api/dndDb';

const client = new MonstersClient();

interface MonsterListProps {
  setPageName: (pageName: string) => void;
}

export default function MonsterList({ setPageName }: MonsterListProps) {
  const columns: TableColumn[] = [
    { name: 'name', header: 'Name' },
    { name: 'passivePerception', header: 'Passive Perception' },
    { name: 'alignment', header: 'Alignment' },
  ];

  const {
    loading,
    invoke,
    response: monsters,
  } = useDndCollectionApi(client.getMonsters());

  useEffect(() => {
    invoke();
    setPageName('Monster List');
  }, []);

  const contents = loading ? (
    <p>
      <em>Loading...</em>
    </p>
  ) : monsters ? (
    <CollapsibleTable
      dataSet={monsters}
      Component={MonsterSummary}
      columns={columns}
    />
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
