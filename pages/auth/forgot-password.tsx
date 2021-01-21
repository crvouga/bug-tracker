import { Container } from "@material-ui/core";
import React from "react";
import { ForgotPasswordForm } from "../../authentication/components/forgot-password-form";
import { forgotPasswordFormProps } from "../../authentication/components/props";
import { Layout } from "../../components/layout";

const ForgotPassword = () => {
  return (
    <Layout>
      <Container maxWidth="sm">
        <ForgotPasswordForm {...forgotPasswordFormProps} />
      </Container>
    </Layout>
  );
};

export default ForgotPassword;
