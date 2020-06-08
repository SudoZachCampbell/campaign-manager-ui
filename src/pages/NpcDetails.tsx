import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { INpc, Field } from '../interfaces/Models';
import { Typography } from '@material-ui/core';
import BP from '../interfaces/Initialisations'
import { Type, getEntity } from '../api/dndDb';
import MonsterSummary from '../components/MonsterSummary'
import _ from 'lodash';
import { FieldType } from '../interfaces/Lookups';
import Details from '../layouts/Details';

const multiline: string[] = [
    "background"
]

const ignoreFields: string[] = [
    "picture",
    "monster",
    "locale",
    "building"
]

const include = [
    "Monster",
    "Building",
    "Locale"
]

const fields: Field[] = [
    {
        name: "name",
        type: FieldType.String
    },
    {
        name: "background",
        type: FieldType.String
    },
    {
        name: "noteable_events",
        type: FieldType.Array
    },
    {
        name: "beliefs",
        type: FieldType.Array
    },
    {
        name: "passions",
        type: FieldType.Array
    },
    {
        name: "flaws",
        type: FieldType.Array
    }
]

export default function NpcDetails(props: { setPageName: Function, setPageBanner: Function }) {
    const [npc, setNpc] = useState<INpc>(BP.Npc);
    const [loading, setLoading] = useState<boolean>(true);

    props.setPageName(npc.name);
    props.setPageBanner(npc.picture);

    const { id } = useParams();

    const populateNpcData = async () => {
        const data = await getEntity<INpc>(Type.Npc, id, include);
        console.log(`NPC Details Data: `, data)
        setNpc(data);
        setLoading(false);
    }

    useEffect(() => {
        populateNpcData();
    }, [])

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

    const detailProps = {
        id,
        entity: npc,
        type: Type.Npc, 
        ignoreFields,
        multiline,
        include,
        tabs,
        fields
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