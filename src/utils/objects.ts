import { Leaves } from '@/models/helpers.model';

export const deepFind = <T extends Record<string, any>>(
  obj: T,
  paths: Leaves<T>,
) => {
  let current = obj;

  for (let i = 0; i < paths.length; ++i) {
    if (current[paths[i]] == undefined) {
      return undefined;
    } else {
      current = current[paths[i]];
    }
  }
  return current;
};

export const removeNulls = <T>(array?: (T | null)[]) =>
  array?.flatMap((item) => (item ? [item] : [])) ?? [];
