import {
  IAccountReadStore,
  IAccountWriteStore,
} from "../auth/account/contracts";
import {
  ISessionReadStore,
  ISessionWriteStore,
} from "../auth/session/contracts";
import {
  IVerifcationRequestWriteStore,
  IVerificationRequestReadStore,
} from "../auth/verification-request/contracts";
import { IProjectQuery, IProjectQueryRespnse } from "../projects/read";
import { IProjectCommand } from "../projects/write/contracts";
import { IUserReadStore, IUserWriteStore } from "../users/contracts";

export type IAppCommand = IProjectCommand;

export type IAppQuery = IProjectQuery;

export type IAppQueryResponse = IProjectQueryRespnse;

export type IApp = {
  runCommand: (command: IAppCommand) => Promise<Error[]>;

  runQuery: (query: IAppQuery) => Promise<IAppQueryResponse>;

  read: {
    session: ISessionReadStore;
    user: IUserReadStore;
    account: IAccountReadStore;
    verificationRequest: IVerificationRequestReadStore;
  };

  write: {
    session: ISessionWriteStore;
    user: IUserWriteStore;
    account: IAccountWriteStore;
    verifcationRequest: IVerifcationRequestWriteStore;
  };
};
