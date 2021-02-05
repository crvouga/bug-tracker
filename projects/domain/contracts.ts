import { IUserId } from "../../users/contracts";
import { IUuid } from "../../shared";

export type IProjectName = string & { ProjectName: "ProjectName" };
export type IProjectId = IUuid & { ProjectId: "ProjectId" };
export type IProjectDescription = string & {
  ProjectDescription: "ProjectDescription";
};
export type IProject = {
  adminId: IUserId;
  projectId: IProjectId;
  projectName: IProjectName;
  projectDescription: IProjectDescription;
};
