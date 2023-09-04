import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Field } from '../interfaces/Models';
import { Typography, Box, Button } from '@mui/material';
import { ApiType, useDnDApi } from '../api/dndDb';
import MonsterSummary from '../components/MonsterSummary';
import _ from 'lodash';
import { FieldType } from '../interfaces/Lookups';
import Details from '../layouts/Details';
import LocationMap from '../components/mapping/LocationMap';
import LocationAdder from '../components/mapping/LocationAdder';
import { NpcsClient, Npc } from '../api/model';

const multiline: string[] = ['background'];

const ignoreFields: string[] = ['picture', 'monster', 'locale', 'building'];

const expand = ['Monster', 'Building.Maps.Map', 'Locale'];

const fields: Field<Npc>[] = [
  {
    name: 'name',
    type: FieldType.String,
  },
  {
    name: 'background',
    type: FieldType.String,
  },
  {
    name: 'noteable_events',
    type: FieldType.Array,
  },
  {
    name: 'beliefs',
    type: FieldType.Array,
  },
  {
    name: 'passions',
    type: FieldType.Array,
  },
  {
    name: 'flaws',
    type: FieldType.Array,
  },
];

const npcClient = new NpcsClient();

export default function NpcDetails() {
  const [editLocation, setEditLocation] = useState<boolean>(false);

  const { id: npcId } = useParams<{ id: string }>();

  const saveNpc = async () => {
    // if (npcId)
    //   npcClient.patch(npcId, {
    //     operations: [{ operationType: OperationType.Add, path }],
    //   });
  };

  const {
    loading,
    invoke,
    response: npc,
  } = useDnDApi((id: string) => npcClient.get(id, expand.join(',')));

  useEffect(() => {
    invoke(npcId);
  }, [npcId]);

  const setLocation = (id: string) => {
    // setNpc(() => {
    //   setEditLocation(false);
    //   return npc;
    // });
  };

  const tabs = {
    headers: ['Monster', 'Pictures', 'Location'],
    data: npc && [
      npc.monster && <MonsterSummary monsterId={npc.monster.id} />,
      <Pictures />,
      npc.building?.maps && !editLocation ? (
        <Box p={1}>
          <Button onClick={() => setEditLocation(true)}>Edit Location</Button>
          {npc.building.maps[0].map && (
            <LocationMap
              map={npc.building.maps[0].map}
              iconName="arrow"
              npcs={[npc]}
            />
          )}
        </Box>
      ) : (
        <LocationAdder
          onSave={setLocation}
          expand={expand}
          building={npc.building}
        />
      ),
    ],
  };

  const loadingCheck =
    loading || !npc ? (
      <Typography>Loading</Typography>
    ) : (
      <Details
        entity={npc}
        type={ApiType.NPC}
        ignoreFields={ignoreFields}
        multiline={multiline}
        expand={expand}
        tabs={tabs}
        fields={fields}
        onSave={saveNpc}
      />
    );

  return loadingCheck;
}

function Pictures() {
  return <Typography>Test Pictures</Typography>;
}

function Location() {
  return <Typography>Test Location</Typography>;
}
