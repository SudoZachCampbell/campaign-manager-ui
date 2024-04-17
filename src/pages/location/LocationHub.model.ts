import {
  BaseDto,
  BuildingDto,
  CampaignWithLocationsDto,
  ContinentDto,
  DungeonDto,
  LocaleDto,
  RegionDto,
  WorldDto,
} from 'api/model';

export interface LocationInterface {
  worlds?: WorldDto[];
  continents?: ContinentDto[];
  regions?: RegionDto[];
  locales?: LocaleDto[];
  buildings?: BuildingDto[];
  dungeons?: DungeonDto[];
}

export type SelectedLocation = {
  type: keyof CampaignWithLocationsDto;
  instance: BaseDto;
};
