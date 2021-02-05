import Box from "@material-ui/core/Box";
import { GetServerSideProps } from "next";
import {
  getProviders,
  getSession,
  SessionProvider,
  signIn,
} from "next-auth/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { LayoutDialog } from "../../../components/auth/layout";
import { SessionProviderButton } from "../../../components/auth/session-provider-button";

export type ISignInProps = {
  providers: {
    [provider: string]: SessionProvider;
  };
};

export const getServerSideProps: GetServerSideProps<ISignInProps> = async () => {
  const session = await getSession();

  const providersResponse = await getProviders();

  const providers = providersResponse ?? {};

  return {
    props: {
      providers,
    },
    redirect: session ? { destination: "/" } : undefined,
  };
};

const SignInButton = ({ provider }: { provider: SessionProvider }) => {
  switch (provider.id) {
    case "email":
      return (
        <Link href="/auth/sign-in/email">
          <SessionProviderButton provider={provider} />
        </Link>
      );

    default:
      return (
        <SessionProviderButton
          provider={provider}
          onClick={() => {
            signIn(provider.id, {
              callbackUrl: "/",
            });
          }}
        />
      );
  }
};

const SignIn = ({ providers }: ISignInProps) => {
  return (
    <LayoutDialog>
      <Link href="/">
        <Box paddingBottom={1}>
          <Image
            alt="bug tracker logo"
            width="120px"
            height="120px"
            src="/logo-dark.svg"
          />
        </Box>
      </Link>

      {Object.entries(providers).map(([id, provider]) => (
        <Box key={id} width="100%" paddingBottom={1}>
          <SignInButton provider={provider} />
        </Box>
      ))}
    </LayoutDialog>
  );
};

export default SignIn;
