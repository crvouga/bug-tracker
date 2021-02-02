import { ITimestamp, IToken, Timestamp, Token } from "../../shared";
import { IUserId, UserId } from "../../users/contracts";

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

export const accountIdToString = (accountId: IAccountId): string => {
  return [accountId.providerId, accountId.providerAccountId].join(" ");
};

export const stringToAccountId = (string: string): IAccountId => {
  const [providerId, providerAccountId] = string.split(" ");
  return AccountId({
    providerId,
    providerAccountId,
  });
};

export type IAccount = {
  accountId: IAccountId;
  accessToken: IToken;
  refreshToken: IToken;
  providerType: string;
  accessTokenExpires: ITimestamp;
  userId: IUserId;
};

export const createAccount = ({
  accessToken,
  refreshToken,
  providerAccountId,
  providerId,
  providerType,
  accessTokenExpires,
  userId,
}: {
  accessToken: string;
  refreshToken: string;
  providerAccountId: string;
  providerId: string;
  providerType: string;
  accessTokenExpires: number;
  userId: string;
}): IAccount => {
  return {
    accountId: AccountId({
      providerAccountId,
      providerId,
    }),
    userId: UserId(userId),
    accessToken: Token(accessToken),
    refreshToken: Token(refreshToken),
    providerType,
    accessTokenExpires: Timestamp(accessTokenExpires),
  };
};

export type IAccountWriteStore = {
  add(account: IAccount): Promise<void>;
  remove(accountId: IAccountId): Promise<void>;
};
