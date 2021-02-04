import { NextApiHandler } from "next";
import { App } from "../../app/app";

const app = App();

export const handler: NextApiHandler = async (req, res) => {
  const query = req.query;

  const result = await app.query.run(query);

  return res.json(result);
};

export default handler;
