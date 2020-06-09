import React, { useState } from 'react'
import { Box, IconButton, Typography, Grid } from '@material-ui/core'
import EditIcon from '@material-ui/icons/EditTwoTone'

interface Props {
    label: string,
    toggleEdit: Function,
    column?: boolean,
    noEdit?: boolean,
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
        <Box mb={props.noEdit && 2} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} display="flex">
            {!props.noEdit ? (
                <Box display='flex' mr={3} flexDirection={props.column ? 'column' : 'row'}>
                    <Typography variant='subtitle2' style={{ marginRight: '1em', marginBottom: '0.25em' }}> {props.label}:</Typography>
                    <Box display='flex'>
                        {props.children}
                        <IconButton style={{ visibility: hideEdit || props.noEdit ? 'hidden' : 'visible' }} size='small' onClick={toggleEdit}><EditIcon fontSize='small' /></IconButton>
                    </Box>
                </Box >
            ) : (
                    <Grid container xs={12}>
                        <Grid item xs={5}>
                            <Typography variant='subtitle2' style={{ marginRight: '1em' }}> {props.label}:</Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <Box display='flex'>
                                {props.children}
                                <IconButton style={{ marginLeft: '1em', visibility: hideEdit || props.noEdit ? 'hidden' : 'visible' }} size='small' onClick={toggleEdit}><EditIcon fontSize='small' /></IconButton>
                            </Box>
                        </Grid>
                    </Grid>
                )
            }
        </Box >
    )
}