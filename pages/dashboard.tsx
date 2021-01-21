import { Layout } from "../components/layout";
import { Typography } from "@material-ui/core";
import { GetServerSideProps } from "next";
import { useAuthenication } from "./sign-in";

export const getServerSideProps: GetServerSideProps = useAuthenication(
  async () => {
    return {
      props: {},
    };
  }
);

const Dashboard = () => {
  return (
    <Layout title="Dashboard">
      <Typography>dashboard</Typography>
    </Layout>
  );
};

export default Dashboard;
