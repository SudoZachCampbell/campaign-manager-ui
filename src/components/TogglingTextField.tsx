import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, IconButton, TextField, Typography } from '@material-ui/core';
import { SaveTwoTone as SaveIcon } from '@material-ui/icons';
import { CancelTwoTone as CancelIcon } from '@material-ui/icons';
import { FiberManualRecordOutlined as FiberIcon } from '@material-ui/icons';

interface Props { 
    value: string, 
    label: string, 
    field: string, 
    saveField: Function, 
    column?: boolean 
}

export default function TogglingTextField(props: Props) {
    const [currentText, setCurrentText] = useState<string>('');
    const [edit, setEdit] = useState<boolean>(false);

    useEffect(() => {
        setCurrentText(props.value?.toString() ?? '');
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
                <TextField fullWidth defaultValue={currentText.replace('|', '\n\n')} multiline={true} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCurrentText(event.target.value.replace(/\n\n/, '|'))} />
                <IconButton onClick={saveField}><SaveIcon /></IconButton>
            </Box>
        </>) :
        <Box onClick={toggleEdit} display="flex" flexDirection={props.column ? 'column' : 'row'}>
            <Typography variant='subtitle2' style={{ marginRight: '1em' }} gutterBottom> {props.label}:</Typography>
            {console.log(`Current value for ${props.field} is ${currentText} with prop value ${props.value}`)}
            <Typography style={{ whiteSpace: 'pre-line' }} variant='body2' gutterBottom>{currentText.replace('|', '\n\n')}</Typography>
        </Box>

    return returnField;
}