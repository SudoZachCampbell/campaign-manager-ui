import React, { useEffect, useState } from 'react';
import { CollapsibleTable, TableColumn } from '../components/CollapsibleTable';
import { ITableList, ITableRows } from '../interfaces/Models';
import { Box } from '@material-ui/core';
import { Type, getTable } from '../api/dndDb';
import _ from 'lodash';
import BP from '../interfaces/Initialisations';
import MonsterSummary from '../components/MonsterSummary';
import { Monster, MonstersClient } from '../api/Model';

const client = new MonstersClient();

export default function MonsterList(props: any) {
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [loading, setLoading] = useState(true);

  const columns: TableColumn[] = [
    { name: 'name', header: 'Name' },
    { name: 'passivePerception', header: 'Passive Perception' },
    { name: 'alignment', header: 'Alignment' },
  ];

  const populateMonstersData = async () => {
    const tableData = await client.getMonsters();
    setMonsters(tableData);
    setLoading(false);
  };

  const renderMonstersTable = () => {
    return (
      <CollapsibleTable
        dataSet={monsters}
        Component={MonsterSummary}
        columns={columns}
      />
    );
  };

  const contents = loading ? (
    <p>
      <em>Loading...</em>
    </p>
  ) : (
    renderMonstersTable()
  );

  useEffect(() => {
    populateMonstersData();
    props.setPageName('Monster List');
  }, []);

  return (
    <Box p={5}>
      <Box>{contents}</Box>
    </Box>
  );
}
