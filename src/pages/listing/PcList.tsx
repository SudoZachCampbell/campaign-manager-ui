﻿import { Box } from '@mui/material';
import { useDndCollectionApi } from 'api/dndDb';
import { Client } from 'api/model';
import { Button } from 'components/Button/Button';
import { Table, TableColumn } from 'components/Table/Table';
import { useAuth } from 'hooks/useAuth';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const client = new Client();

interface PcListProps {}

const PcList = () => {
  client.setAuthToken(useAuth().token);
  const navigate = useNavigate();
  const { campaignId } = useParams<{ campaignId: string }>();

  const columns: TableColumn[] = [
    {
      name: 'pc_name',
      header: 'Name',
      link: (instance) => `update/${instance.id}`,
    },
    { name: 'location', header: 'Location' },
  ];

  const {
    loading,
    invoke,
    response: pcs,
  } = useDndCollectionApi(() => client.pcs_GetPcs(campaignId ?? ''));

  useEffect(() => {
    invoke();
  }, []);

  const contents = loading ? (
    <p>
      <em>Loading...</em>
    </p>
  ) : pcs ? (
    <>
      <Table dataSet={pcs} columns={columns} />
      <Button onClick={() => navigate(`/campaigns/${campaignId}/pcs/create`)}>
        Create
      </Button>
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

export default PcList;
