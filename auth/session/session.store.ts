import { findOne, remove } from "../../shared/store.hash-map";
import { ISession, ISessionReadStore, ISessionWriteStore } from "./contracts";

export const SessionReadStoreHashMap = (
  hashMap: Map<string, ISession>
): ISessionReadStore => {
  return {
    async findOne({ where }) {
      return findOne({ where }, hashMap);
    },
  };
};

export const SessionWriteStoreHashMap = (
  hashMap: Map<string, ISession>
): ISessionWriteStore => {
  return {
    async add(session) {
      hashMap.set(session.sessionToken, session);
    },
    async remove({ where }) {
      return remove({ where }, hashMap);
    },
  };
};
