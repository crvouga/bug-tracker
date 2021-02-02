import Typography from "@material-ui/core/Typography";
import { GetServerSideProps } from "next";
import React from "react";
import { Layout } from "../components/layout";
import { getProtectedRouteProps } from "./api/auth/[...nextauth]";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const props = await getProtectedRouteProps(context);

  return {
    ...props,
  };
};

const Index = () => {
  return (
    <Layout title="Home">
      <Typography variant="h1" color="initial"></Typography>
    </Layout>
  );
};

export default Index;
