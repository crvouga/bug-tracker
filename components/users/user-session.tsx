import { useQuery } from "react-query";
import { User } from "../../server/auth/user/contracts";

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
