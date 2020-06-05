import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, IconButton, TextField, Typography } from '@material-ui/core';
import {SaveTwoTone as SaveIcon} from '@material-ui/icons';
import {CancelTwoTone as CancelIcon} from '@material-ui/icons';
import {FiberManualRecordOutlined as FiberIcon} from '@material-ui/icons';

export default function TogglingTextField(props: { text: string | undefined, label: string, field: string, saveField: Function, direction?: string }) {
    const [currentText, setCurrentText] = useState<string | undefined>('');
    const [edit, setEdit] = useState<boolean>(false);

    useEffect(() => {
        setCurrentText(props.text);
    }, [])

    const toggleEdit = () => {
        setEdit(!edit);
    }

    const saveField = () => {
        props.saveField(props.field, currentText);
        toggleEdit();
    }

    const returnField = edit ?
        (<Box display="flex">
            <IconButton onClick={toggleEdit}><CancelIcon /></IconButton>
            <TextField fullWidth label={props.label} defaultValue={currentText?.replace('|', '\n\n')} multiline={true} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCurrentText(event.target.value.replace(/\n\n/, '|'))} />
            <IconButton onClick={saveField}><SaveIcon /></IconButton>
        </Box>) :
        <Box display="flex" flexDirection={props.direction || 'row'}>
            <Typography variant='subtitle2' style={{ marginRight: '1em' }} gutterBottom> {props.label}:</Typography>
            <Typography onClick={toggleEdit} style={{whiteSpace:'pre-line'}} variant='body2' gutterBottom>{currentText?.replace('|', '\n\n')}</Typography>
        </Box>

    return returnField;
}