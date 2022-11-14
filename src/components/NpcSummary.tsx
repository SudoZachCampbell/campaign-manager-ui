import * as React from 'react';
import { Box, Button, Grid } from '@material-ui/core';
import { INpc } from '../interfaces/Models';

export default function NpcSummary(props: { instance: INpc }) {
  const renderNpcArea = () => {
    return (
      <Box p={3}>
        <Grid container>
          <Grid item xs={4}>
            <h1 className='display-4'>{props.instance.name}</h1>
            <div>
              {props.instance.monster ? props.instance.monster.name : 'None'}
            </div>
            <Button
              variant='contained'
              color='secondary'
              href={`/npc-details/${props.instance.id}`}
            >
              Details
            </Button>
          </Grid>
          {props.instance.picture && (
            <Grid item xs={4}>
              <img
                height={'40%'}
                alt=''
                src={`https://ddimagecollection.s3-eu-west-1.amazonaws.com/npc/${props.instance.picture}`}
              />
            </Grid>
          )}
        </Grid>
      </Box>
    );
  };

  const renderDisplay = renderNpcArea();

  return renderDisplay;
}
