import { useQuery } from "react-query";
import { User } from "../contracts";

const getSession = async () => {
  const response = await fetch("/api/session", {
    method: "GET",
  });

  const data = await response.json();

  const user = User(data);

  return user;
};

const SessionQueryKey = () => {
  return ["session"];
};

export const useQuerySession = () => {
  return useQuery(SessionQueryKey(), getSession);
};
