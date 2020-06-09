import React, { useState, useEffect } from 'react';
import { Box, IconButton, MenuItem, Select, Typography } from '@material-ui/core';
import { SaveTwoTone as SaveIcon } from '@material-ui/icons';
import { Type, getEnumValues } from '../../api/dndDb';
import { CancelTwoTone as CancelIcon } from '@material-ui/icons';
import EditIcon from '@material-ui/icons/EditTwoTone';
import _ from 'lodash'
import TogglingLabel from './TogglingLabel';

interface Props {
    value: string,
    label: string,
    field: string,
    type: Type,
    saveField: Function,
}

export default function TogglingEnumField(props: Props) {
    const [currentValue, setCurrentValue] = useState<string>('');
    const [enumValues, setEnumValues] = useState<string[]>([]);
    const [edit, setEdit] = useState<boolean>(false);

    useEffect(() => {
        setCurrentValue(props.value ?? '');
    }, [props.value])

    const getEnum = async () => {
        const enumList: string[] = await getEnumValues(props.type, props.field);
        setEnumValues(enumList);
    }

    useEffect(() => {
        getEnum();
    }, [])

    const toggleEdit = () => {
        setEdit(!edit);
    }

    const saveField = () => {
        props.saveField(props.field, currentValue);
        toggleEdit();
    }

    const returnField = edit ?
        (<>
            <Typography variant='subtitle2' style={{ marginRight: '1em' }} gutterBottom> {props.label}:</Typography>
            <Box display="flex">
                <IconButton onClick={toggleEdit}><CancelIcon /></IconButton>
                <Select value={currentValue} onChange={(event: React.ChangeEvent<{ value: unknown }>) => setCurrentValue(event.target.value as string)}>
                    {enumValues.map((value, index) => (
                        <MenuItem key={index} value={index}>{_.startCase(value)}</MenuItem>
                    ))}
                </Select>
                <IconButton onClick={saveField}><SaveIcon /></IconButton>
            </Box>
        </>) :
        <TogglingLabel label={props.label} toggleEdit={toggleEdit} >
            <Typography style={{ whiteSpace: 'pre-line' }} variant='body2' gutterBottom>{_.startCase(enumValues[currentValue])}</Typography>
        </TogglingLabel>

    return returnField;
}