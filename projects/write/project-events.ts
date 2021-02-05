import { IUserId } from "../../users/contracts";
import {
  IProjectAdminId,
  IProjectDescription,
  IProjectId,
  IProjectName,
} from "../domain";

export enum ProjectEventType {
  ProjectCreated = "bugtracker.event.project.created",
  ProjectDeleted = "bugtracker.event.project.deleted",
}

export type IProjectCreatedEvent = {
  type: ProjectEventType.ProjectCreated;
  aggergateId: string;
  payload: {
    projectId: IProjectId;
    projectAdminId: IProjectAdminId;
    projectName: IProjectName;
    projectDescription: IProjectDescription;
  };
};

export type IProjectDeletedEvent = {
  type: ProjectEventType.ProjectDeleted;
  aggergateId: string;
  payload: {
    projectId: IProjectId;
    userId: IUserId;
  };
};

export type IProjectEvent = IProjectCreatedEvent | IProjectDeletedEvent;

export const ProjectCreatedEvent = (payload: {
  projectAdminId: IProjectAdminId;
  projectId: IProjectId;
  projectName: IProjectName;
  projectDescription: IProjectDescription;
}): IProjectCreatedEvent => {
  return {
    type: ProjectEventType.ProjectCreated,
    aggergateId: payload.projectId,
    payload: payload,
  };
};

export const ProjectDeletedEvent = (payload: {
  userId: IUserId;
  projectId: IProjectId;
}): IProjectDeletedEvent => {
  return {
    type: ProjectEventType.ProjectDeleted,
    aggergateId: payload.projectId,
    payload: payload,
  };
};

export const ProjectEvent = (event: any): IProjectEvent => {
  switch (event.type) {
    case ProjectEventType.ProjectCreated:
      return ProjectCreatedEvent(event.payload);

    case ProjectEventType.ProjectDeleted:
      return ProjectDeletedEvent(event.payload);

    default:
      throw new Error("invalid project event");
  }
};

export type IProjectState = null | {
  projectId: IProjectId;
  projectAdminId: IProjectAdminId;
  projectName: IProjectName;
  projectDescription: IProjectDescription;
};

export const projectStateReducer = (
  project: IProjectState,
  event: IProjectEvent
) => {
  switch (event.type) {
    case ProjectEventType.ProjectCreated:
      return {
        projectAdminId: event.payload.projectAdminId,
        projectId: event.payload.projectId,
        projectDescription: event.payload.projectDescription,
        projectName: event.payload.projectName,
      };

    case ProjectEventType.ProjectDeleted:
      return null;

    default:
      return project;
  }
};
