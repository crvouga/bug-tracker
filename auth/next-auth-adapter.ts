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
import { createUser, IUser, UserId } from "../users/contracts";
import { AccountId, createAccount } from "./account/contracts";
import {
  ISession,
  isSessionExpired,
  refreshSession,
  Session,
} from "./session/contracts";
import {
  isVerifcationRequestExpired,
  VerificationRequest,
} from "./verification-request/contracts";

//docs: https://next-auth.js.org/tutorials/creating-a-database-adapter
//docs: https://github.com/nextauthjs/next-auth/blob/canary/src/adapters/prisma/index.js

const toNextAuthUser = (user: IUser): INextAuthUser & { user: IUser } => {
  return {
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

export const Adapter = (
  app: IApp
): INextAuthAdapter<
  INextAuthUser & { user: IUser },
  INextAuthProfile,
  INextAuthSession,
  INextAuthVerificationRequest
> => {
  return {
    async getAdapter(appOptions) {
      const debug = (...args: any[]) => {
        app.logger.debug("[adapter][next-auth]", ...args);
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
          debug("[createUser]", { profile });

          const user = createUser({
            displayName: profile.name,
            emailAddress: profile.email ?? undefined,
            imageUrl: profile.image ?? undefined,
          });

          await app.write.user.add(user);

          return toNextAuthUser(user);
        },

        async getUser(id) {
          debug("[getUser]", { id });

          const user = await app.read.user.findOne({
            where: {
              userId: UserId(id),
            },
          });

          if (user) {
            return toNextAuthUser(user);
          }

          throw new Error("failed to get user");
        },

        async getUserByEmail(emailAddress) {
          debug("[getUserByEmail]", { emailAddress });

          const user = await app.read.user.findOne({
            where: {
              emailAddress: EmailAddress(emailAddress),
            },
          });

          if (user) {
            return toNextAuthUser(user);
          }

          throw new Error("failed to get user by email");
        },

        async getUserByProviderAccountId(providerId, providerAccountId) {
          debug("[getUserByProviderAccountId]", {
            providerId,
            providerAccountId,
          });

          const user = await app.read.user.findOne({
            where: {
              accountId: AccountId({
                providerId,
                providerAccountId,
              }),
            },
          });

          if (user) {
            return toNextAuthUser(user);
          }

          throw new Error("failed to get user from account id");
        },

        async updateUser(user) {
          debug("[updateUser]", {
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
          debug("[linkAccount]", {
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
        },

        async createSession(user) {
          debug("[createSession]", { user });

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

          return toNextAuthSession(session);
        },

        async getSession(sessionToken) {
          debug("[getSession]", { sessionToken });

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

            return null;
          }

          if (session) {
            return toNextAuthSession(session);
          }

          return null;
        },

        async updateSession(session, _force) {
          debug("[updateSession]", { session });

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

          return refreshed;
        },

        async deleteSession(sessionToken) {
          debug("[deleteSession]", { sessionToken });

          await app.write.session.remove({
            where: {
              sessionToken: Token(sessionToken),
            },
          });
        },

        async createVerificationRequest(
          identifier,
          url,
          token,
          secret,
          provider
        ) {
          debug("[createVerificationRequest]", {
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

          await sendVerificationRequest({
            identifier,
            url,
            token,
            baseUrl,
            provider,
          });

          await app.write.verifcationRequest.add(verificationRequest);

          return {
            identifier,
            token: hashedToken,
            expires,
          };
        },

        async getVerificationRequest(identifier, token, secret, provider) {
          debug("[getVerificationRequest]", {
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

            return null;
          }

          if (verifcationRequest) {
            return {
              identifier,
              token: hashedToken,
              expires: verifcationRequest.expires,
            };
          }

          return null;
        },

        async deleteVerificationRequest(identifier, token, secret, provider) {
          debug("[deleteVerificationRequest]", {
            identifier,
            token,
            secret,
            provider,
          });

          const hashedToken = createHashToken(`${token}${secret}`);

          await app.write.verifcationRequest.remove({ where: { hashedToken } });
        },
      };
    },
  };
};
