import { ITimestamp, IToken, Timestamp, Token } from "../../shared";
import { IUserId, UserId } from "../../users/contracts";

export type ISession = {
  userId: IUserId;
  expires: ITimestamp;
  sessionToken: IToken;
  accessToken: IToken;
};

export const Session = ({
  userId,
  expires,
  sessionToken,
  accessToken,
}: {
  userId: any;
  expires: any;
  sessionToken: string;
  accessToken: string;
}): ISession => {
  return {
    userId: UserId(userId),
    expires: Timestamp(expires),
    sessionToken: Token(sessionToken),
    accessToken: Token(accessToken),
  };
};

export const isSessionExpired = (session: ISession) => {
  return session.expires < Timestamp();
};

export const refreshSession = (
  {
    sessionMaxAge,
    sessionUpdateAge,
  }: {
    sessionUpdateAge: number;
    sessionMaxAge: number;
  },
  session: ISession
): ISession => {
  const dateSessionIsDueToBeUpdated = new Date(session.expires);

  dateSessionIsDueToBeUpdated.setTime(
    dateSessionIsDueToBeUpdated.getTime() - sessionMaxAge
  );

  dateSessionIsDueToBeUpdated.setTime(
    dateSessionIsDueToBeUpdated.getTime() + sessionUpdateAge
  );
  if (new Date() > dateSessionIsDueToBeUpdated) {
    const newExpiryDate = new Date();

    newExpiryDate.setTime(newExpiryDate.getTime() + sessionMaxAge);

    return Session({
      ...session,
      expires: newExpiryDate,
    });
  }

  return session;
};

export type ISessionReadStore = {
  findOne({ where }: { where: Partial<ISession> }): Promise<ISession | null>;
};

export type ISessionWriteStore = {
  add(session: ISession): Promise<void>;
  remove({ where }: { where: { sessionToken: IToken } }): Promise<void>;
};
