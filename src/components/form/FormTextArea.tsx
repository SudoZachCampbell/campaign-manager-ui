import React, { useState, useEffect } from 'react';
import {
  Box,
  IconButton,
  TextField as MuiTextField,
  Typography,
} from '@mui/material';
import { SaveTwoTone as SaveIcon } from '@mui/icons-material';

interface FormTextAreaProps {
  value?: string;
  label?: string;
  field?: string;
  onSaveField?: Function;
}

export const FormTextArea = ({
  value = '',
  label,
  field,
  onSaveField,
}: FormTextAreaProps) => {
  const [currentText, setCurrentText] = useState<string>('');

  useEffect(() => {
    setCurrentText(value?.toString() ?? '');
  }, [value]);

  const saveField = () => {
    onSaveField && onSaveField(field, currentText);
  };

  return (
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
        <MuiTextField
          fullWidth
          defaultValue={currentText.replace('|', '\n\n')}
          multiline={true}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setCurrentText(event.target.value.replace(/\n\n/, '|'))
          }
        />
      </Box>
    </>
  );
};
