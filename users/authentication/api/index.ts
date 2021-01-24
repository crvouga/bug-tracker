import { GetServerSideProps } from "next";
import NextAuth, { InitOptions } from "next-auth";
import { getSession } from "next-auth/client";
import Providers from "next-auth/providers";
import { NextApiRequest, NextApiResponse } from "next-auth/_utils";

export const getProtectedRouteProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      props: {},
    };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/sign-in",
      },
    };
  }
};

export const getEnvVariable = (key: string): string => {
  const variable = process.env[key];

  if (variable) {
    return variable;
  }

  throw new Error(`${variable} is undefined`);
};

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
