import Typography from "@material-ui/core/Typography";
import { GetServerSideProps } from "next";
import { LayoutPage } from "../components/layout.page";
import { getProtectedRouteProps } from "./api/auth/[...nextauth]";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const props = await getProtectedRouteProps(context);

  return {
    ...props,
  };
};

const Dashboard = () => {
  return (
    <LayoutPage title="Dashboard">
      <Typography variant="h1" color="initial"></Typography>
    </LayoutPage>
  );
};

export default Dashboard;
