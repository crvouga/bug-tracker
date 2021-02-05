import {
  AccountStoreHashMap,
  AccountStoreFileSystem,
} from "../auth/account/account.store";
import {
  SessionStoreHashMap,
  SessionStoreFileSystem,
} from "../auth/session/session.store";
import { UserStoreHashMap, UserStoreFileSystem } from "../auth/user/user.store";
import {
  VerificationRequestHashMap,
  VerificationRequestStoreFileSystem,
} from "../auth/verification-request/verification-request.store";
import { HandleProjectQueryInMemory } from "../projects/read";
import { HandleProjectCommand } from "../projects/write/project-commands";
import { ProjectEventStoreInMemory } from "../projects/write/project-event-store";
import { IApp } from "./contracts";
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

    store: {
      session: SessionStoreHashMap(),
      verifcationRequest: VerificationRequestHashMap(),
      user: UserStoreHashMap(),
      account: AccountStoreHashMap(),
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
    store: {
      session: SessionStoreFileSystem(sessionPath),
      verifcationRequest: VerificationRequestStoreFileSystem(
        verifcationRequestPath
      ),
      user: UserStoreFileSystem(userPath),
      account: AccountStoreFileSystem(accountPath),
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
