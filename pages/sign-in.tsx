import { Box, Container, Typography } from "@material-ui/core";
import { GetServerSideProps } from "next";
import { getSession, SessionProvider } from "next-auth/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SignInForm } from "../authentication/components/sign-in-form";
import { getProviders } from "../authentication/session";
import { AnimationLayout } from "../components/layout";

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

export type ISignInProps = {
  providers: SessionProvider[];
};

export const getServerSideProps: GetServerSideProps<ISignInProps> = async () => {
  const providers = Object.values((await getProviders()) || {});

  return {
    props: {
      providers,
    },
  };
};

const SignIn = (props: ISignInProps) => {
  const { providers } = props;

  return (
    <AnimationLayout>
      <Container maxWidth="xs">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          paddingY={4}
        >
          <Box paddingBottom={2}>
            <Link href="/">
              <Image width="150px" height="150px" src="/logo-dark.svg" />
            </Link>
          </Box>

          <Box paddingBottom={2}>
            <Typography align="center" variant="h5">
              Sign into Bug Tracker
            </Typography>
          </Box>

          <SignInForm providers={providers} />
        </Box>
      </Container>
    </AnimationLayout>
  );
};

export default SignIn;
