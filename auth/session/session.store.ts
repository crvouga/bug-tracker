import { read, write } from "../../shared/store.file-system";
import { addOne, findOne, removeMany } from "../../shared/store.hash-map";
import { ISession, ISessionReadStore, ISessionWriteStore } from "./contracts";

export const SessionReadStoreHashMap = (
  db: {
    [id: string]: ISession;
  } = {}
): ISessionReadStore => {
  return {
    async findOne({ where }) {
      return findOne({ where }, db);
    },
  };
};

export const SessionWriteStoreHashMap = (
  db: {
    [id: string]: ISession;
  } = {}
): ISessionWriteStore => {
  return {
    async add(session) {
      db = addOne(session.sessionToken, session, db);
    },
    async remove({ where }) {
      db = removeMany({ where }, db);
    },
  };
};

export const SessionReadStoreFileSystem = (
  filePath: string
): ISessionReadStore => {
  return {
    async findOne({ where }) {
      const db = read<ISession>(filePath);
      return SessionReadStoreHashMap(db).findOne({
        where,
      });
    },
  };
};

export const SessionWriteStoreFileSystem = (
  filePath: string
): ISessionWriteStore => {
  return {
    async add(session) {
      const db = read<ISession>(filePath);
      write(filePath, addOne(session.sessionToken, session, db));
    },
    async remove({ where }) {
      const db = read<ISession>(filePath);
      write(filePath, removeMany({ where }, db));
    },
  };
};
