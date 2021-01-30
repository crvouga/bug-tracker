import { IAccountWriteStore } from "../auth/account/contracts";
import {
  ISessionReadStore,
  ISessionWriteStore,
} from "../auth/session/contracts";
import {
  IVerifcationRequestWriteStore,
  IVerificationRequestReadStore,
} from "../auth/verification-request/contracts";
import { IUserReadStore, IUserWriteStore } from "../users/contracts";

export type IApp = {
  read: {
    session: ISessionReadStore;
    user: IUserReadStore;
    verificationRequest: IVerificationRequestReadStore;
  };
  write: {
    session: ISessionWriteStore;
    user: IUserWriteStore;
    account: IAccountWriteStore;
    verifcationRequest: IVerifcationRequestWriteStore;
  };
};
