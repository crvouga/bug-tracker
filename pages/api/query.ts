import { NextApiHandler } from "next";
import { useQuery } from "react-query";
import { appDev } from "../../server/app";
import { IAppQuery, IAppQueryResponse } from "../../server/app/contracts";

export const postQuery = async (query: IAppQuery) => {
  const response = await fetch("/api/query", {
    method: "POST",
    body: JSON.stringify(query),
  });

  const json = await response.json();

  const queryResponse = json as IAppQueryResponse;

  return queryResponse;
};

export const useAppQuery = (query: IAppQuery) => {
  return useQuery(JSON.stringify(query), () => postQuery(query));
};

export const handler: NextApiHandler = async (req, res) => {
  const query = JSON.parse(req.body) as IAppQuery;

  const result = await appDev.runQuery(query);

  return res.json(result);
};

export default handler;
