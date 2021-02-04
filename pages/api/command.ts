import { NextApiHandler } from "next";
import { App } from "../../app/app";
import { ICommand, Command } from "../../shared";

const app = App();

export const postCommand = async <T extends string, P>(
  command: ICommand<T, P>
) => {
  await fetch("/api/command", {
    method: "POST",
    body: JSON.stringify(command),
  });
};

export const handler: NextApiHandler = async (req, res) => {
  const command = Command(req.body);

  const errors = await app.command.run(command);

  if (errors.length > 0) {
    return res.status(401).json(errors);
  }

  return res.status(200).json({});
};

export default handler;
