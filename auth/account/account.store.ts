import { accountIdToString, IAccount, IAccountWriteStore } from "./contracts";

export const AccountWriteStoreHashMap = (
  hashMap: Map<string, IAccount>
): IAccountWriteStore => {
  return {
    async add(account) {
      hashMap.set(accountIdToString(account.accountId), account);
    },
    async remove(accountId) {
      hashMap.delete(accountIdToString(accountId));
    },
  };
};
