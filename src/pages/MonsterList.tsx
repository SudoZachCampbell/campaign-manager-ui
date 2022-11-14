import React, { useEffect, useState } from 'react';
import { CollapsibleTable } from '../components/CollapsibleTable';
import { ITableList, IMonster, ITableRows } from '../interfaces/Models';
import { Box } from '@material-ui/core';
import { Type, getTable } from '../api/dndDb';
import _ from 'lodash';
import BP from '../interfaces/Initialisations';
import MonsterSummary from '../components/MonsterSummary';

export default function MonsterList(props: any) {
  const [monsters, setMonsters] = useState<ITableList<IMonster>>({
    headers: [''],
    data: {},
    fullData: {},
  });
  const [loading, setLoading] = useState(true);

  const columns = ['id', 'name', 'passive_perception', 'alignment'];

  const populateMonstersData = async () => {
    const [tableData, monstersData]: [
      ITableList<IMonster>,
      ITableRows<IMonster>,
    ] = await getTable<IMonster>(Type.MONSTER, columns);
    setMonsters(tableData);
    setLoading(false);
  };

  const renderMonstersTable = () => {
    return <CollapsibleTable dataSet={monsters} Component={MonsterSummary} />;
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
