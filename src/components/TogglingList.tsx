import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import { FiberManualRecordOutlined as FiberIcon } from '@material-ui/icons';
import { ListAdder, Change } from './ListAdder';
import { Patch } from '../interfaces/Requests'
import _ from 'lodash'

const useStyles = makeStyles(() => ({
    itemText: {
        fontSize: '1em'
    }
}))

interface Props { 
    value: string[], 
    label: string, 
    field: string, 
    saveField: Function 
}

export default function TogglingList(props: Props) {
    const [currentItems, setCurrentText] = useState<string[]>(['']);
    const [edit, setEdit] = useState<boolean>(false);

    const classes = useStyles();

    useEffect(() => {
        setCurrentText(props.value);
    }, [props.value])

    const toggleEdit = () => {
        setEdit(!edit);
    }

    const saveField = (changes: Change) => {
        let patchList: Patch[] = []
        console.log("Changes: ", changes)
        patchList = _.reduce(changes, (accum, value, op) => {
            let opPatch = _.map(value, (property, index) => {
                let patch: Patch = {
                    op,
                    path: `/${_.camelCase(props.field)}/${op === 'add' ? '-' : property.index}`
                }
                if (property['value']) {
                    patch.value = property['value']
                }
                console.log(`Patch for ${property.index} with op ${op}: `, patch);
                return patch;
            });
            return accum.concat(opPatch)
        }, patchList)
        // TODO: Remove warnings around nesting
        console.log("Patch List: ", patchList);
        if (patchList.length) {
            props.saveField(props.field, patchList);
        }
        toggleEdit();
    }

    const returnField = edit ?
        (<>
            <Typography variant='subtitle2' style={{ marginRight: '1em' }}> {props.label}:</Typography>
            <ListAdder label={props.label} items={currentItems} saveField={saveField} toggleEdit={toggleEdit} />
        </>) :
        <Box onClick={toggleEdit} display='flex' flexDirection='column'>
            <Typography variant='subtitle2' style={{ marginRight: '1em' }}> {props.label}:</Typography>
            <List>
                {currentItems?.map((item, index) => {
                    return (
                        <ListItem key={index}>
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