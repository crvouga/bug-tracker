import { Container } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";
import { ForgotPasswordForm } from "../components/authentication/forgot-password-form";

const ForgotPassword = () => {
  const router = useRouter();

  const handleSignIn = () => {
    router.push("/sign-in");
  };

  return (
    <Container maxWidth="sm">
      <ForgotPasswordForm onSignIn={handleSignIn} />
    </Container>
  );
};

export default ForgotPassword;
