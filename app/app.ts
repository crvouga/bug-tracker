import { IApp } from "./contracts";
import {
  SessionReadStoreHashMap,
  SessionWriteStoreHashMap,
} from "../auth/session/session.store";
import { ISession } from "../auth/session/contracts";
import {
  VerificationRequestReadStoreHashMap,
  VerificationRequestWriteStoreHashMap,
} from "../auth/verification-request/verification-request.store";
import { IVerificationRequest } from "../auth/verification-request/contracts";
import {
  UserReadStoreHashMap,
  UserWriteStoreHashMap,
} from "../users/user.store";
import { IUser } from "../users/contracts";
import { AccountWriteStoreHashMap } from "../auth/account/account.store";
import { IAccount } from "../auth/account/contracts";

export const AppTest = (): IApp => {
  const sessionMap = new Map<string, ISession>();
  const verifcationRequestMap = new Map<string, IVerificationRequest>();
  const userMap = new Map<string, IUser>();
  const accountMap = new Map<string, IAccount>();

  return {
    logger: {
      debug: (...args) => console.log(args),
    },
    read: {
      session: SessionReadStoreHashMap(sessionMap),
      user: UserReadStoreHashMap(userMap),
      verificationRequest: VerificationRequestReadStoreHashMap(
        verifcationRequestMap
      ),
    },

    write: {
      session: SessionWriteStoreHashMap(sessionMap),
      user: UserWriteStoreHashMap(userMap),
      account: AccountWriteStoreHashMap(accountMap),
      verifcationRequest: VerificationRequestWriteStoreHashMap(
        verifcationRequestMap
      ),
    },
  };
};
