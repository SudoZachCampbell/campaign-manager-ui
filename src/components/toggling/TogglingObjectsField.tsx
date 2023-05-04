import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { Change } from '../ListAdder';
import { Patch } from '../../interfaces/Requests';
import _ from 'lodash';
import TogglingLabel from './TogglingLabel';
import { ToggleType } from '../../interfaces/Lookups';
import TogglingTextField from './TogglingTextField';

interface ToggledObject {
  name: string;
  desc: string;
}

interface TogglingObjectsFieldProps {
  value: ToggledObject[];
  label: string;
  field: string;
  outerSaveField?: Function;
  noEdit?: boolean;
  toggleType?: ToggleType;
}

export default function TogglingObjectsField({
  value,
  label,
  field,
  outerSaveField,
  noEdit,
  toggleType,
}: TogglingObjectsFieldProps) {
  const [currentItems, setCurrentItems] = useState<ToggledObject[]>([]);
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
      (accum, changeValue, op) => {
        let opPatch = _.map(changeValue, (property, index) => {
          let patch: Patch = {
            op,
            path: `/${_.camelCase(field)}/${
              op === 'add' ? '-' : property.index
            }`,
          };
          if (op === 'add') {
            if (property['value']) {
              patch.value = property['value'];
            }
          }
          return patch;
        });
        return accum.concat(opPatch);
      },
      patchList,
    );
    // TODO: Remove warnings around nesting
    if (patchList.length) {
      outerSaveField && outerSaveField(field, patchList);
    }
    toggleEdit();
  };

  const returnField = () => {
    switch (toggleType) {
      case ToggleType.Enum:
        return;
      case ToggleType.List:
        return;
      case ToggleType.Text:
        return (
          <Box display='flex' flexDirection='column'>
            {currentItems?.map((instance) => {
              return (
                <TogglingTextField
                  label={instance['name']}
                  value={instance['desc']}
                  field={field}
                  noEdit={noEdit}
                />
              );
            })}
          </Box>
        );
      case ToggleType.Number:
        return;
    }
  };

  return (
    <TogglingLabel label={label} title column toggleEdit={toggleEdit} noEdit>
      {returnField()}
    </TogglingLabel>
  );
}
