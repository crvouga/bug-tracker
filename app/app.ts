import {
  AccountReadStoreFileSystem,
  AccountReadStoreHashMap,
  AccountWriteStoreFileSystem,
  AccountWriteStoreHashMap,
} from "../auth/account/account.store";
import {
  SessionReadStoreFileSystem,
  SessionReadStoreHashMap,
  SessionWriteStoreFileSystem,
  SessionWriteStoreHashMap,
} from "../auth/session/session.store";
import {
  VerificationRequestReadStoreFileSystem,
  VerificationRequestReadStoreHashMap,
  VerificationRequestWriteStoreFileSystem,
  VerificationRequestWriteStoreHashMap,
} from "../auth/verification-request/verification-request.store";
import {
  UserReadStoreFileSystem,
  UserReadStoreHashMap,
  UserWriteStoreFileSystem,
  UserWriteStoreHashMap,
} from "../users/user.store";
import { IApp } from "./contracts";

export const AppTest = (): IApp => {
  return {
    logger: {
      debug: (...args) => console.log(args),
    },
    read: {
      session: SessionReadStoreHashMap(),
      user: UserReadStoreHashMap(),
      account: AccountReadStoreHashMap(),
      verificationRequest: VerificationRequestReadStoreHashMap(),
    },

    write: {
      session: SessionWriteStoreHashMap(),
      user: UserWriteStoreHashMap(),
      account: AccountWriteStoreHashMap(),
      verifcationRequest: VerificationRequestWriteStoreHashMap(),
    },
  };
};

export const AppDevelopment = (): IApp => {
  const sessionPath = ".store/session.json";
  const userPath = ".store/user.json";
  const verifcationRequestPath = ".store/verification-request.json";
  const accountPath = ".store/account.json";

  return {
    logger: {
      debug: (...args) => {
        console.log(...args);
      },
    },
    read: {
      session: SessionReadStoreFileSystem(sessionPath),
      user: UserReadStoreFileSystem(userPath),
      account: AccountReadStoreFileSystem(accountPath),
      verificationRequest: VerificationRequestReadStoreFileSystem(
        verifcationRequestPath
      ),
    },

    write: {
      session: SessionWriteStoreFileSystem(sessionPath),
      user: UserWriteStoreFileSystem(userPath),
      account: AccountWriteStoreFileSystem(accountPath),
      verifcationRequest: VerificationRequestWriteStoreFileSystem(
        verifcationRequestPath
      ),
    },
  };
};

export const AppProduction = () => {
  return {
    ...AppTest(),
    logger: {
      debug: () => {},
    },
  };
};

export const App = () => {
  switch (process.env.NODE_ENV) {
    case "production":
      return AppProduction();

    case "development":
      return AppDevelopment();

    case "test":
      return AppTest();
  }
};
