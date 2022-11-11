import * as React from 'react';
import { useState, useEffect } from 'react';
import { IModel, Field } from '../interfaces/Models';
import { FieldType } from '../interfaces/Lookups';
import { Box, Grid } from '@material-ui/core';
import BP from '../interfaces/Initialisations';
import { Type, updateEntity, PatchType } from '../api/dndDb';
import SubMenu from '../components/SubMenu';
import TogglingTextField from '../components/toggling/TogglingTextField';
import TogglingNumberField from '../components/toggling/TogglingNumberField';
import TogglingList from '../components/toggling/TogglingList';
import TogglingEnumField from '../components/toggling/TogglingEnumField';
import { Patch } from '../interfaces/Requests';
import _ from 'lodash';

interface Props {
  id: string;
  entity: any;
  type: Type;
  ignoreFields: string[];
  multiline?: string[];
  include: string[];
  fields: Field[];
  tabs: any;
}

export default function Details<T extends IModel>(props: Props) {
  const [entity, setEntity] = useState(BP[props.type]);

  const saveField = async (field: string, value: any) => {
    const data: T = await updateEntity<T>(
      props.type,
      props.id,
      PatchType.Add,
      `/${_.camelCase(field)}`,
      [''],
      value,
    );
    setEntity(data);
  };

  const saveList = async (field: string, patchList: Patch[]) => {
    const data: T = await updateEntity<T>(
      props.type,
      props.id,
      PatchType.List,
      '',
      props.include,
      '',
      patchList,
    );
    setEntity(data);
  };

  useEffect(() => {
    setEntity(props.entity);
  }, [props.entity]);

  const display = (
    <Box p={3}>
      <Grid container>
        <Grid item xs={6}>
          <Box p={3}>
            {props.fields.map((field) => {
              if (
                !field.name.includes('id') &&
                !props.ignoreFields.includes(field.name)
              ) {
                const propsObj = {
                  key: field.name,
                  label: _.startCase(field.name),
                  field: field.name,
                  value: entity[field.name],
                };

                // TODO: Add Object Type

                switch (field.type) {
                  case FieldType.Number:
                    return (
                      <TogglingNumberField
                        {...propsObj}
                        saveField={saveField}
                      />
                    );
                  case FieldType.String:
                    return (
                      <TogglingTextField
                        {...propsObj}
                        column={props.multiline?.includes(field.name)}
                        saveField={saveField}
                      />
                    );
                  case FieldType.Enum:
                    return (
                      <TogglingEnumField
                        {...propsObj}
                        type={props.type}
                        saveField={saveField}
                      />
                    );
                  case FieldType.Array:
                    return <TogglingList {...propsObj} saveField={saveList} />;
                }
              }
            })}
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box p={3}>
            <SubMenu tabs={props.tabs} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );

  return display;
}
