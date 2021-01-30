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

export const findMany = async <
  K extends string | number,
  V,
  T extends { [key in K]: V }
>(
  { where }: { where?: Partial<T> },
  hashMap: Map<K, T>
): Promise<T[]> => {
  if (!where) {
    return [];
  }

  const found = Array.from(hashMap.values()).filter((value) =>
    whereEquals(where, value)
  );

  return found;
};

export const findOne = async <
  K extends string | number,
  V,
  T extends { [key in K]: V }
>(
  { where }: { where?: Partial<T> },
  hashMap: Map<K, T>
): Promise<T | null> => {
  const found = await findMany({ where }, hashMap);

  return found[0] ?? null;
};

export const remove = async <
  K extends string | number,
  V,
  T extends { [key in K]: V }
>(
  { where }: { where?: Partial<T> },
  hashMap: Map<K, T>
): Promise<void> => {
  if (!where) {
    return;
  }

  for (const [key, value] of Array.from(hashMap.entries())) {
    if (whereEquals(where, value)) {
      hashMap.delete(key);
    }
  }
};
