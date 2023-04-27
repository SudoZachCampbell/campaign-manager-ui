import React, { useEffect } from 'react';
import { CollapsibleTable, TableColumn } from '../components/CollapsibleTable';
import { Box } from '@material-ui/core';
import { useDndCollectionApi } from '../api/dndDb';
import _ from 'lodash';
import NpcSummary from '../components/NpcSummary';
import { NpcsClient } from '../api/Model';

const npcClient = new NpcsClient();

const NpcList = (props: any) => {
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
  } = useDndCollectionApi(
    npcClient.getAll(1, 10, null, null, expand.join(',')),
  );

  useEffect(() => {
    invoke();
    props.setPageName('Npc List');
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
