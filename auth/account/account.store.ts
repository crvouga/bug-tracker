import { read, write } from "../../shared/store.file-system";
import { removeMany, findOne } from "../../shared/store.hash-map";
import {
  accountIdToString,
  IAccount,
  IAccountWriteStore,
  IAccountReadStore,
} from "./contracts";

export const AccountReadStoreHashMap = (
  db: {
    [id: string]: IAccount;
  } = {}
): IAccountReadStore => {
  return {
    async findOne({ where }) {
      return findOne({ where }, db);
    },
  };
};

export const AccountReadStoreFileSystem = (
  filePath: string
): IAccountReadStore => {
  return {
    async findOne({ where }) {
      const db = read<IAccount>(filePath);
      return findOne({ where }, db);
    },
  };
};

export const AccountWriteStoreHashMap = (
  db: {
    [id: string]: IAccount;
  } = {}
): IAccountWriteStore => {
  return {
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

export const AccountWriteStoreFileSystem = (
  filePath: string
): IAccountWriteStore => {
  return {
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
