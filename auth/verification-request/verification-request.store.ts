import {
  IVerificationRequestReadStore,
  IVerificationRequest,
  IVerifcationRequestWriteStore,
} from "./contracts";
import { findOne, remove } from "../../shared/store.hash-map";

export const VerificationRequestReadStoreHashMap = (
  hashMap: Map<string, IVerificationRequest>
): IVerificationRequestReadStore => {
  return {
    async findOne({ where }) {
      return findOne({ where }, hashMap);
    },
  };
};

export const VerificationRequestWriteStoreHashMap = (
  hashMap: Map<string, IVerificationRequest>
): IVerifcationRequestWriteStore => {
  return {
    async add(verificationRequest) {
      hashMap.set(verificationRequest.hashedToken, verificationRequest);
    },
    async remove({ where }) {
      await remove({ where }, hashMap);
    },
  };
};
