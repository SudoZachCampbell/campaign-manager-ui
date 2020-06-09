import React, { useState } from 'react'
import { Box, IconButton, Typography } from '@material-ui/core'
import EditIcon from '@material-ui/icons/EditTwoTone'

interface Props {
    label: string,
    toggleEdit: Function,
    column?: boolean,
    children: any
}

export default function (props: Props) {
    const [hideEdit, setHideEdit] = useState<boolean>(true);

    const toggleEdit = () => {
        props.toggleEdit();
    }

    const handleMouseEnter = () => {
        setHideEdit(false)
    }

    const handleMouseLeave = () => {
        setHideEdit(true)
    }

    return (
        <Box mb={2} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} display="flex" justifyContent='space-between'>
            <Box display='flex' flexDirection={props.column ? 'column' : 'row'}>
                <Typography variant='subtitle2' style={{ marginRight: '1em' }}> {props.label}:</Typography>
                {props.children}
            </Box>
            <IconButton style={{visibility: hideEdit ? 'hidden' : 'visible'}} size='small' onClick={toggleEdit}><EditIcon fontSize='small' /></IconButton>
        </Box>
    )
}