import React, { useState, useEffect } from 'react';
import { Box, IconButton, TextField, Typography } from '@material-ui/core';
import { SaveTwoTone as SaveIcon } from '@material-ui/icons';
import { CancelTwoTone as CancelIcon } from '@material-ui/icons';
import EditIcon from '@material-ui/icons/EditTwoTone';
import TogglingLabel from './TogglingLabel';

interface TogglingTextFieldProps {
  value: string;
  label: string;
  field: string;
  onSaveField?: Function;
  column?: boolean;
  noEdit?: boolean;
}

export default function TogglingTextField({
  value,
  label,
  field,
  onSaveField,
  column,
  noEdit,
}: TogglingTextFieldProps) {
  const [currentText, setCurrentText] = useState<string>('');
  const [edit, setEdit] = useState<boolean>(false);

  useEffect(() => {
    setCurrentText(value?.toString() ?? '');
  }, [value]);

  const toggleEdit = () => {
    setEdit(!edit);
  };

  const saveField = () => {
    onSaveField && onSaveField(field, currentText);
    toggleEdit();
  };

  const returnField = edit ? (
    <>
      <Typography
        variant='subtitle2'
        style={{ marginRight: '1em' }}
        gutterBottom
      >
        {' '}
        {label}:
      </Typography>
      <Box display='flex'>
        <IconButton onClick={toggleEdit}>
          <CancelIcon />
        </IconButton>
        <TextField
          fullWidth
          defaultValue={currentText.replace('|', '\n\n')}
          multiline={true}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setCurrentText(event.target.value.replace(/\n\n/, '|'))
          }
        />
        <IconButton onClick={saveField}>
          <SaveIcon />
        </IconButton>
      </Box>
    </>
  ) : (
    <TogglingLabel
      label={label}
      column={column ?? false}
      toggleEdit={toggleEdit}
      noEdit={noEdit}
    >
      <Typography
        style={{ whiteSpace: 'pre-line' }}
        variant='body2'
        gutterBottom
      >
        {currentText.replace('|', '\n\n')}
      </Typography>
    </TogglingLabel>
  );

  return returnField;
}
