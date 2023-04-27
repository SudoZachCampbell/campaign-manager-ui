import React, { useState, useEffect } from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { FiberManualRecordOutlined as FiberIcon } from '@material-ui/icons';
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
    console.log('Changes: ', changes);
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
          console.log(`Patch for ${property.index} with op ${op}: `, patch);
          return patch;
        });
        return accum.concat(opPatch);
      },
      patchList,
    );
    // TODO: Remove warnings around nesting
    console.log('Patch List: ', patchList);
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
