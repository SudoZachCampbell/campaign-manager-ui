import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, IconButton, TextField, Typography } from '@material-ui/core';
import { SaveTwoTone as SaveIcon } from '@material-ui/icons';
import { CancelTwoTone as CancelIcon } from '@material-ui/icons';
import { FiberManualRecordOutlined as FiberIcon } from '@material-ui/icons';

interface Props {
    value: number,
    label: string,
    field: string,
    saveField: Function,
    column?: boolean
}

export default function TogglingNumberField(props: Props) {
    const [currentText, setCurrentText] = useState<number>(0);
    const [edit, setEdit] = useState<boolean>(false);

    useEffect(() => {
        setCurrentText(props.value ?? 0);
    }, [props.value])

    const toggleEdit = () => {
        setEdit(!edit);
    }

    const saveField = () => {
        props.saveField(props.field, currentText);
        toggleEdit();
    }

    const returnField = edit ?
        (<>
            <Typography variant='subtitle2' style={{ marginRight: '1em' }} gutterBottom> {props.label}:</Typography>
            <Box display="flex">
                <IconButton onClick={toggleEdit}><CancelIcon /></IconButton>
                <TextField defaultValue={currentText} type='number' onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCurrentText(Number(event.target.value))} />
                <IconButton onClick={saveField}><SaveIcon /></IconButton>
            </Box>
        </>) :
        <Box onClick={toggleEdit} display="flex" flexDirection={props.column ? 'column' : 'row'}>
            <Typography variant='subtitle2' style={{ marginRight: '1em' }} gutterBottom> {props.label}:</Typography>
            <Typography style={{ whiteSpace: 'pre-line' }} variant='body2' gutterBottom>{currentText}</Typography>
        </Box>

    return returnField;
}