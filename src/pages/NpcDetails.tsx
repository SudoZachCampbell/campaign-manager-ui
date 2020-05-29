import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TogglingTextField from '../components/TogglingTextField';
import { INpc } from '../interfaces/Models';
import { Grid, Typography } from '@material-ui/core';
import { BPNpc } from '../interfaces/Initialisations'

export default function NpcDetails(props: { setPageName: Function }) {
    const [npc, setNpc] = useState<INpc>(BPNpc);
    const [loading, setLoading] = useState<boolean>(true);

    props.setPageName('Npc Details');

    const { id } = useParams();

    const populateNpcData = async () => {
        const response = await fetch(`http://localhost:53596/Npc/${id}`);
        console.log("NPC Details Response: ", response);
        const data = await response.json();
        console.log("NPC Details Data: ", data);
        setNpc(data);
        setLoading(false);
    }

    useEffect(() => {
        populateNpcData();
    }, [])

    const saveField = () => {

    }

    const display = (
        <Grid container>
            <Grid xs={12}>
                <Typography id="pageHeader" variant='h2' gutterBottom>{npc.name}</Typography>
            </Grid>
            <Grid xs={6}>
                <TogglingTextField label='Name' text={npc.name} saveField={saveField} />
            </Grid>
            <Grid xs={6}>
                <TogglingTextField label='Monster Name' text={npc.monster?.name} saveField={saveField} />
            </Grid>
            <Grid xs={6}>
                <TogglingTextField label='Name' text={npc.name} saveField={saveField} />
            </Grid>
            <Grid xs={6}>
                <TogglingTextField label='Monster Name' text={npc.monster?.name} saveField={saveField} />
            </Grid>
        </Grid>

    )

    const loadingCheck = loading ?
        <Typography>Loading</Typography> :
        display

    return loadingCheck;
}