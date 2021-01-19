import { Container } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";
import {
  ISignUpData,
  SignUpPasswordForm,
} from "../components/authentication/sign-up-password-form";
import { Layout } from "../components/layout";

const SignIn = () => {
  const router = useRouter();

  const handleSignIn = () => {
    router.push("/sign-in");
  };

  const handleSignUp = (data: ISignUpData) => {
    console.log(data);
  };

  return (
    <Layout>
      <Container disableGutters maxWidth="sm">
        <SignUpPasswordForm onSubmit={handleSignUp} onSignIn={handleSignIn} />
      </Container>
    </Layout>
  );
};

export default SignIn;
