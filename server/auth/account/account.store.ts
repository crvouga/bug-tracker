import { read, write } from "../../../shared/store.file-system";
import { findOne, removeMany } from "../../../shared/store.hash-map";
import { accountIdToString, IAccount, IAccountStore } from "./contracts";

export const AccountStoreHashMap = (
  db: {
    [id: string]: IAccount;
  } = {}
): IAccountStore => {
  return {
    async findOne({ where }) {
      return findOne({ where }, db);
    },
    async add(account) {
      db = {
        ...db,
        [accountIdToString(account.accountId)]: account,
      };
    },
    async remove(accountId) {
      db = removeMany({ where: { accountId } }, db);
    },
  };
};

export const AccountStoreFileSystem = (filePath: string): IAccountStore => {
  return {
    async findOne({ where }) {
      const db = read<IAccount>(filePath);
      return findOne({ where }, db);
    },
    async add(account) {
      const db = read<IAccount>(filePath);
      write(filePath, {
        ...db,
        [accountIdToString(account.accountId)]: account,
      });
    },
    async remove(accountId) {
      const db = read<IAccount>(filePath);
      write(filePath, removeMany({ where: { accountId } }, db));
    },
  };
};
