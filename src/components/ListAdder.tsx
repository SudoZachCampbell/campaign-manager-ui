import React, { useState, useEffect } from 'react';
import { Box, IconButton, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@material-ui/core';
import { SaveTwoTone as SaveIcon } from '@material-ui/icons';
import { AddCircleTwoTone as AddIcon } from '@material-ui/icons';
import { DeleteTwoTone as DeleteIcon } from '@material-ui/icons';
import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
        paper: {
            width: '80%',
            maxHeight: 435,
        },
    }),
);

export default function ListAdder(props: { label: string, items: string[] | undefined }) {
    const [list, setList] = useState(props.items)
    const [changes, setChanges] = useState<object[]>([])
    const [deleteIndex, setDeleteIndex] = useState(-1);

    const classes = useStyles();

    const openDeleteDialog = (index: number) => {
        setDeleteIndex(index)
    }

    const handleClose = (deleteItem: boolean) => {
        if (deleteItem) {

        }
        setDeleteIndex(-1)
    }

    const saveField = () => {
        
    }

    const listArea = (
        <Box>
            {list?.map((item, index) => (
                <Box display='flex'>
                    <IconButton onClick={() => openDeleteDialog(index)}>
                        <DeleteIcon />
                    </IconButton>
                    <TextField key={index} fullWidth defaultValue={item} multiline={true} />
                    <IconButton onClick={saveField}>
                        <SaveIcon />
                    </IconButton>
                </Box>
            ))}
            <IconButton>
                <AddIcon />
            </IconButton>
            <ConfirmationDialogRaw
                classes={{
                    paper: classes.paper,
                }}
                id="delete-confirm"
                keepMounted
                open={deleteIndex !== -1}
                onClose={handleClose}
                title={props.label}
                value={deleteIndex}
            />
        </Box>
    )

    return listArea;
}

export interface ConfirmationDialogRawProps {
    classes: Record<'paper', string>;
    id: string;
    keepMounted: boolean;
    title: string;
    open: boolean;
    value: number;
    onClose: (deleteItem: boolean) => void;
}

function ConfirmationDialogRaw(props: ConfirmationDialogRawProps) {
    const radioGroupRef = React.useRef<HTMLElement>(null);

    const handleEntering = () => {
        if (radioGroupRef.current != null) {
            radioGroupRef.current.focus();
        }
    };

    const handleCancel = () => {
        props.onClose(false);
    };

    const handleOk = () => {
        props.onClose(true);
    };

    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            maxWidth="xs"
            onEntering={handleEntering}
            aria-labelledby="confirmation-dialog-title"
            open={props.open}
        >
            <DialogTitle id="confirmation-dialog-title">Delete Item</DialogTitle>
            <DialogContent dividers>
                <Typography>Are you sure you want to delete this {props.title}?</Typography>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCancel} color="primary">
                    Cancel
          </Button>
                <Button onClick={handleOk} color="primary">
                    Ok
          </Button>
            </DialogActions>
        </Dialog>
    );
}
