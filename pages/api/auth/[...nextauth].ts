import NextAuth, { InitOptions } from "next-auth";
import Providers from "next-auth/providers";
import { NextApiRequest, NextApiResponse } from "next-auth/_utils";
import { getEnvVariable } from "../../../utility/env";

//why?: https://github.com/nextauthjs/next-auth/issues/463
const EMAIL_SERVER_HOST = "smtp.sendgrid.net";
const EMAIL_SERVER_USERNAME = "apikey";
//source: https://app.sendgrid.com/settings/api_keys
const EMAIL_SERVER_PASSWORD = getEnvVariable("SEND_GRID_API_KEY");
const EMAIL_SERVER = `smtp://${EMAIL_SERVER_USERNAME}:${EMAIL_SERVER_PASSWORD}@${EMAIL_SERVER_HOST}:587`;
// source: https://app.sendgrid.com/settings/sender_auth/senders
const EMAIL_FROM = getEnvVariable("EMAIL_FROM");

const options: InitOptions = {
  providers: [
    // source: https://console.developers.google.com/apis/credentials?pli=1&project=bug-tracker-302401&folder=&organizationId=
    Providers.Google({
      clientId: getEnvVariable("GOOGLE_CLIENT_ID"),
      clientSecret: getEnvVariable("GOOGLE_CLIENT_SECRET"),
    }),
    // source: https://github.com/settings/apps/crvouga-bug-tracker
    Providers.GitHub({
      clientId: getEnvVariable("GITHUB_CLIENT_ID"),
      clientSecret: getEnvVariable("GITHUB_CLIENT_SECRET"),
    }),

    Providers.Email({
      server: EMAIL_SERVER,
      from: EMAIL_FROM,
    }),
  ],
  session: {
    // jwt: false,

    maxAge: 30 * 24 * 60 * 60, // 30 days

    updateAge: 24 * 60 * 60, // 24 hours
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, options);
};

export default handler;
