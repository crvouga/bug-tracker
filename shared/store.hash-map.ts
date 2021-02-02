import equal from "fast-deep-equal";

export const whereEquals = <V, T extends { [key: string]: V }>(
  predicate: Partial<T>,
  object: T
) => {
  for (const key of Object.keys(predicate)) {
    if (equal(predicate[key], object[key])) {
      return true;
    }
  }
  return false;
};

export const findMany = <T extends {}>(
  { where }: { where?: Partial<T> },
  hashMap: { [key: string]: T }
) => {
  if (!where) {
    return [];
  }

  return Object.values(hashMap).filter((value) => whereEquals(where, value));
};

export const findOne = <T extends {}>(
  { where }: { where?: Partial<T> },
  hashMap: { [key: string]: T }
): T | null => {
  const found = findMany({ where }, hashMap);
  return found[0] ?? null;
};

export const removeMany = <T extends {}>(
  { where }: { where?: Partial<T> },
  hashMap: { [key: string]: T }
) => {
  if (!where) {
    return hashMap;
  }
  return Object.fromEntries(
    Object.entries(hashMap).filter(
      ([_key, value]) => !whereEquals(where, value)
    )
  );
};

export const addOne = <T>(
  key: string,
  value: T,
  hashMap: { [key: string]: T }
) => {
  return {
    ...hashMap,
    [key]: value,
  };
};
