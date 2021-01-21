import { Box, Container, List, Typography } from "@material-ui/core";
import { GetServerSideProps } from "next";
import React from "react";
import { signIn, getProviders } from "../../authentication/components/session";
import { SocialSignInButton } from "../../authentication/components/social-sign-in";
import { Layout } from "../../components/layout";
import { LogoAvatar } from "../../components/logo";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      providers: await getProviders(),
    },
  };
};

export type ISignInProps = {
  providers: {
    id: string;
    name: string;
  }[];
};

const SignIn = (props: ISignInProps) => {
  const { providers } = props;

  return (
    <Layout>
      <Container maxWidth="sm">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          paddingY={4}
        >
          <Box p={2}>
            <LogoAvatar />
          </Box>

          <Box paddingBottom={2}>
            <Typography align="center" variant="h5">
              Welcome to Bug Tracker
            </Typography>
          </Box>

          <List>
            {Object.values(providers).map((provider) => (
              <SocialSignInButton
                key={provider.id}
                provider={provider}
                onClick={() => {
                  signIn(provider.id, {
                    callbackUrl: "/",
                  });
                }}
              />
            ))}
          </List>
        </Box>
      </Container>
    </Layout>
  );
};

export default SignIn;
