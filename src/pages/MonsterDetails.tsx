import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TogglingTextField from '../components/TogglingTextField';
import { IMonster } from '../interfaces/Models';
import { Box, Grid, Typography, Paper, Tab, Tabs, Button } from '@material-ui/core';
import BP from '../interfaces/Initialisations'
import { Type, getEntity, updateEntity, PatchType } from '../api/dndDb';
import MonsterSummary from '../components/MonsterSummary'
import SubMenu from '../components/SubMenu';
import TogglingList from '../components/TogglingList';
import { Patch } from '../interfaces/Requests';
import _ from 'lodash';
import Details from '../layouts/Details';

const multiline: string[] = [
    "background"
]

const ignoreFields: string[] = [
    "picture"
]

const include = [
    "Building",
    "Locale"
]

export default function MonsterDetails(props: { setPageName: Function, setPageBanner: Function }) {
    const [monster, setMonster] = useState<IMonster>(BP.Monster);
    const [loading, setLoading] = useState<boolean>(true);

    props.setPageName(monster.name);
    props.setPageBanner(monster.picture);

    const { id } = useParams();

    const populateMonsterData = async () => {
        const data = await getEntity<IMonster>(Type.Monster, id, include);
        console.log(`Monster Details Data: `, data)
        setMonster(data);
        setLoading(false);
    }

    useEffect(() => {
        populateMonsterData();
    }, [])

    const tabs = {
        headers: [
            'Monster',
            'Pictures',
            'Location'
        ],
        data: [
            <MonsterSummary instance={monster.monster} />,
            <Pictures />,
            <Location />
        ]
    }

    const detailProps = {
        id,
        entity: monster,
        type: Type.Monster, 
        ignoreFields,
        multiline,
        include,
        tabs
    }

    const display = <Details {...detailProps} />

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