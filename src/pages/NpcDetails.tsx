import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Field } from '../interfaces/Models';
import { Typography, Box, Button } from '@material-ui/core';
import { ApiType, useDnDApi } from '../api/dndDb';
import MonsterSummary from '../components/MonsterSummary';
import _ from 'lodash';
import { FieldType } from '../interfaces/Lookups';
import Details from '../layouts/Details';
import LocationMap from '../components/mapping/LocationMap';
import LocationAdder from '../components/mapping/LocationAdder';
import { Npc, NpcsClient } from '../api/Model';

const multiline: string[] = ['background'];

const ignoreFields: string[] = ['picture', 'monster', 'locale', 'building'];

const expand = ['Monster', 'Building.Maps.Map', 'Locale'];

const fields: Field[] = [
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

export default function NpcDetails(props: {
  setPageName: Function;
  setPageBanner: Function;
}) {
  const [editLocation, setEditLocation] = useState<boolean>(false);

  const { id } = useParams<{ id: string }>();

  const {
    loading,
    invoke,
    response: npc,
  } = useDnDApi(npcClient.get(id, expand.join(',')));

  useEffect(() => {
    invoke();
  }, []);

  useEffect(() => {
    npc?.name && props.setPageName(npc.name);
    npc?.picture && props.setPageBanner(`npc/${npc.picture}`);
  }, [npc]);

  const setLocation = (id: string) => {
    // setNpc(() => {
    //   setEditLocation(false);
    //   return npc;
    // });
  };

  const tabs = {
    headers: ['Monster', 'Pictures', 'Location'],
    data: npc && [
      npc.monster && <MonsterSummary id={npc.monster.id} />,
      <Pictures />,
      npc.building?.maps && !editLocation ? (
        <Box p={1}>
          <Button onClick={() => setEditLocation(true)}>Edit Location</Button>
          <LocationMap
            map={npc.building.maps[0].map}
            iconName='arrow'
            data={[npc]}
          />
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
        id={id}
        entity={npc}
        type={ApiType.NPC}
        ignoreFields={ignoreFields}
        multiline={multiline}
        expand={expand}
        tabs={tabs}
        fields={fields}
        onSave={}
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
