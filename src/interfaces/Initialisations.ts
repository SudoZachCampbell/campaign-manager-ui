import {
  INpc,
  IMonster,
  IModel,
  IMap,
  IBuilding,
  ILocale,
  IContinent,
  IRegion,
} from './Models';

const Monster: IMonster = {
  id: '0',
  name: '',
  alignment: 0,
  passive_perception: 0,
  hit_points: 0,
};

const Npc: INpc = {
  id: '0',
  name: '',
  monster: Monster,
};

const Model: IModel = {
  id: '0',
  name: '',
};

const Continent: IContinent = {
  id: '0',
  name: '',
};

const Region: IRegion = {
  id: '0',
  name: '',
  continent: Continent,
};

const Locale: ILocale = {
  id: '0',
  name: '',
  region: Region,
};

const Building: IBuilding = {
  id: '0',
  name: '',
  locale: Locale,
  npcs: [],
  monsters: [],
};

const Map: IMap = {
  id: '0',
  name: '',
  image_url: '',
  buildings: [
    {
      building: Building,
      coords: [0, 0],
    },
  ],
};

export default {
  Building,
  Model,
  Monster,
  Npc,
  Map,
};
