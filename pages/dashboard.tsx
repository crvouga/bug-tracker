import { GetServerSideProps } from "next";
import { getSession, useSession } from "../authentication/components/session";

export const getServerSideProps: GetServerSideProps = async () => {
  const session = await getSession();

  if (!Boolean(session)) {
    return {
      redirect: "/auth/sign-in",
      props: {},
    };
  }

  return {
    props: {},
  };
};

const Dashboard = () => {
  const [session, isLoading] = useSession();

  if (isLoading) {
    return "loading...";
  }
  return <div>{JSON.stringify(session)}</div>;
};

export default Dashboard;
