import React, { useEffect, useState } from 'react';
import { CollapsibleTable } from '../components/CollapsibleTable';
import { ITableList, INpc, ITableRows } from '../interfaces/Models';
import { Box } from '@material-ui/core';
import { Type, getTable } from '../api/dndDb';
import _ from 'lodash';
import BP from '../interfaces/Initialisations';
import NpcSummary from '../components/NpcSummary';

const NpcList = (props: any) => {
  const [npcTableData, setNpcsTableData] = useState<ITableList<INpc>>({
    headers: [''],
    data: {},
    fullData: {},
  });
  const [loading, setLoading] = useState(true);

  const columns = ['id', 'name', 'monster.name', 'location'];

  const expand = ['monster', 'building', 'locale'];

  useEffect(() => {
    populateNpcsData();
    props.setPageName('Npc List');
  }, []);

  const populateNpcsData = async () => {
    let [tableData, npcsData]: [ITableList<INpc>, ITableRows<INpc>] =
      await getTable<INpc>(Type.NPC, columns, expand);
    tableData.data = _.map(tableData.data, (row) => {
      const npc = npcsData[row.id];
      row['location'] = npc.building
        ? `${npc.building.name} in ${npc.building.locale.name}`
        : npc.locale?.name;
      return row;
    });
    console.log('Post Location NPC Table Data: ', tableData);
    console.log('NPCs Data: ', npcsData);
    setNpcsTableData(tableData);
    setLoading(false);
  };

  const renderNpcsTable = () => {
    return <CollapsibleTable dataSet={npcTableData} Component={NpcSummary} />;
  };

  const contents = loading ? (
    <p>
      <em>Loading...</em>
    </p>
  ) : (
    renderNpcsTable()
  );

  return (
    <Box p={5}>
      <Box>{contents}</Box>
    </Box>
  );
};

export default NpcList;
