import { Container } from "@material-ui/core";
import React from "react";
import { signInPasswordFormProps } from "../authentication/components/props";
import { SignInPasswordForm } from "../authentication/components/sign-in-password-form";
import { Layout } from "../components/layout";

const SignIn = () => {
  return (
    <Layout>
      <Container maxWidth="sm">
        <SignInPasswordForm {...signInPasswordFormProps} />
      </Container>
    </Layout>
  );
};

export default SignIn;
