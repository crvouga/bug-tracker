import { Box, Container, Typography, List } from "@material-ui/core";
import React from "react";
import { SocialSignInButton } from "../authentication/components/social-sign-in";
import { Layout } from "../components/layout";
import { LogoAvatar } from "../components/logo";
import { signin } from "next-auth/client";

const SignIn = () => {
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
            <SocialSignInButton
              provider="google"
              onClick={() => {
                signin("google", {
                  callbackUrl: "/dashboard",
                });
              }}
            />
            <SocialSignInButton provider="github" />
          </List>
        </Box>
      </Container>
    </Layout>
  );
};

export default SignIn;
