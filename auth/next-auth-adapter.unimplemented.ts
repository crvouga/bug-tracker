import {
  Adapter as INextAuthAdapter,
  Profile as INextAuthProfile,
  Session as INextAuthSession,
  VerificationRequest as INextAuthVerificationRequest,
} from "next-auth/adapters";

type IUser = {};

export const Adapter = (
  _config: unknown,
  _options: unknown
): INextAuthAdapter<
  IUser,
  INextAuthProfile,
  INextAuthSession,
  INextAuthVerificationRequest
> => {
  return {
    async getAdapter(_appOptions) {
      return {
        async createUser(_profile) {
          throw new Error("unimplemented");
        },

        async getUser(_id) {
          throw new Error("unimplemented");
        },

        async getUserByEmail(_emailAddress) {
          throw new Error("unimplemented");
        },

        async getUserByProviderAccountId(_providerId, _providerAccountId) {
          throw new Error("unimplemented");
        },

        async updateUser(_user) {
          throw new Error("unimplemented");
        },

        async linkAccount(
          _userId,
          _providerId,
          _providerType,
          _providerAccountId,
          _refreshToken,
          _accessToken,
          _accessTokenExpires
        ) {
          throw new Error("unimplemented");
        },

        async createSession(_user) {
          throw new Error("unimplemented");
        },

        async getSession(_sessionToken) {
          throw new Error("unimplemented");
        },

        async updateSession(_session, _force) {
          throw new Error("unimplemented");
        },

        async deleteSession(_sessionToken) {
          throw new Error("unimplemented");
        },

        async createVerificationRequest(
          _identifier,
          _url,
          _token,
          _secret,
          _provider
        ) {
          throw new Error("unimplemented");
        },

        async getVerificationRequest(_identifier, _token, _secret, _provider) {
          throw new Error("unimplemented");
        },

        async deleteVerificationRequest(
          _identifier,
          _token,
          _secret,
          _provider
        ) {
          throw new Error("unimplemented");
        },
      };
    },
  };
};
