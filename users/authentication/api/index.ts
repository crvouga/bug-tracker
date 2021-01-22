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
  session: {
    jwt: false,

    maxAge: 30 * 24 * 60 * 60, // 30 days

    updateAge: 24 * 60 * 60, // 24 hours
  },
};

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, options);
};
