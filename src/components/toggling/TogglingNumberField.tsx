import React, { useState, useEffect } from 'react';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import { SaveTwoTone as SaveIcon } from '@mui/icons-material';
import { CancelTwoTone as CancelIcon } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/EditTwoTone';
import TogglingLabel from './TogglingLabel';

interface TogglingNumberFieldProps {
  value?: number;
  label: string;
  field: string;
  onSaveField?: Function;
  column?: boolean;
  noEdit?: boolean;
}

export default function TogglingNumberField({
  value,
  label,
  field,
  onSaveField,
  column,
  noEdit,
}: TogglingNumberFieldProps) {
  const [currentText, setCurrentText] = useState<number>(0);
  const [edit, setEdit] = useState<boolean>(false);

  useEffect(() => {
    setCurrentText(value ?? 0);
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
          defaultValue={currentText}
          type='number'
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setCurrentText(Number(event.target.value))
          }
        />
        <IconButton onClick={saveField} size="large">
          <SaveIcon />
        </IconButton>
      </Box>
    </>
  ) : (
    <TogglingLabel label={label} toggleEdit={toggleEdit} noEdit={noEdit}>
      <Typography
        style={{ whiteSpace: 'pre-line' }}
        variant='body2'
        gutterBottom
      >
        {currentText}
      </Typography>
    </TogglingLabel>
  );

  return returnField;
}
