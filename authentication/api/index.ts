import NextAuth, { InitOptions } from "next-auth";
import Providers from "next-auth/providers";
import { NextApiRequest, NextApiResponse } from "next-auth/_utils";

export const getEnvVariable = (key: string): string => {
  const variable = process.env[key];

  if (variable) {
    return variable;
  }

  throw new Error(`${variable} is undefined`);
};

const options: InitOptions = {
  providers: [
    Providers.Google({
      clientId: getEnvVariable("GOOGLE_CLIENT_ID"),
      clientSecret: getEnvVariable("GOOGLE_CLIENT_SECRET"),
    }),
  ],
  pages: {
    signIn: "/auth/sign-in",
    signOut: "/auth/sign-out",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
    newUser: null,
  },
};

export const handler = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  return NextAuth(request, response, options);
};
