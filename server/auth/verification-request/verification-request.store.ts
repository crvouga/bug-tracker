import { read, write } from "../../../shared/store.file-system";
import { findOne, removeMany } from "../../../shared/store.hash-map";
import { IVerificationRequest, IVerificationRequestStore } from "./contracts";

export const VerificationRequestHashMap = (): IVerificationRequestStore => {
  let db: {
    [id: string]: IVerificationRequest;
  } = {};
  return {
    async findOne({ where }) {
      return findOne({ where }, db);
    },
    async add(verificationRequest) {
      db[verificationRequest.hashedToken] = verificationRequest;
    },
    async remove({ where }) {
      db = removeMany({ where }, db);
    },
  };
};

export const VerificationRequestStoreFileSystem = (
  filePath: string
): IVerificationRequestStore => {
  return {
    async findOne({ where }) {
      const db = read<IVerificationRequest>(filePath);
      return findOne({ where }, db);
    },
    async add(verificationRequest) {
      const db = read<IVerificationRequest>(filePath);
      write(filePath, {
        ...db,
        [verificationRequest.hashedToken]: verificationRequest,
      });
    },
    async remove({ where }) {
      const db = read<IVerificationRequest>(filePath);
      write(filePath, removeMany({ where }, db));
    },
  };
};
