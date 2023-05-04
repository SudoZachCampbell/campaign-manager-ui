import React, { useState, useEffect } from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { FiberManualRecordOutlined as FiberIcon } from '@mui/icons-material';
import { ListAdder, Change } from '../ListAdder';
import { Patch } from '../../interfaces/Requests';
import _ from 'lodash';
import TogglingLabel from './TogglingLabel';

interface TogglingListProps {
  value: string[];
  label: string;
  field: string;
  onSaveField?: Function;
  noEdit?: boolean;
}

export default function TogglingList({
  value,
  label,
  field,
  onSaveField,
  noEdit,
}: TogglingListProps) {
  const [currentItems, setCurrentItems] = useState<string[]>([]);
  const [edit, setEdit] = useState<boolean>(false);

  useEffect(() => {
    setCurrentItems(value);
  }, [value]);

  const toggleEdit = () => {
    setEdit(!edit);
  };

  const saveField = (changes: Change) => {
    let patchList: Patch[] = [];
    patchList = _.reduce(
      changes,
      (accum, value, op) => {
        let opPatch = _.map(value, (property, index) => {
          let patch: Patch = {
            op,
            path: `/${_.camelCase(field)}/${
              op === 'add' ? '-' : property.index
            }`,
          };
          if (property['value']) {
            patch.value = property['value'];
          }
          return patch;
        });
        return accum.concat(opPatch);
      },
      patchList,
    );
    // TODO: Remove warnings around nesting
    if (patchList.length) {
      onSaveField && onSaveField(field, patchList);
    }
    toggleEdit();
  };

  const returnField = edit ? (
    <>
      <Typography variant='subtitle2' style={{ marginRight: '1em' }}>
        {' '}
        {label}:
      </Typography>
      <ListAdder
        label={label}
        items={currentItems}
        saveField={saveField}
        toggleEdit={toggleEdit}
      />
    </>
  ) : (
    <TogglingLabel label={label} column toggleEdit={toggleEdit} noEdit={noEdit}>
      <List>
        {currentItems?.map((item, index) => {
          return (
            <ListItem key={index}>
              <ListItemIcon>
                <FiberIcon fontSize='small' />
              </ListItemIcon>
              <ListItemText
                primary={item}
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
          );
        })}
      </List>
    </TogglingLabel>
  );
  return returnField;
}
