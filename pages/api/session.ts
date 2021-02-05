import { NextApiHandler } from "next";
import { getSession as nextAuthGetSession } from "next-auth/client";
import { useQuery } from "react-query";
import { App } from "../../server/app/app";
import { User } from "../../server/auth/user/contracts";
import { Token } from "../../shared";

const app = App();

export const getSession = async () => {
  const response = await fetch("/api/session", {
    method: "GET",
  });

  const data = await response.json();

  const user = User(data);

  return user;
};

export const SessionQueryKey = () => {
  return ["session"];
};

export const useQuerySession = () => {
  return useQuery(SessionQueryKey(), getSession);
};

const handler: NextApiHandler = async (req, res) => {
  const nextAuthSession = await nextAuthGetSession({ req });

  if (!nextAuthSession) {
    return res.status(401).end();
  }

  const accessToken = nextAuthSession.accessToken
    ? Token(nextAuthSession.accessToken)
    : undefined;

  const session = await app.store.session.findOne({
    where: {
      accessToken,
    },
  });

  if (!session) {
    return res.status(401).end();
  }

  const user = await app.store.user.findOne({
    where: {
      userId: session.userId,
    },
  });

  return res.status(200).json(user);
};

export default handler;
