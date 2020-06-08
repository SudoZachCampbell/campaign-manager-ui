import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IMonster, Field } from '../interfaces/Models';
import { Typography } from '@material-ui/core';
import BP from '../interfaces/Initialisations'
import { Type, getEntity } from '../api/dndDb';
import _ from 'lodash';
import Details from '../layouts/Details';
import { FieldType } from '../interfaces/Lookups';

const ignoreFields: string[] = [
    "picture",
    "buildings",
    "locales",
    "npcs",
    "reactions",
    "speed",
    "proficiencies",
    "actions",
    "legendary_actions",
    "special_abilities"
]

const include = [
    "Buildings",
    "Locales"
]

const fields: Field[] = [
    {
        name: "name",
        type: FieldType.String
    },
    {
        name: "size",
        type: FieldType.String
    },
    {
        name: "hit_dice",
        type: FieldType.String
    },
    {
        name: "languages",
        type: FieldType.String
    },
    {
        name: "challenge_rating",
        type: FieldType.Number
    },
    {
        name: "passive_perception",
        type: FieldType.Number
    },
    {
        name: "type",
        type: FieldType.Enum
    },
    {
        name: "strength",
        type: FieldType.Number
    },
    {
        name: "dexterity",
        type: FieldType.Number
    },
    {
        name: "constitution",
        type: FieldType.Number
    },
    {
        name: "intelligence",
        type: FieldType.Number
    },
    {
        name: "wisdom",
        type: FieldType.Number
    },
    {
        name: "charisma",
        type: FieldType.Number
    },
    {
        name: "armor_class",
        type: FieldType.String
    },
    {
        name: "hit_points",
        type: FieldType.String
    },
    {
        name: "alignment",
        type: FieldType.Enum
    },
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
            'Pictures',
            'Location'
        ],
        data: [
            <Pictures />,
            <Location />
        ]
    }

    const detailProps = {
        id,
        entity: monster,
        type: Type.Monster,
        ignoreFields,
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