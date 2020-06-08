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

const multiline: string[] = [
    "background"
]

const ignoreFields: string[] = [
    "picture"
]

const include = [
    "Monster",
    "Building",
    "Locale"
]

const tabs = {
    headers: [
        'Monster',
        'Pictures',
        'Location'
    ],
    data: [
        <MonsterSummary instance={entity.monster} />,
        <Pictures />,
        <Location />
    ]
}

export default function NpcDetails(props: { setPageName: Function, setPageBanner: Function }) {
    const [npc, setNpc] = useState<INpc>(BPNpc);
    const [loading, setLoading] = useState<boolean>(true);

    props.setPageName(npc.name);
    props.setPageBanner(npc.picture);

    const { id } = useParams();

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
        const data = await updateEntity<INpc>(Type.Npc, id, PatchType.List, '', include, '', patchList);
        setNpc(data);
    }

    const display = (
        <Box p={3}>
            <Grid container>
                <Grid item xs={6}>
                    <Box p={3}>
                        {_.map(npc, (value, field) => {
                            if (!field.includes('id') && !ignoreFields.includes(field)) {
                                switch (typeof value) {
                                    case 'number':
                                        return <TogglingTextField key={field} label={_.startCase(field)} field={field} text={JSON.stringify(value)} column={multiline.includes(field)} saveField={saveField} />
                                    case 'string':
                                        return <TogglingTextField key={field} label={_.startCase(field)} field={field} text={value} column={multiline.includes(field)} saveField={saveField} />
                                    case 'object':
                                        if (Array.isArray(value)) {
                                            return <TogglingList key={field} label={_.startCase(field)} field={field} items={value} saveField={saveList} />
                                        }
                                }
                            }
                        })}
                    </Box>
                </Grid>
                <Grid item xs={6}>
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