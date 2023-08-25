import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { Field } from '../interfaces/Models';
import _ from 'lodash';
import { FieldType, ToggleType } from '../interfaces/Lookups';
import TogglingTextField from '../components/toggling/TogglingTextField';
import TogglingNumberField from '../components/toggling/TogglingNumberField';
import TogglingList from '../components/toggling/TogglingList';
import TogglingEnumField from '../components/toggling/TogglingSelect';
import { ClipLoader } from 'react-spinners';
import { ApiType, useDnDApi } from '../api/dndDb';
import { MonstersClient } from '../api/client/monstersClient';
import { Monster } from '../api/model/monster';

interface MonsterSummaryProps {
  monsterId: string;
}

const client = new MonstersClient();

export default function MonsterSummary({ monsterId }: MonsterSummaryProps) {
  const {
    loading,
    invoke,
    response: monster,
  } = useDnDApi((id: string) => client.getMonsterById(id));

  useEffect(() => {
    invoke(monsterId);
  }, [monsterId]);

  const fields: Field<Monster>[] = [
    {
      name: 'name',
      type: FieldType.String,
    },
    {
      name: 'monsterType',
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
      name: 'hitDice',
      type: FieldType.String,
    },
    {
      name: 'languages',
      type: FieldType.String,
    },
    {
      name: 'challengeRating',
      addInfo: monster && ` (${monster['xp']}xp)`,
      type: FieldType.Number,
    },
    {
      name: 'passivePerception',
      type: FieldType.Number,
    },
    {
      name: 'armorClass',
      type: FieldType.String,
    },
    {
      name: 'hitPoints',
      addField: 'hitDice',
      type: FieldType.String,
    },
    {
      name: 'alignment',
      type: FieldType.Enum,
    },
    {
      name: 'specialAbilities',
      type: FieldType.ArrayOfObjects,
      toggleType: ToggleType.Text,
    },
  ];

  const renderMonsterArea = () => {
    return (
      <Box>
        <Grid container>
          <Grid item xs={12}>
            <Box marginBottom="3" display="flex" justifyContent="center">
              <Typography variant={'h4'}>{monster?.name}</Typography>
            </Box>
          </Grid>
          <Grid container style={{ marginBottom: '2em' }}>
            {fields.map((field) => {
              let value: string = `${monster?.[field.name]}`;
              if (field.addField) {
                value += ` (${monster && monster[field.addField]})`;
              } else if (field.addInfo) {
                value += field.addInfo;
              }

              // TODO: Add Object Type

              switch (field.type) {
                case FieldType.Number:
                  return (
                    <Grid key={field.name} item xs={6}>
                      <TogglingNumberField
                        label={_.startCase(field.name)}
                        field={field.name}
                        value={Number(value)}
                        noEdit
                      />
                    </Grid>
                  );
                case FieldType.String:
                  return (
                    <Grid key={field.name} item xs={6}>
                      <TogglingTextField
                        label={_.startCase(field.name)}
                        field={field.name}
                        value={value}
                        noEdit
                      />
                    </Grid>
                  );
                case FieldType.Enum:
                  return (
                    <Grid key={field.name} item xs={6}>
                      <TogglingEnumField
                        label={_.startCase(field.name)}
                        field={field.name}
                        value={value}
                        type={ApiType.MONSTER}
                        noEdit
                      />
                    </Grid>
                  );
                case FieldType.Array:
                  return (
                    <Grid key={field.name} item xs={6}>
                      <TogglingList
                        label={_.startCase(field.name)}
                        field={field.name}
                        value={[value]}
                        noEdit
                      />
                    </Grid>
                  );
                // case FieldType.ArrayOfObjects:
                //   return (
                //     <Grid key={field.name} item xs={12}>
                //       <TogglingObjectsField
                //         label={_.startCase(field.name)}
                //         field={field.name}
                //         value={value}
                //         noEdit
                //         toggleType={field.toggleType}
                //       />
                //     </Grid>
                //   );
              }
            })}
          </Grid>
          <Grid item xs={10}>
            <Button
              variant="contained"
              color="secondary"
              href={`/monsters/${monster?.id}`}
            >
              Details
            </Button>
          </Grid>
          {monster?.picture && (
            <Grid item xs={2}>
              <Box width={1}>
                <img
                  width="100%"
                  alt=""
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

  return loading ? <ClipLoader /> : renderDisplay;
}
