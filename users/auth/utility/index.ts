import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";

export const getProtectedRouteProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      props: {},
    };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/sign-in",
      },
    };
  }
};
