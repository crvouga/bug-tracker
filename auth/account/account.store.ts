import { read, write } from "../../shared/store.file-system";
import { addOne, removeMany } from "../../shared/store.hash-map";
import { accountIdToString, IAccount, IAccountWriteStore } from "./contracts";

export const AccountWriteStoreHashMap = (
  db: {
    [id: string]: IAccount;
  } = {}
): IAccountWriteStore => {
  return {
    async add(account) {
      db = addOne(accountIdToString(account.accountId), account, db);
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
      write(
        filePath,
        addOne(accountIdToString(account.accountId), account, db)
      );
    },
    async remove(accountId) {
      const db = read<IAccount>(filePath);
      write(filePath, removeMany({ where: { accountId } }, db));
    },
  };
};
