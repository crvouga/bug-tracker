import { NextApiRequest, NextApiResponse } from "next";
import { people } from "../../../data";

export default function handler(_1: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(people);
}
