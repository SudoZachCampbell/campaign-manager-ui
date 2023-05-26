import React, { useState, useEffect } from 'react';
import {
  Typography,
  ListItem,
  List as MuiList,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { FiberManualRecordOutlined as FiberIcon } from '@mui/icons-material';
import { ListAdder, Change } from './ListAdder';
import { Patch } from '../../interfaces/Requests';
import _ from 'lodash';

interface ListProps {
  value: string[];
  label: string;
  field: string;
  onSaveField?: Function;
}

export const List = ({ value, label, field, onSaveField }: ListProps) => {
  const [currentItems, setCurrentItems] = useState<string[]>([]);

  useEffect(() => {
    setCurrentItems(value);
  }, [value]);

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
  };

  return (
    <>
      <Typography variant='subtitle2' style={{ marginRight: '1em' }}>
        {' '}
        {label}:
      </Typography>
      <ListAdder label={label} items={currentItems} saveField={saveField} />
    </>
  );
};
