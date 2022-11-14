import * as React from 'react';
import { Box, Button, Grid, Typography } from '@material-ui/core';
import { IMonster, Field } from '../interfaces/Models';
import _ from 'lodash';
import { FieldType, ToggleType } from '../interfaces/Lookups';
import TogglingTextField from '../components/toggling/TogglingTextField';
import TogglingNumberField from '../components/toggling/TogglingNumberField';
import TogglingList from '../components/toggling/TogglingList';
import TogglingEnumField from '../components/toggling/TogglingEnumField';
import TogglingObjectsField from '../components/toggling/TogglingObjectsField';
import { Type } from '../api/dndDb';

interface MonsterSummaryProps {
  instance?: IMonster;
}

export default function MonsterSummary({ instance }: MonsterSummaryProps) {
  const fields: Field[] = [
    {
      name: 'name',
      type: FieldType.String,
    },
    {
      name: 'monster_type',
      type: FieldType.Enum,
    },
    {
      name: 'strength',
      type: FieldType.Number,
    },
    {
      name: 'dexterity',
      type: FieldType.Number,
    },
    {
      name: 'constitution',
      type: FieldType.Number,
    },
    {
      name: 'intelligence',
      type: FieldType.Number,
    },
    {
      name: 'wisdom',
      type: FieldType.Number,
    },
    {
      name: 'charisma',
      type: FieldType.Number,
    },
    {
      name: 'size',
      type: FieldType.String,
    },
    {
      name: 'hit_dice',
      type: FieldType.String,
    },
    {
      name: 'languages',
      type: FieldType.String,
    },
    {
      name: 'challenge_rating',
      addInfo: instance && ` (${instance['xp']}xp)`,
      type: FieldType.Number,
    },
    {
      name: 'passive_perception',
      type: FieldType.Number,
    },
    {
      name: 'armor_class',
      type: FieldType.String,
    },
    {
      name: 'hit_points',
      addField: 'hit_dice',
      type: FieldType.String,
    },
    {
      name: 'alignment',
      type: FieldType.Enum,
    },
    {
      name: 'special_abilities',
      type: FieldType.ArrayOfObjects,
      toggleType: ToggleType.Text,
    },
  ];

  const renderMonsterArea = () => {
    console.log(`${instance?.name}: `, instance);
    return (
      <Box>
        <Grid container xs={12}>
          <Grid item xs={12}>
            <Box mb={3} display='flex' justifyContent='center'>
              <Typography variant={'h4'}>{instance?.name}</Typography>
            </Box>
          </Grid>
          <Grid container style={{ marginBottom: '2em' }} xs={12}>
            {fields.map((field) => {
              let value = instance && instance[field.name];
              if (field.addField) {
                value += ` (${instance && instance[field.addField]})`;
              } else if (field.addInfo) {
                value += field.addInfo;
              }
              const propsObj = {
                key: field.name,
                label: _.startCase(field.name),
                field: field.name,
                value,
              };

              // TODO: Add Object Type

              switch (field.type) {
                case FieldType.Number:
                  return (
                    <Grid item xs={6}>
                      <TogglingNumberField {...propsObj} noEdit />
                    </Grid>
                  );
                case FieldType.String:
                  return (
                    <Grid item xs={6}>
                      <TogglingTextField {...propsObj} noEdit />
                    </Grid>
                  );
                case FieldType.Enum:
                  return (
                    <Grid item xs={6}>
                      <TogglingEnumField
                        {...propsObj}
                        type={Type.MONSTER}
                        noEdit
                      />
                    </Grid>
                  );
                case FieldType.Array:
                  return (
                    <Grid item xs={6}>
                      <TogglingList {...propsObj} noEdit />
                    </Grid>
                  );
                case FieldType.ArrayOfObjects:
                  return (
                    <Grid item xs={12}>
                      <TogglingObjectsField
                        {...propsObj}
                        noEdit
                        toggleType={field.toggleType}
                      />
                    </Grid>
                  );
              }
            })}
          </Grid>
          <Grid item xs={10}>
            <Button
              variant='contained'
              color='secondary'
              href={`/monsters/${instance?.id}`}
            >
              Details
            </Button>
          </Grid>
          {instance?.picture && (
            <Grid item xs={2}>
              <Box width={1}>
                <img
                  width='100%'
                  alt=''
                  src={`https://ddimagecollection.s3-eu-west-1.amazonaws.com/monster/${instance.picture}`}
                />
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
    );
  };

  const renderAddMonster = () => {
    return <Button>Add Monster</Button>;
  };

  const renderDisplay = instance ? renderMonsterArea() : renderAddMonster();

  return renderDisplay;
}
