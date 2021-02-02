import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { GetServerSideProps } from "next";
import {
  getProviders,
  SessionProvider,
  signIn,
  getSession,
} from "next-auth/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SessionProviderButton } from "../../components/auth/session-provider-button";
import { AnimationLayout } from "../../components/layout";

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

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingY: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(8),
    },
  },
}));

const SignInButton = ({ provider }: { provider: SessionProvider }) => {
  switch (provider.id) {
    case "email":
      return (
        <Link href="/sign-in/email">
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
  const classes = useStyles();

  return (
    <AnimationLayout>
      <Container maxWidth="xs" disableGutters>
        <Paper className={classes.paper}>
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
        </Paper>
      </Container>
    </AnimationLayout>
  );
};

export default SignIn;
