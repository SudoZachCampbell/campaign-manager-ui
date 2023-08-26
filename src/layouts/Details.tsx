import * as React from 'react';
import { useState, useEffect } from 'react';
import { Field } from '../interfaces/Models';
import { FieldType } from '../interfaces/Lookups';
import { Box, Grid } from '@mui/material';
import { ApiType, PatchType } from '../api/dndDb';
import SubMenu from '../components/SubMenu';
import TogglingTextField from '../components/toggling/TogglingTextField';
import TogglingNumberField from '../components/toggling/TogglingNumberField';
import TogglingList from '../components/toggling/TogglingList';
import TogglingEnumField from '../components/toggling/TogglingSelect';
import { Patch } from '../interfaces/Requests';
import _ from 'lodash';

import { Base } from '../api/model/Base';

interface Props<T extends Base> {
  entity: T;
  type: ApiType;
  ignoreFields: string[];
  multiline?: string[];
  expand: string[];
  fields: Field<T>[];
  tabs: any;
  onSave: () => void;
}

export default <T extends Base>({
  entity,
  type,
  ignoreFields,
  multiline,
  expand,
  fields,
  tabs,
  onSave,
}: Props<T>) => {
  const [updatedEntity, setUpdatedEntity] = useState<T>();

  const saveField = async (field: string, value: any) => {
    // const data: T = await updateEntity<T>(
    //   type,
    //   entity.id,
    //   PatchType.Add,
    //   `/${_.camelCase(field)}`,
    //   [''],
    //   value,
    // );
    // setUpdatedEntity(data);
  };

  const saveList = async (field: string, patchList: Patch[]) => {
    // const data: T = await updateEntity<T>(
    //   type,
    //   entity.id,
    //   PatchType.List,
    //   '',
    //   expand,
    //   '',
    //   patchList,
    // );
    // setUpdatedEntity(data);
  };

  useEffect(() => {
    setUpdatedEntity(entity);
  }, [entity]);

  const display = updatedEntity ? (
    <Box p={3}>
      <Grid container>
        <Grid item xs={6}>
          <Box p={3}>
            {fields.map((field) => {
              if (
                !field.name.includes('id') &&
                !ignoreFields.includes(field.name)
              ) {
                const value = `${updatedEntity[field.name]}`;
                // TODO: Add Object Type
                if (value) {
                  switch (field.type) {
                    case FieldType.Number:
                      return (
                        <TogglingNumberField
                          key={field.name}
                          label={_.startCase(field.name)}
                          field={field.name}
                          value={Number(value)}
                          onSaveField={saveField}
                        />
                      );
                    case FieldType.String:
                      return (
                        <TogglingTextField
                          key={field.name}
                          label={_.startCase(field.name)}
                          field={field.name}
                          value={value}
                          onSaveField={saveField}
                          column={multiline?.includes(field.name)}
                        />
                      );
                    case FieldType.Enum:
                      return (
                        <TogglingEnumField
                          key={field.name}
                          label={_.startCase(field.name)}
                          field={field.name}
                          value={value}
                          type={type}
                          onSaveField={saveField}
                        />
                      );
                    case FieldType.Array:
                      return (
                        <TogglingList
                          key={field.name}
                          label={_.startCase(field.name)}
                          field={field.name}
                          value={[value]}
                          onSaveField={saveList}
                        />
                      );
                  }
                }
              }
            })}
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box p={3}>
            <SubMenu tabs={tabs} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  ) : (
    <p>Something happened</p>
  );

  return display;
};
