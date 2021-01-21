import { Box, Container, Typography } from "@material-ui/core";
import { GetServerSideProps } from "next";
import { getSession, SessionProvider } from "next-auth/client";
import Image from "next/image";
import React from "react";
import { SignInForm } from "../authentication/components/sign-in-form";
import { getProviders } from "../authentication/session";
import { AnimationLayout } from "../components/layout";

export const useAuthenication = <P,>(
  getServerSideProps: GetServerSideProps<P>
): GetServerSideProps<P> => async (context) => {
  const session = await getSession(context);

  if (session) {
    return getServerSideProps(context);
  } else {
    context.res.writeHead(301, {
      destination: "http://localhost:3000/sign-in",
    });

    context.res.end();

    return getServerSideProps(context);
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
            <Image width="150px" height="150px" src="/logo-dark.svg" />
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
