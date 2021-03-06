import { IAccountStore } from "../auth/account/contracts";
import { ISessionStore } from "../auth/session/contracts";
import { IUserStore } from "../auth/user/contracts";
import { IVerificationRequestStore } from "../auth/verification-request/contracts";
import { IProjectQuery, IProjectQueryRespnse } from "../projects/read";
import { IProjectCommand } from "../projects/write/contracts";
import { IProjectEventStore } from "../projects/write/project-event-store";

export type IAppCommand = IProjectCommand;

export type IAppQuery = IProjectQuery;

export type IAppQueryResponse = IProjectQueryRespnse;

export type IApp = {
  runCommand: (command: IAppCommand) => Promise<Error[]>;

  runQuery: (query: IAppQuery) => Promise<IAppQueryResponse>;

  store: {
    projectEvent: IProjectEventStore;
    session: ISessionStore;
    user: IUserStore;
    account: IAccountStore;
    verifcationRequest: IVerificationRequestStore;
  };
};
