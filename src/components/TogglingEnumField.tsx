import React, { useState, useEffect } from 'react';
import { Button, IconButton, TextField, Typography } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';

export default function TogglingEnumField(props: { text: string | undefined, label: string, saveField: Function }) {
    const [currentText, setCurrentText] = useState<string | undefined>('');
    const [edit, setEdit] = useState<boolean>(false);

    useEffect(() => {
        setCurrentText(props.text);
    }, [])

    const toggleEdit = () => {
        setEdit(!edit);
    }

    const saveField = () => {
        props.saveField(currentText);
        toggleEdit();
    }

    const returnField = edit ?
        (<>
            <IconButton onClick={toggleEdit}><DeleteIcon /></IconButton>
            <TextField label={props.label} defaultValue={currentText} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCurrentText(event.target.value)} />
            <Button onClick={saveField} variant='contained' color='primary'>Save</Button>
        </>) :
        <Typography onClick={toggleEdit} variant='body2' > {currentText}</Typography>

    return returnField;
}