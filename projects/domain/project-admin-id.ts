import { IUserId, UserId } from "../../users/contracts";

export type IProjectAdminId = IUserId & { ProjectAdminId: "ProjectAdminId" };
export const ProjectAdminId = (id: string) => {
  return UserId(id) as IProjectAdminId;
};
