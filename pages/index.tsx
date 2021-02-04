import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { GetServerSideProps } from "next";
import React from "react";
import { Layout } from "../components/layout";
import {
  CreateProjectForm,
  useCreateProjectForm,
} from "../projects/create-project/components";
import { getProtectedRouteProps } from "./api/auth/[...nextauth]";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const props = await getProtectedRouteProps(context);

  return {
    ...props,
  };
};

const Index = () => {
  const form = useCreateProjectForm();

  return (
    <Layout title="Home">
      <Typography variant="h1" color="initial"></Typography>
      <Container disableGutters maxWidth="xs">
        <CreateProjectForm form={form} />
      </Container>
    </Layout>
  );
};

export default Index;
