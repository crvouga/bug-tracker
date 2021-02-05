import { IUuid, Uuid } from "../../shared";

export type IProjectId = IUuid & { ProjectId: "ProjectId" };
export const ProjectId = (projectId?: string) => {
  return Uuid(projectId) as IProjectId;
};
