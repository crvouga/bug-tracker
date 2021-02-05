import { read, write } from "../../../shared/store.file-system";
import { findOne, removeMany } from "../../../shared/store.hash-map";
import { IUser, IUserStore } from "./contracts";

export const UserStoreHashMap = (): IUserStore => {
  let db: {
    [id: string]: IUser;
  } = {};
  return {
    async findOne({ where }) {
      return findOne({ where }, db);
    },
    async add(user) {
      db = {
        ...db,
        [user.userId]: user,
      };
    },
    async remove({ where }) {
      db = removeMany({ where }, db);
    },
  };
};

export const UserStoreFileSystem = (filePath: string): IUserStore => {
  return {
    async findOne({ where }) {
      const db = read<IUser>(filePath);
      return findOne({ where }, db);
    },
    async add(user) {
      const db = read<IUser>(filePath);

      write(filePath, {
        ...db,
        [user.userId]: user,
      });
    },
    async remove({ where }) {
      const db = read<IUser>(filePath);
      write(filePath, removeMany({ where }, db));
    },
  };
};
