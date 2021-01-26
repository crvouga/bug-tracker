import { IUserId } from "../../users/contracts";
import { IEmailAddress } from "../../utility/email-address";

export type IPassword = string & { readonly type: "Password" };

export type IPasswordCredentials = {
  emailAddress: IEmailAddress;
  password: IPassword;
};

export type IPasswordHash = string;

export type IPasswordCredential = {
  userId: IUserId;
  passwordHash: IPasswordHash;
};

export type ICredentialsRepository = {
  findOne: ({
    emailAddress,
  }: {
    emailAddress: IEmailAddress;
  }) => Promise<IPasswordCredential | null>;
};

export type ISocialSignInProvider = {
  name: string;
  id: string;
};
