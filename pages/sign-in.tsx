import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { GetServerSideProps } from "next";
import { getProviders, SessionProvider } from "next-auth/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AnimationLayout } from "../components/layout";
import { SignInForm } from "../users/auth/components/sign-in-form";

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
          <Link href="/">
            <Box paddingBottom={2}>
              <Image
                alt="bug tracker logo"
                width="150px"
                height="150px"
                src="/logo-dark.svg"
              />
            </Box>
          </Link>

          <Box paddingBottom={2}>
            <Typography align="center" variant="h3">
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
