import _ from 'lodash';

export const toTitleCase = (value: string | undefined): string =>
  _.startCase(value).replaceAll(' ', '');
