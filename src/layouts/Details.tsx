import { Box, Grid } from '@mui/material';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { ApiType } from '../api/dndDb';
import SubMenu from '../components/SubMenu';
import TogglingList from '../components/toggling/TogglingList';
import TogglingNumberField from '../components/toggling/TogglingNumberField';
import TogglingEnumField from '../components/toggling/TogglingSelect';
import TogglingTextField from '../components/toggling/TogglingTextField';
import { FieldType } from '../interfaces/Lookups';
import { Field } from '../interfaces/Models';
import { Patch } from '../interfaces/Requests';

import { BaseDto } from '../api/model';

interface Props<T extends BaseDto> {
  entity: T;
  type: ApiType;
  ignoreFields: string[];
  multiline?: string[];
  expand: string[];
  fields: Field<T>[];
  tabs: any;
  onSave: () => void;
}

export default <T extends BaseDto>({
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
