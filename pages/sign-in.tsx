import { Container } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";
import {
  SignInPasswordForm,
  ISignInData,
} from "../components/authentication/sign-in-password-form";
import { Layout } from "../components/layout";

const SignUp = () => {
  const router = useRouter();

  const handleSignUp = () => {
    router.push("/sign-up");
  };

  const handleForgotPassword = () => {
    router.push("/forgot-password");
  };

  const handleSubmit = (data: ISignInData) => {
    console.log(data);
  };

  return (
    <Layout>
      <Container disableGutters maxWidth="sm">
        <SignInPasswordForm
          onSubmit={handleSubmit}
          onSignUp={handleSignUp}
          onForgotPassword={handleForgotPassword}
        />
      </Container>
    </Layout>
  );
};

export default SignUp;
