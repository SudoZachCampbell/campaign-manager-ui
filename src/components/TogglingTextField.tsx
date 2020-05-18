import React, { useState, useEffect } from 'react';
import { TextField, Typography } from '@material-ui/core';

export default function TogglingTextField(props: any) {
    const [text, setText] = useState<string>('');
    const [edit, setEdit] = useState<boolean>(false);

    useEffect(() => {
        setText(props.text);
    }, [])

    const returnField = edit ?
        <Typography variant='body2'>{text}</Typography> :
        <TextField label={props.label} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setText(event.target.value)}>{text}</TextField>

    return returnField;
}