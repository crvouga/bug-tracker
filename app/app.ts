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
import { ProjectEventStoreInMemory } from "../projects/write/project-event-store";
import { HandleProjectQueryInMemory } from "../projects/read";
import { HandleProjectCommand } from "../projects/write/project-commands";
import { ILogger } from "./logging/contracts";

const logger: ILogger = {
  debug: (...args) => {
    switch (process.env.NODE_ENV) {
      case "development":
        console.log(JSON.stringify(args, null, 2));
        return;
    }
  },
};

export const AppTest = (): IApp => {
  const projectEventStore = ProjectEventStoreInMemory({
    logger,
  });

  const runProjectQuery = HandleProjectQueryInMemory({
    logger,
    projectEventStore,
  });

  const runProjectCommand = HandleProjectCommand({
    logger,
    projectEventStore,
  });

  return {
    runQuery: async (query) => {
      return runProjectQuery(query);
    },

    runCommand: async (command) => {
      return runProjectCommand(command);
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
    ...AppTest(),

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
