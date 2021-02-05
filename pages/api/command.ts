import { NextApiHandler } from "next";
import { appDev } from "../../server/app";
import { IAppCommand } from "../../server/app/contracts";

export const postCommand = async (command: IAppCommand) => {
  await fetch("/api/command", {
    method: "POST",
    body: JSON.stringify(command),
  });
};

export const handler: NextApiHandler = async (req, res) => {
  const command = JSON.parse(req.body) as IAppCommand;

  const errors = await appDev.runCommand(command);

  if (errors.length > 0) {
    return res.status(401).json(errors);
  }

  return res.status(200).json({});
};

export default handler;
