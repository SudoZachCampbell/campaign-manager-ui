import { Damage, Monster, MonsterAction } from '../api/FE/fe.model';
import {
  AlignmentDto,
  MonsterDto,
  MonsterTypeDto,
  SizeDto,
} from '../api/model';
import { toTitleCase } from './string';

export const feToCampaignManagerMonsterMutator = (
  monster: Required<Monster>,
): MonsterDto => ({
  ...monster,
  type: toTitleCase(monster.type) as MonsterTypeDto,
  alignment: toTitleCase(monster.alignment) as AlignmentDto,
  size: toTitleCase(monster.size) as SizeDto,
  armor_class: monster.armor_class?.[0]?.value,
  actions: actionMutator(monster.actions),
  legendary_actions: actionMutator(monster.legendary_actions),
  reactions: actionMutator(monster.reactions),
  special_abilities: actionMutator(
    monster.special_abilities as MonsterAction[],
  ),
  senses: Object.entries(monster.senses)?.map(([key, value]) => ({
    name: key,
    value: value.toString(),
  })),
  proficiencies: monster.proficiencies?.map(({ value, proficiency }) => ({
    value: value ?? 0,
    name: proficiency?.name,
  })),
  speed: Object.entries(monster.speed)?.map(([key, value]) => {
    const split_measurement = value.split(' ');
    return {
      name: key,
      value: split_measurement[0],
      measurement: split_measurement.length > 1 ? split_measurement[1] : '',
    };
  }),
});

const actionMutator = (actions: MonsterAction[]) =>
  actions?.map((action) => ({
    ...action,
    damage: damageConvertor(action.damage) ?? [],
    dc: {
      ...action.dc,
      dc_type: action.dc?.dc_type?.name,
      dc_value: action.dc?.dc_value ?? 0,
    },
  }));

const damageConvertor = (damage?: Damage[]) =>
  damage?.map((currentDamage) => ({
    ...currentDamage,
    damage_type: currentDamage.damage_type?.name,
  }));
