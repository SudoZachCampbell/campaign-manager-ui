import React, { useState, useEffect } from 'react';
import { Box, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import LocationMap from '../components/mapping/LocationMap';
import { useDnDApi } from '../api/dndDb';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { LocalesClient, Map } from '../api/Model';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    margin: '1vh 0 1vh 0',
  },
}));

const localeClient = new LocalesClient();

export default function LocationHub({
  setPageName,
}: {
  setPageName: Function;
}) {
  const [maps, setMaps] = useState<Map[]>();
  const [view, setView] = useState<string>('buildings');
  const [currentMapIndex, setCurrentMapIndex] = useState(0);

  const {
    loading,
    invoke,
    response: locale,
  } = useDnDApi(localeClient.getLocale('6', 'Maps.Buildings.Building.Npcs'));

  const classes = useStyles();

  console.log(
    `Current Index ${currentMapIndex} gives Map: `,
    maps?.[currentMapIndex],
  );

  useEffect(() => {
    setPageName('Location Hub');
    invoke();
  });

  useEffect(() => {
    locale?.maps && setMaps(locale.maps);
  }, [locale]);

  const setMap = (_: unknown, index: number) => {
    console.log('Set Map Index: ', index);
    setCurrentMapIndex(index);
  };

  const setMapIcons = (_: unknown, nextView: string) => {
    console.log('New View: ', nextView);
    setView(nextView);
  };

  return loading ? (
    <p>
      <em>Loading...</em>
    </p>
  ) : (
    <Box p={3}>
      <Grid container spacing={5}>
        <Grid item xs={3}>
          <Box display='flex' alignItems='center' flexDirection='column'>
            <ToggleButtonGroup
              value={currentMapIndex}
              onChange={setMap}
              className={classes.root}
              exclusive
            >
              {maps &&
                maps.map((map, index) => (
                  <ToggleButton key={index} value={index}>
                    <Typography variant='body1'>{map.variation}</Typography>
                  </ToggleButton>
                ))}
              ;
            </ToggleButtonGroup>
            <ToggleButtonGroup
              orientation='vertical'
              onChange={setMapIcons}
              value={view}
              exclusive
            >
              <ToggleButton value='buildings'>
                <Typography variant='body1'>Buildings</Typography>
              </ToggleButton>
              <ToggleButton value='npcs'>
                <Typography variant='body1'>Npcs</Typography>
              </ToggleButton>
              <ToggleButton value='monsters'>
                <Typography variant='body1'>Monsters</Typography>
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Grid>
        <Grid item xs={9}>
          <Box height='80vh'>
            <LocationMap map={maps?.[currentMapIndex]} iconName={view} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
