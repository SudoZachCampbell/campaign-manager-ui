import React, { Suspense, useState, useEffect } from 'react';
import { Box, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import LocationMap from '../components/mapping/LocationMap';
import { ReactQueryConfigProvider } from 'react-query'
import { ILocale, IMap } from '../interfaces/Models';
import { useQuery } from 'react-query';
import { getEntity, Type } from '../api/dndDb';
import BP from '../interfaces/Initialisations'
import { values } from 'lodash';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        margin: '1vh 0 1vh 0'
    },
}));

export default function LocationHub(props) {
    const [maps, setMaps]: [IMap[], Function] = useState([BP.Map]);
    const [view, setView] = useState('buildings');
    const [currentMapIndex, setCurrentMapIndex] = useState(0);
    const { data } = useQuery('location', () => getEntity(Type.Locale, 6, ['Maps.Buildings.Building.Npcs',])) as { data: ILocale }

    const classes = useStyles();

    console.log(`Current Index ${currentMapIndex} gives Map: `, maps[currentMapIndex])

    useEffect(() => {
        console.log('Maps: ', data.maps)
        data.maps && setMaps(data.maps)
    }, [data])

    const setMap = (event, index) => {
        console.log("Set Map Index: ", index);
        setCurrentMapIndex(index);
    }

    const setMapIcons = (event, nextView) => {
        console.log("New View: ", nextView)
        setView(nextView);
    }

    return (
        <Box p={3}>
            <Grid container spacing={5}>
                <Grid xs={3}>
                    <Box display='flex' alignItems='center' flexDirection='column'>
                        <ToggleButtonGroup
                            value={currentMapIndex}
                            onChange={setMap}
                            className={classes.root}
                            exclusive>
                            {data.maps && data.maps.map((map, index) => (
                                <ToggleButton key={index} value={index}>
                                    <Typography variant='body1'>{map.variation}</Typography>
                                </ToggleButton>
                            ))};
                        </ToggleButtonGroup>
                        <ToggleButtonGroup
                            orientation='vertical'
                            onChange={setMapIcons}
                            value={view}
                            exclusive >
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
                <Grid xs={9}>
                    <LocationMap map={maps[currentMapIndex]} iconName={view} />
                </Grid>
            </Grid>
        </Box>
    )
}