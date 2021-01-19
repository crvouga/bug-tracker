import { Container } from "@material-ui/core";
import React from "react";
import { SignInForm } from "../components/authentication/sign-in-form";
import { useRouter } from "next/router";

const SignUp = () => {
  const router = useRouter();

  const handleSignUp = () => {
    router.push("/sign-up");
  };

  const handleForgotPassword = () => {
    router.push("/forgot-password");
  };

  return (
    <Container maxWidth="sm">
      <SignInForm
        onSignUp={handleSignUp}
        onForgotPassword={handleForgotPassword}
      />
    </Container>
  );
};

export default SignUp;
