import { Container } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";
import {
  ISignUpData,
  SignUpForm,
} from "../components/authentication/sign-up-form";

const SignIn = () => {
  const router = useRouter();

  const handleSignIn = () => {
    router.push("/sign-in");
  };

  const handleSignUp = (data: ISignUpData) => {
    console.log(data);
  };

  return (
    <Container maxWidth="sm">
      <SignUpForm onSubmit={handleSignUp} onSignIn={handleSignIn} />
    </Container>
  );
};

export default SignIn;
