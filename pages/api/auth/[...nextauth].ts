import NextAuth, { InitOptions } from "next-auth";
import Providers from "next-auth/providers";
import { NextApiRequest, NextApiResponse } from "next-auth/_utils";

const options: InitOptions = {
  providers: [
    Providers.Credentials({
      id: "sign-in",
      name: "PasswordCredentials",

      credentials: {},

      authorize: async (credentials) => {
        const { emailAddress } = credentials;

        console.log(credentials);
        const user = {
          emailAddress,
        };

        if (user) {
          return Promise.resolve(user);
        } else {
          return Promise.resolve(null);
        }
      },
    }),
    Providers.Credentials({
      id: "sign-up",
      name: "PasswordCredentials",

      credentials: {},

      authorize: async (credentials) => {
        const { emailAddress } = credentials;

        console.log(credentials);
        const user = {
          emailAddress,
        };

        if (user) {
          return Promise.resolve(user);
        } else {
          return Promise.resolve(null);
        }
      },
    }),
  ],
};

export const handler = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  return NextAuth(request, response, options);
};

export default handler;
