import { read, write } from "../../../shared/store.file-system";
import { findOne, removeMany } from "../../../shared/store.hash-map";
import { ISession, ISessionStore } from "./contracts";

export const SessionStoreHashMap = (): ISessionStore => {
  let db: {
    [id: string]: ISession;
  } = {};

  return {
    async findOne({ where }) {
      return findOne({ where }, db);
    },
    async add(session) {
      db = {
        ...db,
        [session.sessionToken]: session,
      };
    },
    async remove({ where }) {
      db = removeMany({ where }, db);
    },
  };
};

export const SessionStoreFileSystem = (filePath: string): ISessionStore => {
  return {
    async findOne({ where }) {
      const db = read<ISession>(filePath);
      return findOne(
        {
          where,
        },
        db
      );
    },
    async add(session) {
      const db = read<ISession>(filePath);
      write(filePath, {
        ...db,
        [session.sessionToken]: session,
      });
    },
    async remove({ where }) {
      const db = read<ISession>(filePath);
      write(filePath, removeMany({ where }, db));
    },
  };
};
