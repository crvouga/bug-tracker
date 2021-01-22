import Typography from "@material-ui/core/Typography";
import { GetServerSideProps } from "next";
import React from "react";
import { Layout } from "../components/layout";
import { getProtectedRouteProps } from "../users/authentication/api";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const props = await getProtectedRouteProps(context);

  return {
    ...props,
  };
};

const Index = () => {
  return (
    <Layout title="Bug Tracker">
      <Typography variant="h1" color="initial">
        index
      </Typography>
    </Layout>
  );
};

export default Index;
