import { Container } from "@material-ui/core";
import React from "react";
import { ForgotPasswordForm } from "../src/components/authentication/forgot-password-form";
import { Layout } from "../src/components/layout";

const ForgotPassword = () => {
  return (
    <Layout>
      <Container maxWidth="sm">
        <ForgotPasswordForm signInHref="/sign-in" />
      </Container>
    </Layout>
  );
};

export default ForgotPassword;
