import React, { useEffect } from 'react';
import {
  CollapsibleTable,
  TableColumn,
} from '../../components/CollapsibleTable';
import { Box } from '@mui/material';
import { useDndCollectionApi } from '../../api/dndDb';
import _ from 'lodash';
import NpcSummary from '../../components/NpcSummary';

import { NpcsClient } from '../../api/model';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';

const client = new NpcsClient();

interface NpcListProps {}

const NpcList = () => {
  client.setAuthToken(useAuth().token);
  const navigate = useNavigate();

  const columns: TableColumn[] = [
    { name: 'name', header: 'Name' },
    { name: 'monster.name', header: 'Monster Name' },
    { name: 'location', header: 'Location' },
  ];

  const {
    loading,
    invoke,
    response: npcs,
  } = useDndCollectionApi(() => client.getNpcs());

  useEffect(() => {
    invoke();
  }, []);

  const contents = loading ? (
    <p>
      <em>Loading...</em>
    </p>
  ) : npcs ? (
    <>
      <CollapsibleTable
        dataSet={npcs}
        Component={NpcSummary}
        columns={columns}
      />
      <Button onClick={() => navigate('/npcs/create')} text="Create" />
    </>
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
