import { findOne, remove } from "../shared/store.hash-map";
import { IUser, IUserReadStore, IUserWriteStore } from "./contracts";

export const UserReadStoreHashMap = (
  hashMap: Map<string, IUser>
): IUserReadStore => {
  return {
    async findOne({ where }) {
      return findOne({ where }, hashMap);
    },
  };
};

export const UserWriteStoreHashMap = (
  hashMap: Map<string, IUser>
): IUserWriteStore => {
  return {
    async add(user) {
      hashMap.set(user.userId, user);
    },
    async remove({ where }) {
      return remove({ where }, hashMap);
    },
  };
};
