import { IUserId } from "../../users/contracts";
import { IProjectDescription, IProjectId, IProjectName } from "../domain";

export enum ProjectCommandType {
  CreateProject = "bugtracker.command.project.create",
  DeleteProject = "bugtracker.command.project.delete",
}

export type ICreateProjectCommand = {
  type: ProjectCommandType.CreateProject;
  payload: {
    userId: IUserId;
    projectName: IProjectName;
    projectDescription: IProjectDescription;
  };
};

export type IDeleteProjectCommand = {
  type: ProjectCommandType.DeleteProject;
  payload: {
    projectId: IProjectId;
    userId: IUserId;
  };
};

export type IProjectCommand = ICreateProjectCommand | IDeleteProjectCommand;

export enum ProjectEventType {
  ProjectCreated = "bugtracker.event.project.created",
  ProjectDeleted = "bugtracker.event.project.deleted",
}

export type IProjectCreatedEvent = {
  type: ProjectEventType.ProjectCreated;
  aggergateId: string;
  payload: {
    adminId: IUserId;
    projectId: IProjectId;
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
