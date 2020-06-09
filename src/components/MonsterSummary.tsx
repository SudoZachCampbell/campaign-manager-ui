import * as React from 'react';
import { Box, Button, Grid, Typography } from '@material-ui/core'
import { IMonster, Field } from '../interfaces/Models';
import _ from 'lodash';
import { FieldType } from '../interfaces/Lookups';
import TogglingTextField from '../components/toggling/TogglingTextField';
import TogglingNumberField from '../components/toggling/TogglingNumberField';
import TogglingList from '../components/toggling/TogglingList';
import TogglingEnumField from '../components/toggling/TogglingEnumField';
import { Type } from '../api/dndDb';

interface MonsterSummaryProps {
    instance: IMonster | undefined
}

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
        name: "monster_type",
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
    }
]

export default function MonsterSummary(props: MonsterSummaryProps) {

    const renderMonsterArea = () => {
        console.log(`${props.instance?.name}: `, props.instance)
        return (
            <Box>
                <Grid container>
                    <Grid item xs={12}>
                        <Box mb={3} display='flex' justifyContent='center'>
                            <Typography variant={'h4'}>{props.instance?.name}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={props.instance?.picture ? 10 : 12}>
                    {fields.map((field) => {
                        const propsObj = {
                            key: field.name,
                            label: _.startCase(field.name),
                            field: field.name,
                            value: props.instance && props.instance[field.name]
                        }

                        // TODO: Add Object Type

                        switch (field.type) {
                            case FieldType.Number:
                                return <TogglingNumberField {...propsObj} toggle={false} />
                            case FieldType.String:
                                return <TogglingTextField {...propsObj} toggle={false} />
                            case FieldType.Enum:
                                return <TogglingEnumField {...propsObj} type={Type.Monster} toggle={false} />
                            case FieldType.Array:
                                return <TogglingList {...propsObj} toggle={false} />
                        }
                        return (
                            <Grid item xs={6}>
                                <Box display='flex'>
                                    <Typography variant='subtitle2' style={{ marginRight: '1em' }}> {_.startCase(field.name)}:</Typography>
                                    <Typography style={{ whiteSpace: 'pre-line' }} variant='body2' gutterBottom>{props.instance && props.instance[field.name]}</Typography>
                                </Box>
                            </Grid>
                        )
                    })}
                    </Grid>
                    {
                        props.instance?.picture &&
                        <Grid item xs={2}>
                            <Box width={1}>
                                <img width='100%' alt='' src={`https://ddimagecollection.s3-eu-west-1.amazonaws.com/monster/${props.instance.picture}`} />
                            </Box>
                        </Grid>
                    }
                    <Grid item xs={12}>
                        <Button variant="contained" color="secondary" href={`/monster-details/${props.instance?.id}`}>Details</Button>
                    </Grid>
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

