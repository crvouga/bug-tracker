import Typography from "@material-ui/core/Typography";
import { GetServerSideProps } from "next";
import { Layout } from "../components/layout";
import { getProtectedRouteProps } from "../users/auth/utility";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const props = await getProtectedRouteProps(context);
  return {
    ...props,
  };
};

const Dashboard = () => {
  return (
    <Layout title="Dashboard">
      <Typography variant="h1" color="initial">
        Dashboard
      </Typography>
    </Layout>
  );
};

export default Dashboard;
