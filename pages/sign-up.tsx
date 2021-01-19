import { Container } from "@material-ui/core";
import React from "react";
import {
  ISignUpData,
  SignUpPasswordForm,
} from "../components/authentication/sign-up-password-form";
import { Layout } from "../components/layout";

const SignIn = () => {
  const handleSignUp = (data: ISignUpData) => {
    console.log(data);
  };

  return (
    <Layout>
      <Container maxWidth="sm">
        <SignUpPasswordForm onSubmit={handleSignUp} signInHref="/sign-in" />
      </Container>
    </Layout>
  );
};

export default SignIn;
