import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";
import { App } from "../../app/app";
import { Token } from "../../shared";

const app = App();

const handler: NextApiHandler = async (req, res) => {
  const nextAuthSession = await getSession({ req });

  if (!nextAuthSession) {
    return res.status(401).end();
  }

  const accessToken = nextAuthSession.accessToken
    ? Token(nextAuthSession.accessToken)
    : undefined;

  const session = await app.read.session.findOne({
    where: {
      accessToken,
    },
  });

  if (!session) {
    return res.status(401).end();
  }

  const user = await app.read.user.findOne({
    where: {
      userId: session.userId,
    },
  });

  return res.status(200).json(user);
};

export default handler;
