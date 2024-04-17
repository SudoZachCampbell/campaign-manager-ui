import { Client } from 'api/model';
import { LocationInterface, SelectedLocation } from './LocationHub.model';

export const locationColumns: (keyof LocationInterface)[] = [
  'worlds',
  'continents',
  'regions',
  'locales',
  'buildings',
  'dungeons',
];

export const generateLocation = async (
  client: Client,
  selected?: SelectedLocation,
  campaignId?: string,
): Promise<LocationInterface | undefined> => {
  if (campaignId && selected?.instance.id) {
    const referenceBuilder: LocationInterface = {};
    switch (selected.type) {
      case 'worlds': {
        const result = await client.worlds_GetWorldById(
          campaignId,
          selected.instance.id,
          null,
          'Continents.Regions.Locales.Buildings',
        );
        referenceBuilder.worlds = [result];
        if (result.continents) {
          referenceBuilder.continents = result.continents;
          referenceBuilder.regions = referenceBuilder.continents.flatMap(
            (continent) => continent.regions ?? [],
          );
          referenceBuilder.locales = referenceBuilder.regions.flatMap(
            (regionInner) => regionInner.locales ?? [],
          );
          referenceBuilder.buildings = referenceBuilder.locales.flatMap(
            (localeInner) => localeInner.buildings ?? [],
          );
        }
        break;
      }
      case 'continents': {
        const result = await client.continents_GetContinentById(
          campaignId,
          selected.instance.id,
          null,
          'World,Regions.Locales.Buildings',
        );
        referenceBuilder.worlds = result.world ? [result.world] : [];
        referenceBuilder.continents = [result];
        if (result.regions) {
          referenceBuilder.regions = result.regions;
          referenceBuilder.locales = referenceBuilder.regions.flatMap(
            (regionInner) => regionInner.locales ?? [],
          );
          referenceBuilder.buildings = referenceBuilder.locales.flatMap(
            (localeInner) => localeInner.buildings ?? [],
          );
        }
        break;
      }
      case 'regions': {
        const result = await client.regions_GetRegionById(
          campaignId,
          selected.instance.id,
          null,
          'Continent.World,Locales.Buildings',
        );
        referenceBuilder.worlds = result?.continent?.world
          ? [result.continent.world]
          : [];
        referenceBuilder.continents = result?.continent
          ? [result.continent]
          : [];
        referenceBuilder.regions = [result];
        if (result.locales) {
          referenceBuilder.locales = result.locales;
          referenceBuilder.buildings = referenceBuilder.locales.flatMap(
            (localeInner) => localeInner.buildings ?? [],
          );
        }
        break;
      }
      case 'locales': {
        const result = await client.locales_GetLocaleById(
          campaignId,
          selected.instance.id,
          null,
          'Region.Continent.World,Buildings',
        );
        referenceBuilder.worlds = result?.region?.continent?.world
          ? [result.region?.continent.world]
          : [];
        referenceBuilder.continents = result?.region?.continent
          ? [result.region?.continent]
          : [];
        referenceBuilder.regions = result?.region ? [result.region] : [];
        referenceBuilder.locales = [result];
        if (result.buildings) {
          referenceBuilder.buildings = result.buildings;
        }
        break;
      }
      case 'buildings': {
        const result = await client.buildings_GetBuildingById(
          campaignId,
          selected.instance.id,
          null,
          'Locale.Region.Continent.World',
        );
        referenceBuilder.worlds = result?.locale?.region?.continent?.world
          ? [result?.locale.region?.continent.world]
          : [];
        referenceBuilder.continents = result?.locale?.region?.continent
          ? [result?.locale.region?.continent]
          : [];
        referenceBuilder.regions = result?.locale?.region
          ? [result?.locale.region]
          : [];
        referenceBuilder.locales = result?.locale ? [result?.locale] : [];
        referenceBuilder.buildings = [result];
        break;
      }
    }
    return referenceBuilder;
  } else {
    return undefined;
  }
};
