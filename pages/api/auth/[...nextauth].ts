import NextAuth, { InitOptions } from "next-auth";
import Providers from "next-auth/providers";
import { NextApiRequest, NextApiResponse } from "next-auth/_utils";
import { getEnvVariable } from "../../../utility/env";

const options: InitOptions = {
  providers: [
    // console: https://console.developers.google.com/apis/credentials?pli=1&project=bug-tracker-302401&folder=&organizationId=
    Providers.Google({
      clientId: getEnvVariable("GOOGLE_CLIENT_ID"),
      clientSecret: getEnvVariable("GOOGLE_CLIENT_SECRET"),
    }),
    // console: https://github.com/settings/apps/crvouga-bug-tracker
    Providers.GitHub({
      clientId: getEnvVariable("GITHUB_CLIENT_ID"),
      clientSecret: getEnvVariable("GITHUB_CLIENT_SECRET"),
    }),

    // Providers.Email({
    //   clientId: getEnvVariable("EMAIL_SERVER"),
    //   clientSecret: getEnvVariable("EMAIL_FROM"),
    // }),
  ],
  session: {
    jwt: false,

    maxAge: 30 * 24 * 60 * 60, // 30 days

    updateAge: 24 * 60 * 60, // 24 hours
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, options);
};

export default handler;
