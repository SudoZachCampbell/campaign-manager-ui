import * as React from 'react';
import { useEffect, useState } from 'react';
import { Box, Button, Grid, Typography } from '@material-ui/core'
import { IMonster } from '../interfaces/Models';
import BP from '../interfaces/Initialisations';
import { getEntity, Type } from '../api/dndDb';

interface MonsterSummaryProps {
    instance: IMonster | undefined
}

export default function MonsterSummary(props: MonsterSummaryProps) {

    const renderMonsterArea = () => {
        console.log(`${props.instance?.name}: `, props.instance)
        return (
            <Box p={3}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant={'h4'}>{props.instance?.name}</Typography>
                    </Grid>
                    <Grid item xs={6}>

                        <div>{props.instance?.hit_points}</div>
                        <Button variant="contained" color="secondary" href={`/monster-details/${props.instance?.id}`}>Details</Button>
                    </Grid>
                    {
                        props.instance?.picture &&
                        <Grid item xs={6}>
                            <Box width={1}>
                                <img width='100%' src={`https://ddimagecollection.s3-eu-west-1.amazonaws.com/monster/${props.instance.picture}`} />
                            </Box>
                        </Grid>
                    }
                </Grid >
            </Box >
        )
    }

    const renderAddMonster = () => {
        return <Button>Add Monster</Button>
    }

    const renderDisplay = props.instance ? renderMonsterArea() : renderAddMonster();

    return renderDisplay;
}

