import * as React from 'react';
import { useEffect, useState } from 'react';
import { Box, Button, Grid, Typography } from '@material-ui/core'
import { IMonster } from '../interfaces/Models';
import { BPMonster } from '../interfaces/Initialisations';
import { getEntity, Type } from '../api/dndDb';

interface MonsterSummaryProps { 
    instance: IMonster | undefined 
}

export default function MonsterSummary(props: MonsterSummaryProps) {
    const renderMonsterArea = () => {
        return (
            <Box p={3}>
                <Grid container>
                    <Grid item xs={4}>
                        <h1 className="display-4">{props.instance?.name}</h1>
                        <div>{props.instance?.hit_points}</div>
                        <Button variant="contained" color="secondary" href={`/monster-details/${props.instance?.id}`}>Details</Button>
                    </Grid>
                    {
                        props.instance?.picture &&
                        <Grid item xs={4}>
                            <img height={"40%"} src={`https://ddimagecollection.s3-eu-west-1.amazonaws.com/monster/${props.instance.picture}`} />
                        </Grid>
                    }
                </Grid>
            </Box>
        )
    }

    const renderAddMonster = () => {
        return <Button></Button>
    }

    const renderDisplay = props.instance ? renderMonsterArea() : renderAddMonster();

    return renderDisplay;
}

