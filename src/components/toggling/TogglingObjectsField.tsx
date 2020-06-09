import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import { FiberManualRecordOutlined as FiberIcon } from '@material-ui/icons';
import { ListAdder, Change } from '../ListAdder';
import { Patch } from '../../interfaces/Requests'
import _ from 'lodash'
import EditIcon from '@material-ui/icons/EditTwoTone';
import TogglingLabel from './TogglingLabel'
import { ToggleType } from '../../interfaces/Lookups';
import TogglingTextField from './TogglingTextField';

interface Props {
    value: object[],
    label: string,
    field: string,
    saveField?: Function,
    noEdit?: boolean,
    toggleType?: ToggleType
}

export default function TogglingObjectsField(props: Props) {
    const [currentItems, setCurrentItems] = useState<object[] | undefined>([]);
    const [edit, setEdit] = useState<boolean>(false);

    useEffect(() => {
        setCurrentItems(props.value);
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
            props.saveField && props.saveField(props.field, patchList);
        }
        toggleEdit();
    }

    interface TogglingProps {
        value: string,
        label: string,
        field: string,
        saveField?: Function,
        column?: boolean,
        noEdit?: boolean
    }

    const returnField = () => {
        switch (props.toggleType) {
            case ToggleType.Enum:
                return;
            case ToggleType.List:
                return;
            case ToggleType.Text:
                console.log("Current Items: ", currentItems)
                return (
                    <Box display='flex' flexDirection='column'>
                        {currentItems?.map(instance => {
                            return <TogglingTextField label={instance['name']} value={instance['desc']} field={props.field} noEdit={props.noEdit} />
                        })}
                    </Box>)
            case ToggleType.Number:
                return;
        }
    }

    return (
        <TogglingLabel label={props.label} title column toggleEdit={toggleEdit} noEdit >
            {returnField()}
        </TogglingLabel>
    )
}