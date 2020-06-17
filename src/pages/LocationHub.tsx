import React, { Suspense } from 'react';
import { Box } from '@material-ui/core';
import LocationMap from '../components/LocationMap';
import { ReactQueryConfigProvider } from 'react-query'

const queryConfig = {
    suspense: true
}

export default function LocationHub(props) {


    return (
        <ReactQueryConfigProvider config={queryConfig}>
            <Box display='flex' justifyContent='center'>
                <Suspense fallback={<h1>Loading</h1>} >
                    <LocationMap />
                </Suspense>
            </Box>
        </ReactQueryConfigProvider>
    )
}