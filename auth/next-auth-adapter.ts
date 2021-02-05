import { User as INextAuthUser } from "next-auth";
import {
  Adapter as INextAuthAdapter,
  Profile as INextAuthProfile,
  Session as INextAuthSession,
  VerificationRequest as INextAuthVerificationRequest,
} from "next-auth/adapters";
import { IApp } from "../app/contracts";
import {
  createHashToken,
  createRandomToken,
  EmailAddress,
  Timestamp,
  timestampToDate,
  Token,
} from "../shared";
import { IUser, IUserId, User, UserId } from "../users/contracts";
import { AccountId, createAccount } from "./account/contracts";
import {
  ISession,
  isSessionExpired,
  refreshSession,
  Session,
} from "./session/contracts";
import {
  isVerifcationRequestExpired,
  IVerificationRequest,
  VerificationRequest,
} from "./verification-request/contracts";

//docs: https://next-auth.js.org/tutorials/creating-a-database-adapter
//docs: https://github.com/nextauthjs/next-auth/blob/canary/src/adapters/prisma/index.js

type INextAuthAdapterUser = INextAuthUser & { id: IUserId; user: IUser };

const toNextAuthUser = (user: IUser): INextAuthAdapterUser => {
  return {
    id: user.userId,
    name: user.displayName,
    email: user.emailAddress,
    image: user.imageUrl,
    user,
  };
};

const toNextAuthSession = (
  session: ISession
): INextAuthSession & { session: ISession } => {
  return {
    ...session,
    expires: timestampToDate(session.expires),
    session,
  };
};

const toNextAuthVerificationRequest = (
  verificationRequest: IVerificationRequest
): INextAuthVerificationRequest => {
  return {
    identifier: verificationRequest.identifier,
    token: verificationRequest.hashedToken,
    expires: verificationRequest.expires,
  };
};

export const Adapter = (
  app: IApp
): INextAuthAdapter<
  INextAuthAdapterUser,
  INextAuthProfile,
  INextAuthSession,
  INextAuthVerificationRequest
> => {
  return {
    async getAdapter(appOptions) {
      const debug = (...args: any[]) => {
        if (false) {
          console.log(...args);
        }
        // app.logger.debug("[adapter][next-auth]", ...args);
      };

      const defaultSessionMaxAge = 30 * 24 * 60 * 60 * 1000;

      const sessionMaxAge =
        appOptions && appOptions.session && appOptions.session.maxAge
          ? appOptions.session.maxAge * 1000
          : defaultSessionMaxAge;

      const sessionUpdateAge =
        appOptions && appOptions.session && appOptions.session.updateAge
          ? appOptions.session.updateAge * 1000
          : 0;

      return {
        async createUser(profile) {
          debug("[createUser][in]", { profile });

          const user = User({
            displayName: profile.name ?? undefined,
            emailAddress: profile.email ?? undefined,
            imageUrl: profile.image ?? undefined,
          });

          await app.write.user.add(user);

          const nextAuthUser = toNextAuthUser(user);

          debug("[createUser][out]", { user: nextAuthUser });

          return nextAuthUser;
        },

        async getUser(id) {
          debug("[getUser][in]", { id });

          const user = await app.read.user.findOne({
            where: {
              userId: UserId(id),
            },
          });

          const nextAuthUser = user ? toNextAuthUser(user) : null;

          debug("[getUser][out]", { user: nextAuthUser });

          return nextAuthUser;
        },

        async getUserByEmail(emailAddress) {
          debug("[getUserByEmail][in]", { emailAddress });

          const user = await app.read.user.findOne({
            where: {
              emailAddress: EmailAddress(emailAddress),
            },
          });

          const nextAuthUser = user ? toNextAuthUser(user) : null;

          debug("[getUserByEmail][out]", { user: nextAuthUser });

          return nextAuthUser;
        },

        async getUserByProviderAccountId(providerId, providerAccountId) {
          debug("[getUserByProviderAccountId][in]", {
            providerId,
            providerAccountId,
          });

          const account = await app.read.account.findOne({
            where: {
              accountId: AccountId({
                providerId,
                providerAccountId,
              }),
            },
          });

          const user = await app.read.user.findOne({
            where: {
              userId: account?.userId,
            },
          });

          if (user) {
            return toNextAuthUser(user);
          }

          const nextAuthUser = user ? toNextAuthUser(user) : null;

          debug("[getUserByProviderAccountId][out]", { user: nextAuthUser });

          return nextAuthUser;
        },

        async updateUser(user) {
          debug("[updateUser][in]", {
            user,
          });
          throw new Error("unimplemented");
        },

        async linkAccount(
          userId,
          providerId,
          providerType,
          providerAccountId,
          refreshToken,
          accessToken,
          accessTokenExpires
        ) {
          debug("[linkAccount][in]", {
            userId,
            providerId,
            providerType,
            providerAccountId,
            refreshToken,
            accessToken,
            accessTokenExpires,
          });

          const account = createAccount({
            userId,
            providerId,
            providerType,
            providerAccountId,
            refreshToken,
            accessToken,
            accessTokenExpires,
          });

          await app.write.account.add(account);

          debug("[linkAccount][out]", account);
        },

        async createSession(user) {
          debug("[createSession][in]", { user });

          const dateExpires = new Date();

          dateExpires.setTime(dateExpires.getTime() + sessionMaxAge);

          const expires = dateExpires.toISOString();

          const session = Session({
            userId: user.user.userId,
            expires,
            sessionToken: createRandomToken(),
            accessToken: createRandomToken(),
          });

          await app.write.session.add(session);

          const nextAuthSession = toNextAuthSession(session);

          debug("[createSession][out]", { session: nextAuthSession });

          return nextAuthSession;
        },

        async getSession(sessionToken) {
          debug("[getSession][in]", { sessionToken });

          const session = await app.read.session.findOne({
            where: {
              sessionToken: Token(sessionToken),
            },
          });

          if (session && isSessionExpired(session)) {
            await app.write.session.remove({
              where: {
                sessionToken: session.sessionToken,
              },
            });

            debug("[getSession][out]", "[session-expired]");

            return null;
          }

          const nextAuthSession = session ? toNextAuthSession(session) : null;

          debug("[getSession][out]", { nextAuthSession, session });

          return nextAuthSession;
        },

        async updateSession(session, force) {
          debug("[updateSession][in]", { session, force });

          const refreshed = refreshSession(
            {
              sessionMaxAge,
              sessionUpdateAge,
            },
            Session({
              userId: String(session.userId),
              expires: session.expires,
              sessionToken: createRandomToken(),
              accessToken: createRandomToken(),
            })
          );

          await app.write.session.remove({
            where: {
              sessionToken: refreshed.sessionToken,
            },
          });

          await app.write.session.add(refreshed);

          const nextAuthSession = toNextAuthSession(refreshed);

          debug("[updateSession][out]", { session: nextAuthSession });

          return nextAuthSession;
        },

        async deleteSession(sessionToken) {
          debug("[deleteSession][in]", { sessionToken });

          await app.write.session.remove({
            where: {
              sessionToken: Token(sessionToken),
            },
          });
          debug("[deleteSession][out]", "[deleted]");
        },

        async createVerificationRequest(
          identifier,
          url,
          token,
          secret,
          provider
        ) {
          debug("[createVerificationRequest][in]", {
            identifier,
            url,
            token,
            secret,
            provider,
          });

          const { baseUrl } = appOptions;
          const { sendVerificationRequest, maxAge } = provider;

          const expires = Timestamp(
            new Date(Date.now() + (maxAge ?? defaultSessionMaxAge) * 1000)
          );

          const hashedToken = createHashToken(`${token}${secret}`);

          const verificationRequest = VerificationRequest({
            identifier,
            hashedToken,
            expires,
          });

          debug("[createVerificationRequest][out]", {
            verificationRequest,
          });

          await sendVerificationRequest({
            identifier,
            url,
            token,
            baseUrl,
            provider,
          });

          debug("[createVerificationRequest][out]", "[sent email!]");

          await app.write.verifcationRequest.add(verificationRequest);

          const nextAuthRequest = toNextAuthVerificationRequest(
            verificationRequest
          );

          debug("[createVerificationRequest][out]", {
            nextAuthRequest,
            verificationRequest,
          });

          return nextAuthRequest;
        },

        async getVerificationRequest(identifier, token, secret, provider) {
          debug("[getVerificationRequest][in]", {
            identifier,
            token,
            secret,
            provider,
          });

          const hashedToken = createHashToken(`${token}${secret}`);

          const verifcationRequest = await app.read.verificationRequest.findOne(
            {
              where: {
                hashedToken,
              },
            }
          );

          if (
            verifcationRequest &&
            isVerifcationRequestExpired(verifcationRequest)
          ) {
            await app.write.verifcationRequest.remove({
              where: {
                hashedToken,
              },
            });

            debug("[getVerificationRequest][out]", "[expired]");
            return null;
          }

          const nextAuthRequest = verifcationRequest
            ? toNextAuthVerificationRequest(verifcationRequest)
            : null;

          debug("[getVerificationRequest][out]", {
            verifcationRequest: nextAuthRequest,
          });

          return nextAuthRequest;
        },

        async deleteVerificationRequest(identifier, token, secret, provider) {
          debug("[deleteVerificationRequest][in]", {
            identifier,
            token,
            secret,
            provider,
          });

          const hashedToken = createHashToken(`${token}${secret}`);

          await app.write.verifcationRequest.remove({ where: { hashedToken } });

          debug("[deleteVerificationRequest][out]", "[deleted]");
        },
      };
    },
  };
};
