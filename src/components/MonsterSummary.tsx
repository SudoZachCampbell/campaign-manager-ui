import React, { useMemo, useState } from 'react';
import { Box, Button, Grid, Typography } from '@material-ui/core';
import { IMonster, Field } from '../interfaces/Models';
import _ from 'lodash';
import { FieldType, ToggleType } from '../interfaces/Lookups';
import TogglingTextField from '../components/toggling/TogglingTextField';
import TogglingNumberField from '../components/toggling/TogglingNumberField';
import TogglingList from '../components/toggling/TogglingList';
import TogglingEnumField from '../components/toggling/TogglingEnumField';
import TogglingObjectsField from '../components/toggling/TogglingObjectsField';
import { getEntity, Type } from '../api/dndDb';
import { ClipLoader } from 'react-spinners';

interface MonsterSummaryProps {
  id?: string;
}

export default function MonsterSummary({ id }: MonsterSummaryProps) {
  const [monster, setMonster] = useState<IMonster | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  useMemo(async () => {
    if (id) {
      setLoading(true);
      const monster = await getEntity<IMonster>(Type.MONSTER, id);
      setMonster(monster);
      setLoading(false);
    }
  }, [id]);

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
      addInfo: monster && ` (${monster['xp']}xp)`,
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
    console.log(`${monster?.name}: `, monster);
    return (
      <Box>
        <Grid container>
          <Grid item xs={12}>
            <Box marginBottom='3' display='flex' justifyContent='center'>
              <Typography variant={'h4'}>{monster?.name}</Typography>
            </Box>
          </Grid>
          <Grid container style={{ marginBottom: '2em' }}>
            {fields.map((field) => {
              let value = monster && monster[field.name];
              if (field.addField) {
                value += ` (${monster && monster[field.addField]})`;
              } else if (field.addInfo) {
                value += field.addInfo;
              }
              const propsObj = {
                label: _.startCase(field.name),
                field: field.name,
                value,
              };

              // TODO: Add Object Type

              switch (field.type) {
                case FieldType.Number:
                  return (
                    <Grid key={field.name} item xs={6}>
                      <TogglingNumberField {...propsObj} noEdit />
                    </Grid>
                  );
                case FieldType.String:
                  return (
                    <Grid key={field.name} item xs={6}>
                      <TogglingTextField {...propsObj} noEdit />
                    </Grid>
                  );
                case FieldType.Enum:
                  return (
                    <Grid key={field.name} item xs={6}>
                      <TogglingEnumField
                        {...propsObj}
                        type={Type.MONSTER}
                        noEdit
                      />
                    </Grid>
                  );
                case FieldType.Array:
                  return (
                    <Grid key={field.name} item xs={6}>
                      <TogglingList {...propsObj} noEdit />
                    </Grid>
                  );
                case FieldType.ArrayOfObjects:
                  return (
                    <Grid key={field.name} item xs={12}>
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
              href={`/monsters/${monster?.id}`}
            >
              Details
            </Button>
          </Grid>
          {monster?.picture && (
            <Grid item xs={2}>
              <Box width={1}>
                <img
                  width='100%'
                  alt=''
                  src={`https://ddimagecollection.s3-eu-west-1.amazonaws.com/monster/${monster.picture}`}
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

  const renderDisplay = monster ? renderMonsterArea() : renderAddMonster();

  console.log(`MonsterSummary.tsx:204 monster`, monster);

  return loading ? <ClipLoader /> : renderDisplay;
}
