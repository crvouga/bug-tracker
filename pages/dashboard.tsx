import { useSession } from "next-auth/client";

const Dashboard = () => {
  const [session, isLoading] = useSession();

  if (isLoading) {
    return "loading...";
  }
  return <div>{JSON.stringify(session)}</div>;
};

export default Dashboard;
