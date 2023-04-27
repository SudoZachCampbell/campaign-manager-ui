import * as React from 'react';
import { useState, useEffect } from 'react';
import { Field } from '../interfaces/Models';
import { FieldType } from '../interfaces/Lookups';
import { Box, Grid } from '@material-ui/core';
import { ApiType, PatchType } from '../api/dndDb';
import SubMenu from '../components/SubMenu';
import TogglingTextField from '../components/toggling/TogglingTextField';
import TogglingNumberField from '../components/toggling/TogglingNumberField';
import TogglingList from '../components/toggling/TogglingList';
import TogglingEnumField from '../components/toggling/TogglingEnumField';
import { Patch } from '../interfaces/Requests';
import _ from 'lodash';
import { Base } from '../api/Model';

interface Props<T extends Base> {
  id: string;
  entity: T;
  type: ApiType;
  ignoreFields: string[];
  multiline?: string[];
  expand: string[];
  fields: Field[];
  tabs: any;
  onSave: () => void;
}

export default <T extends Base>({
  id,
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
    const data: T = await updateEntity<T>(
      type,
      id,
      PatchType.Add,
      `/${_.camelCase(field)}`,
      [''],
      value,
    );
    setUpdatedEntity(data);
  };

  const saveList = async (field: string, patchList: Patch[]) => {
    const data: T = await updateEntity<T>(
      type,
      id,
      PatchType.List,
      '',
      expand,
      '',
      patchList,
    );
    setUpdatedEntity(data);
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
                const propsObj = {
                  key: field.name,
                  label: _.startCase(field.name),
                  field: field.name,
                  value: updatedEntity[field.name],
                };

                // TODO: Add Object Type
                if (propsObj.value) {
                  switch (field.type) {
                    case FieldType.Number:
                      return (
                        <TogglingNumberField
                          {...propsObj}
                          value={Number(propsObj.value)}
                          onSaveField={saveField}
                        />
                      );
                    case FieldType.String:
                      return (
                        <TogglingTextField
                          {...propsObj}
                          value={propsObj.value.toString()}
                          column={multiline?.includes(field.name)}
                          onSaveField={saveField}
                        />
                      );
                    case FieldType.Enum:
                      return (
                        <TogglingEnumField
                          {...propsObj}
                          type={type}
                          onSaveField={saveField}
                        />
                      );
                    case FieldType.Array:
                      return (
                        <TogglingList {...propsObj} onSaveField={saveList} />
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
