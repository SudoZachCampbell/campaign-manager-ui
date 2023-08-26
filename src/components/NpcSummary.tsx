import * as React from 'react';
import { Box, Button, Grid } from '@mui/material';
import { useDnDApi } from '../api/dndDb';
import { NpcsClient } from '../api/client/NpcsClient';

const npcClient = new NpcsClient();

interface NpcSummaryProps {
  id: string;
}

export default ({ id }: NpcSummaryProps) => {
  const {
    loading,
    invoke,
    response: npc,
  } = useDnDApi((id: string) => npcClient.get(id));

  return npc ? (
    <Box p={3}>
      <Grid container>
        <Grid item xs={4}>
          <h1 className="display-4">{npc.name}</h1>
          <div>{npc.monster ? npc.monster.name : 'None'}</div>
          <Button
            variant="contained"
            color="secondary"
            href={`/npc-details/${npc.id}`}
          >
            Details
          </Button>
        </Grid>
        {npc.picture && (
          <Grid item xs={4}>
            <img
              height={'40%'}
              alt=""
              src={`https://ddimagecollection.s3-eu-west-1.amazonaws.com/npc/${npc.picture}`}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  ) : (
    <p>Fecked</p>
  );
};
