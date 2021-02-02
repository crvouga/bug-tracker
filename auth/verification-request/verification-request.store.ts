import { read, write } from "../../shared/store.file-system";
import { findOne, removeMany, addOne } from "../../shared/store.hash-map";
import {
  IVerifcationRequestWriteStore,
  IVerificationRequest,
  IVerificationRequestReadStore,
} from "./contracts";

export const VerificationRequestReadStoreHashMap = (
  db: {
    [id: string]: IVerificationRequest;
  } = {}
): IVerificationRequestReadStore => {
  return {
    async findOne({ where }) {
      return findOne({ where }, db);
    },
  };
};

export const VerificationRequestWriteStoreHashMap = (
  db: {
    [id: string]: IVerificationRequest;
  } = {}
): IVerifcationRequestWriteStore => {
  return {
    async add(verificationRequest) {
      db[verificationRequest.hashedToken] = verificationRequest;
    },
    async remove({ where }) {
      db = removeMany({ where }, db);
    },
  };
};

export const VerificationRequestReadStoreFileSystem = (
  filePath: string
): IVerificationRequestReadStore => {
  return {
    async findOne({ where }) {
      const db = read<IVerificationRequest>(filePath);
      return findOne({ where }, db);
    },
  };
};

export const VerificationRequestWriteStoreFileSystem = (
  filePath: string
): IVerifcationRequestWriteStore => {
  return {
    async add(verificationRequest) {
      const db = read<IVerificationRequest>(filePath);
      write(
        filePath,
        addOne(verificationRequest.hashedToken, verificationRequest, db)
      );
    },
    async remove({ where }) {
      const db = read<IVerificationRequest>(filePath);
      write(filePath, removeMany({ where }, db));
    },
  };
};
