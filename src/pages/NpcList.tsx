import React, { useEffect } from 'react';
import { CollapsibleTable, TableColumn } from '../components/CollapsibleTable';
import { Box } from '@mui/material';
import { useDndCollectionApi } from '../api/dndDb';
import _ from 'lodash';
import NpcSummary from '../components/NpcSummary';

import { NpcsClient } from '../api/client/npcsClient';

const npcClient = new NpcsClient();

interface NpcListProps {}

const NpcList = () => {
  const columns: TableColumn[] = [
    { name: 'name', header: 'Name' },
    { name: 'monster.name', header: 'Monster Name' },
    { name: 'location', header: 'Location' },
  ];

  const expand = ['monster', 'building', 'locale'];

  const {
    loading,
    invoke,
    response: npcs,
  } = useDndCollectionApi(() =>
    npcClient.getAll(1, 10, '', null, expand.join(',')),
  );

  useEffect(() => {
    invoke();
  }, []);

  const contents = loading ? (
    <p>
      <em>Loading...</em>
    </p>
  ) : npcs ? (
    <CollapsibleTable dataSet={npcs} Component={NpcSummary} columns={columns} />
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
