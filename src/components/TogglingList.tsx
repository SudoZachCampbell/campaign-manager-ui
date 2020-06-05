import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, IconButton, TextField, Typography, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import {SaveTwoTone as SaveIcon} from '@material-ui/icons';
import {CancelTwoTone as CancelIcon} from '@material-ui/icons';
import {FiberManualRecordOutlined as FiberIcon} from '@material-ui/icons';
import ListAdder from './ListAdder';

const useStyles = makeStyles(() => ({
    itemText: {
        fontSize: '1em'
    }
}))

export default function TogglingList(props: { items: string[] | undefined, label: string, field: string, saveField: Function }) {
    const [currentItems, setCurrentText] = useState<string[] | undefined>(['']);
    const [edit, setEdit] = useState<boolean>(false);

    const classes = useStyles();

    useEffect(() => {
        setCurrentText(props.items);
    }, [])

    const toggleEdit = () => {
        setEdit(!edit);
    }

    const saveField = () => {
        props.saveField(currentItems);
        toggleEdit();
    }

    const returnField = edit ?
        (<>
            <ListAdder label={props.label} items={currentItems} />
            <IconButton onClick={toggleEdit}><CancelIcon /></IconButton>
            <IconButton onClick={saveField}><SaveIcon /></IconButton>
        </>) :
        <Box display='flex' flexDirection='column'>
            <Typography variant='subtitle2' style={{ marginRight: '1em' }}> {props.label}:</Typography>
            <List onClick={toggleEdit}>
                {currentItems?.map(item => {
                    return (
                        <ListItem>
                            <ListItemIcon>
                                <FiberIcon fontSize='small' />
                            </ListItemIcon>
                            <ListItemText primary={item} classes={{ primary: classes.itemText }} />
                        </ListItem>
                    )
                })}
            </List>
        </Box>

    return returnField;
}