import { IUserId, UserId } from "../../auth/user/contracts";

export type IProjectAdminId = IUserId & { ProjectAdminId: "ProjectAdminId" };
export const ProjectAdminId = (id: string) => {
  return UserId(id) as IProjectAdminId;
};
