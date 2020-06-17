import React, { Suspense, useState, useEffect } from 'react';
import { Box } from '@material-ui/core';
import LocationMap from '../components/LocationMap';
import { ReactQueryConfigProvider } from 'react-query'
import { ILocale, IMap } from '../interfaces/Models';
import { useQuery } from 'react-query';
import { getEntity, Type } from '../api/dndDb';
import BP from '../interfaces/Initialisations'

export default function LocationHub(props) {
    const [currentMap, setCurrentMap]: [IMap, Function] = useState(BP.Map)
    const { data } = useQuery('location', () => getEntity(Type.Locale, 6, ['Maps.Buildings.Building',])) as { data: ILocale }

    console.log('Current Map: ', currentMap)

    useEffect(() => {
        if (data) setCurrentMap(data.maps[0])
    }, [data])

    return (
        <Box display='flex' justifyContent='center'>
            <LocationMap map={currentMap} />
        </Box>
    )
}