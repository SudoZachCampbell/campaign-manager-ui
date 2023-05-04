import React, { useState, useEffect } from 'react';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import { SaveTwoTone as SaveIcon } from '@mui/icons-material';
import { CancelTwoTone as CancelIcon } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/EditTwoTone';
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
        <IconButton onClick={toggleEdit} size="large">
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
        <IconButton onClick={saveField} size="large">
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
