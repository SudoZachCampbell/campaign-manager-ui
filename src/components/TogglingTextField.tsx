import React, { useState, useEffect } from 'react';
import { Button, IconButton, TextField, Typography } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';

export default function TogglingTextField(props: any) {
    const [text, setText] = useState<string>('');
    const [edit, setEdit] = useState<boolean>(false);

    useEffect(() => {
        setText(props.text);
    }, [])

    const toggleEdit = () => {
        setEdit(!edit);
    }

    const saveField = () => {
        props.saveField(text);
        toggleEdit();
    }

    const returnField = edit ?
        <Typography variant='body2'>{text}</Typography> :
        (<>
            <IconButton onClick={toggleEdit}><DeleteIcon /></IconButton>
            <TextField label={props.label} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setText(event.target.value)}>
                {text}
            </TextField>
            <Button onClick={saveField} variant='contained' color='primary'>Save</Button>
        </>)

    return returnField;
}