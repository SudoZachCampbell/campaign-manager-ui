import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TogglingTextField from '../components/TogglingTextField';
import { INpc } from '../interfaces/Models';
import { Box, Grid, Typography, Paper, Tab, Tabs, Button } from '@material-ui/core';
import { BPNpc } from '../interfaces/Initialisations'
import { Type, getEntity, updateEntity, PatchType } from '../api/dndDb';
import MonsterSummary from '../components/MonsterSummary'
import SubMenu from '../components/SubMenu';
import TogglingList from '../components/TogglingList';
import { Patch } from '../interfaces/Requests';
import _ from 'lodash';

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
        // TODO: Why is monster disappearing
        populateNpcData();
    }, [])

    const saveField = async (field: string, value: any) => {
        const data: INpc = await updateEntity<INpc>(Type.Npc, id, PatchType.Add, `/${_.camelCase(field)}`, value);
        setNpc(data);
    }

    const saveList = async (field: string, patchList: Patch[]) => {
        const data = await updateEntity<INpc>(Type.Npc, id, PatchType.List, '', '', patchList);
        setNpc(data);
    }

    console.log("NPC: ", npc)

    const tabs = {
        headers: [
            'Monster',
            'Pictures',
            'Location'
        ],
        data: [
            <MonsterSummary instance={npc.monster} />,
            <Pictures />,
            <Location />
        ]
    }

    const display = (
        <Box p={3}>
            <Grid container>
                <Grid xs={6}>
                    <Box p={3}>
                        <TogglingTextField label='Name' field='name' text={npc.name} saveField={saveField} />
                        <TogglingTextField label='Background' field='background' text={npc.background} direction='column' saveField={saveField} />
                        <TogglingList label='Noteable Events' field='noteable_events' items={npc.noteable_events} saveField={saveList} />
                        {
                            npc.noteable_events.map(event => <Typography>{event}</Typography>)
                        }
                    </Box>
                </Grid>
                <Grid xs={6}>
                    <Box p={3}>
                        <SubMenu tabs={tabs} />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )

    const loadingCheck = loading ?
        <Typography>Loading</Typography> :
        display

    return loadingCheck;
}

function Pictures(props) {
    return <Typography>Test Pictures</Typography>
}

function Location(props) {
    return <Typography>Test Location</Typography>
}