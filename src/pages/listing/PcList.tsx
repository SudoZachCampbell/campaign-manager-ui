import { Box } from '@mui/material';
import { useDndCollectionApi } from 'api/dndDb';
import { Client, PcDto } from 'api/model';
import { Button } from 'components/Button/Button';
import { Table } from 'components/Table/Table';
import { TableColumn } from 'components/Table/Table.model';
import { useAuth } from 'hooks/useAuth';
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const client = new Client();

const PcList = () => {
  client.setAuthToken(useAuth().token);
  const navigate = useNavigate();
  const { campaignId } = useParams<{ campaignId: string }>();

  const columns: TableColumn<PcDto>[] = [
    {
      id: 'name',
      header: 'Name',
      Render: ({ id, name }) => <Link to={`update/${id}`}>${name}</Link>,
    },
    { id: 'level', header: 'Level', accessor: ['level'] },
    { id: 'player', header: 'Player', accessor: ['player_id'] },
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
      <Table data={pcs} columns={columns} />
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
