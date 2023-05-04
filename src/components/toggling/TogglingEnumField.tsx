import React, { useState, useEffect } from 'react';
import { Box, IconButton, MenuItem, Select, Typography } from '@mui/material';
import { SaveTwoTone as SaveIcon } from '@mui/icons-material';
import { ApiType, getEnumValues } from '../../api/dndDb';
import { CancelTwoTone as CancelIcon } from '@mui/icons-material';
import _ from 'lodash';
import TogglingLabel from './TogglingLabel';

interface TogglingEnumFieldProps {
  value: string;
  label: string;
  field: string;
  type: ApiType;
  onSaveField?: Function;
  noEdit?: boolean;
}

export default function TogglingEnumField({
  value,
  label,
  field,
  type,
  onSaveField,
  noEdit,
}: TogglingEnumFieldProps) {
  const [currentValue, setCurrentValue] = useState<string>('');
  const [enumValues, setEnumValues] = useState<string[]>([]);
  const [edit, setEdit] = useState<boolean>(false);

  useEffect(() => {
    setCurrentValue(value ?? '');
  }, [value]);

  const getEnum = async () => {
    const enumList: string[] = await getEnumValues(type, field);
    setEnumValues(enumList);
  };

  useEffect(() => {
    getEnum();
  }, []);

  const toggleEdit = () => {
    setEdit(!edit);
  };

  const saveField = () => {
    onSaveField && onSaveField(field, currentValue);
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
        <IconButton onClick={toggleEdit} size='large'>
          <CancelIcon />
        </IconButton>
        <Select
          value={currentValue}
          onChange={(event) => setCurrentValue(event.target.value as string)}
        >
          {enumValues.map((value, index) => (
            <MenuItem key={index} value={index}>
              {_.startCase(value)}
            </MenuItem>
          ))}
        </Select>
        <IconButton onClick={saveField} size='large'>
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
        {/* {_.startCase(enumValues[currentValue])} */}
      </Typography>
    </TogglingLabel>
  );

  return returnField;
}
