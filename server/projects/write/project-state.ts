import {
  IProjectAdminId,
  IProjectDescription,
  IProjectId,
  IProjectName,
  ProjectAdminId,
  ProjectDescription,
  ProjectId,
  ProjectName,
} from "../domain";
import { IProjectEvent } from "./contracts";
import { ProjectEventType } from "./project-events";

export type IProjectState = {
  projectId: IProjectId;
  projectAdminId: IProjectAdminId;
  projectName: IProjectName;
  projectDescription: IProjectDescription;
};

export const projectStateReducer = (
  project: IProjectState | null,
  event: IProjectEvent
) => {
  switch (event.type) {
    case ProjectEventType.ProjectCreated:
      return {
        projectAdminId: ProjectAdminId(event.payload.projectAdminId),
        projectId: ProjectId(event.payload.projectId),
        projectDescription: ProjectDescription(
          event.payload.projectDescription
        ),
        projectName: ProjectName(event.payload.projectName),
      };

    case ProjectEventType.ProjectDeleted:
      return null;

    default:
      return project;
  }
};
