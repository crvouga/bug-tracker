import { findMany } from "../../shared/store.hash-map";

const StoreHashMapTest = () => {
  const hashMap: { [id: string]: { id: string; color: string } } = {};

  const a = {
    id: "1",
    color: "red",
  };

  const b = {
    id: "2",
    color: "blue",
  };

  const c = {
    id: "3",
    color: "red",
  };

  for (const record of [a, b, c]) {
    hashMap[record.id] = record;
  }

  return {
    a,
    b,
    c,
    hashMap,
  };
};

describe("hash map store functions", () => {
  it("finds many", async () => {
    const { a, b, c, hashMap } = StoreHashMapTest();

    const found = await findMany({ where: { color: "red" } }, hashMap);

    expect(found).toContainEqual(a);
    expect(found).toContainEqual(c);
    expect(found).not.toContainEqual(b);
  });
});
