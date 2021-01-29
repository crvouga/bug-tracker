import { IToken } from "../../shared";
import { IUserId } from "../../users/contracts";

export type ISession = {
  userId: IUserId;
  expires: Date;
  sessionToken: IToken;
  accessToken: IToken;
};

export type ISessionReadStore = {
  findOne({
    where,
  }: {
    where: { sessionToken: IToken };
  }): Promise<ISession | null>;
};

export type ISessionWriteStore = {
  add(session: ISession): Promise<void>;
  remove(sessionToken: IToken): Promise<void>;
};
