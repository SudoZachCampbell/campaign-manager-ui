import _ from 'lodash';

export const generateOptionsFromEnum = (Enum: Record<string, string>) =>
  Object.values(Enum).map((value) => ({
    value: value.toString(),
    label: _.startCase(value.toString()),
  }));
