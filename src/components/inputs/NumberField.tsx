import React, { useState, useEffect } from 'react';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import { SaveTwoTone as SaveIcon } from '@mui/icons-material';

interface NumberFieldProps {
  value?: number;
  label: string;
  field: string;
  onSaveField?: Function;
}

export const NumberField = ({
  value,
  label,
  field,
  onSaveField,
}: NumberFieldProps) => {
  const [currentText, setCurrentText] = useState<number>(0);

  useEffect(() => {
    setCurrentText(value ?? 0);
  }, [value]);

  const saveField = () => {
    onSaveField && onSaveField(field, currentText);
  };

  const returnField = (
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
        <TextField
          defaultValue={currentText}
          type='number'
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setCurrentText(Number(event.target.value))
          }
        />
      </Box>
    </>
  );

  return returnField;
};
