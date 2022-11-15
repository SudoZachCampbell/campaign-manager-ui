import React, { useState, useEffect } from 'react';
import {
  Breadcrumbs,
  Link,
  Box,
  Select,
  MenuItem,
  Grid,
  Typography,
  InputLabel,
  FormControl,
  makeStyles,
  createStyles,
  Theme,
  Button,
} from '@material-ui/core';
import {
  IContinent,
  IRegion,
  ILocale,
  IBuilding,
  IModel,
  ILocation,
  INpc,
} from '../../interfaces/Models';
import {
  Type,
  getEntity,
  getEntities,
  getEntitiesByFilter,
  PatchType,
  updateEntity,
} from '../../api/dndDb';
import _ from 'lodash';

interface Location {
  continents: ILocation[];
  regions?: ILocation[];
  locales?: ILocation[];
  buildings?: ILocation[];
  continent?: ILocation;
  region?: ILocation;
  locale?: ILocation;
  building?: ILocation;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

export default function LocationAdder<T extends IModel>({
  id,
  type,
  expand,
  set,
  building,
}: {
  id: string;
  type: Type;
  expand: string[];
  set: Function;
  building?: IBuilding;
}) {
  const [location, setLocation] = useState<Location>({ continents: [] });

  const classes = useStyles();

  useEffect(() => {
    building
      ? prepopulateData()
      : populateData<IContinent>(Type.CONTINENT, 'continents');
  }, []);

  const populateData = async function <T extends ILocation>(
    type: Type,
    section: string,
  ) {
    const data = await getEntities<T>(type, []);
    setLocation({ ...location, [section]: data });
  };

  const prepopulateData = async () => {
    if (building) {
      const selectedBuilding = await getEntity<IBuilding>(
        Type.BUILDING,
        building.id,
        ['Locale.Region.Continent'],
      );
      const buildings = await getEntity<ILocale>(
        Type.LOCALE,
        selectedBuilding.locale.id,
        ['Buildings'],
      );
      const locales = await getEntity<IRegion>(
        Type.REGION,
        selectedBuilding.locale.region.id,
        ['Locales'],
      );
      const regions = await getEntity<IContinent>(
        Type.CONTINENT,
        selectedBuilding.locale.region.continent.id,
        ['Regions'],
      );
      const continents = await getEntities<IContinent>(Type.CONTINENT, []);

      let newLocation = {
        building: selectedBuilding,
        locale: selectedBuilding.locale,
        region: selectedBuilding.locale.region,
        continent: selectedBuilding.locale.region.continent,
        buildings: buildings.buildings,
        locales: locales.locales,
        regions: regions.regions,
        continents,
      };

      console.log('New Location: ', newLocation);
      setLocation({ ...newLocation });
    }
  };

  const setContinent = async (id: string) => {
    const selectedContinent = await getEntity<IContinent>(Type.CONTINENT, id, [
      'Regions',
    ]);
    if (selectedContinent != null) {
      const newLocation: Location = {
        continents: location.continents,
        continent: selectedContinent,
        regions: selectedContinent.regions,
      };
      console.log('New Location: ', newLocation);
      setLocation(newLocation);
    }
  };

  const setRegion = async (id: string) => {
    const selectedRegion = await getEntity<IRegion>(Type.REGION, id, [
      'Locales',
    ]);
    if (selectedRegion != null) {
      const newLocation: Location = {
        continents: location.continents,
        continent: location.continent,
        regions: location.regions,
        region: selectedRegion,
        locales: selectedRegion.locales,
      };
      console.log('New Location: ', newLocation);
      setLocation(newLocation);
    }
  };

  const setLocale = async (id: string) => {
    const selectedLocale = await getEntity<ILocale>(Type.LOCALE, id, [
      'Buildings',
    ]);
    if (selectedLocale != null) {
      const newLocation: Location = {
        continents: location.continents,
        continent: location.continent,
        regions: location.regions,
        region: location.region,
        locales: location.locales,
        locale: selectedLocale,
        buildings: selectedLocale.buildings,
      };
      console.log('New Location: ', newLocation);
      setLocation(newLocation);
    }
  };

  const setBuilding = async (id: string) => {
    const selectedBuilding = location.buildings?.find((x) => x.id === id);
    if (selectedBuilding != null) {
      const newLocation: Location = {
        ...location,
        building: selectedBuilding,
      };
      console.log('New Location: ', newLocation);
      setLocation(newLocation);
    }
  };

  const saveLocation = async () => {
    const npc =
      location.building &&
      (await updateEntity<T>(
        type,
        id,
        PatchType.Add,
        '/buildingId',
        expand,
        location.building?.id,
      ));
    console.log('New Npc: ', npc);
    set(npc);
  };

  return (
    <Box p={3}>
      <Grid container spacing={1}>
        <Grid container>
          <Grid item xs={8}>
            <Typography variant='h4'>Choose a Location: </Typography>
          </Grid>
          <Grid item xs={4}>
            {location.building && <Button onClick={saveLocation}>Save</Button>}
          </Grid>
        </Grid>
        {location.continents && location.continents.length !== 0 && (
          <Grid item xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel id='continent-select'>Continent</InputLabel>
              <Select
                value={location.continent?.id}
                onChange={(
                  event: React.ChangeEvent<{
                    value: unknown;
                  }>,
                ) => setContinent(event.target.value as string)}
              >
                {location.continents.map((continentItem) => (
                  <MenuItem value={continentItem.id}>
                    {continentItem.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        )}
        {location.regions && location.regions?.length !== 0 ? (
          <Grid item xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel id='region-select'>Region</InputLabel>
              <Select
                value={location.region?.id}
                onChange={(
                  event: React.ChangeEvent<{
                    value: unknown;
                  }>,
                ) => setRegion(event.target.value as string)}
              >
                {location.regions.map((regionItem) => (
                  <MenuItem value={regionItem.id}>{regionItem.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        ) : (
          location.regions?.length === 0 && (
            <Typography variant='subtitle2'>No Regions Found</Typography>
          )
        )}
        {location.locales && location.locales?.length !== 0 ? (
          <Grid item xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel id='locale-select'>Locale</InputLabel>
              <Select
                value={location.locale?.id}
                onChange={(
                  event: React.ChangeEvent<{
                    value: unknown;
                  }>,
                ) => setLocale(event.target.value as string)}
              >
                {location.locales.map((localeItem) => (
                  <MenuItem value={localeItem.id}>{localeItem.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        ) : (
          location.locales?.length === 0 && (
            <Typography variant='subtitle2'>No Locales Found</Typography>
          )
        )}
        {location.buildings && location.buildings?.length !== 0 ? (
          <Grid item xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel id='building-select'>Building</InputLabel>
              <Select
                value={location.building?.id}
                onChange={(
                  event: React.ChangeEvent<{
                    value: unknown;
                  }>,
                ) => setBuilding(event.target.value as string)}
              >
                {location.buildings.map((buildingItem) => (
                  <MenuItem value={buildingItem.id}>
                    {buildingItem.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        ) : (
          location.buildings?.length === 0 && (
            <Typography variant='h5'>No Buildings Found</Typography>
          )
        )}
      </Grid>
    </Box>
  );
}
