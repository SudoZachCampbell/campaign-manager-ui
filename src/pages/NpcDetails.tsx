import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TogglingTextField from '../components/TogglingTextField';
import { INpc } from '../interfaces/Models';
import { Box, Grid, Typography } from '@material-ui/core';
import { BPNpc } from '../interfaces/Initialisations'
import { Type, getEntity, updateEntity, PatchType } from '../api/dndDb';
import MonsterSummary from '../components/MonsterSummary'

export default function NpcDetails(props: { setPageName: Function, setPageBanner: Function }) {
    const [npc, setNpc] = useState<INpc>(BPNpc);
    const [loading, setLoading] = useState<boolean>(true);

    props.setPageName(npc.name);
    props.setPageBanner(npc.picture);

    const { id } = useParams();

    
    const include = [
        "Monster", 
        "Building", 
        "Locale"
    ]

    const populateNpcData = async () => {
        const data: INpc = await getEntity<INpc>(Type.Npc, id, include);
        console.log("Npc Details Data: ", data)
        setNpc(data);
        setLoading(false);
    }

    useEffect(() => {
        populateNpcData();
    }, [])

    const saveField = async (field: string, value: any) => {
        const data =  await updateEntity<INpc>(Type.Npc, id, PatchType.Add, `/${field}`, value);
        setNpc(data);
    }

    const display = (
        <Box p={3}>
            <Grid container>
                <Grid xs={6}>
                    <TogglingTextField label='Name' field='name' text={npc.name} saveField={saveField} />
                    <TogglingTextField label='Background' field='background' text={npc.background} direction='column' saveField={saveField} />
                </Grid>
                <Grid xs={6}>
                    {npc.monster && <MonsterSummary instance={npc.monster} />}
                </Grid>
            </Grid>
        </Box>
    )

    const loadingCheck = loading ?
        <Typography>Loading</Typography> :
        display

    return loadingCheck;
}