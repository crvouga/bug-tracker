import { read, write } from "../shared/store.file-system";
import { addOne, findOne, removeMany } from "../shared/store.hash-map";
import { IUser, IUserReadStore, IUserWriteStore } from "./contracts";

export const UserReadStoreHashMap = (
  hashMap: {
    [id: string]: IUser;
  } = {}
): IUserReadStore => {
  return {
    async findOne({ where }) {
      return findOne({ where }, hashMap);
    },
  };
};

export const UserWriteStoreHashMap = (
  db: {
    [id: string]: IUser;
  } = {}
): IUserWriteStore => {
  return {
    async add(user) {
      db = addOne(user.userId, user, db);
    },
    async remove({ where }) {
      db = removeMany({ where }, db);
    },
  };
};

export const UserReadStoreFileSystem = (filePath: string): IUserReadStore => {
  return {
    async findOne({ where }) {
      const db = read<IUser>(filePath);
      return findOne({ where }, db);
    },
  };
};

export const UserWriteStoreFileSystem = (filePath: string): IUserWriteStore => {
  return {
    async add(user) {
      const db = read<IUser>(filePath);

      write(filePath, addOne(user.userId, user, db));
    },
    async remove({ where }) {
      const db = read<IUser>(filePath);
      write(filePath, removeMany({ where }, db));
    },
  };
};
