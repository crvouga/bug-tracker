import { Container } from "@material-ui/core";
import React from "react";
import {
  ISignInData,
  SignInPasswordForm,
} from "../components/authentication/sign-in-password-form";
import { Layout } from "../components/layout";

const SignIn = () => {
  const handleSubmit = (data: ISignInData) => {
    console.log(data);
  };

  return (
    <Layout>
      <Container maxWidth="sm">
        <SignInPasswordForm
          onSubmit={handleSubmit}
          signUpHref="/sign-up"
          forgotPasswordHref="/forgot-password"
        />
      </Container>
    </Layout>
  );
};

export default SignIn;
