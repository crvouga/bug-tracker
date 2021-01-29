import { IToken } from "../../shared";
import { IUserId } from "../../users/contracts";

export type IAccountId = {
  providerId: string;
  providerAccountId: string;
};

export const AccountId = ({
  providerId,
  providerAccountId,
}: {
  providerId: string;
  providerAccountId: string;
}): IAccountId => {
  return {
    providerId,
    providerAccountId,
  };
};

export type IAccount = {
  accessToken: IToken;
  refreshToken: IToken;
  accountId: IAccountId;
  providerAccountId: string;
  providerId: string;
  providerType: string;
  accessTokenExpires: Date;
  userId: IUserId;
};

export type IAccountWriteStore = {
  add(account: IAccount): Promise<void>;
  remove(accountId: IAccountId): Promise<void>;
};
