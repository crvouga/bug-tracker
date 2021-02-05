import { IUserId, UserId } from "../../users/contracts";
import {
  IProjectDescription,
  IProjectId,
  IProjectName,
} from "../domain/contracts";
import { ProjectDescription } from "../domain/project-description";
import { ProjectId } from "../domain/project-id";
import { ProjectName } from "../domain/project-name";

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
  aggergateId: IProjectId;
  payload: {
    projectId: IProjectId;
    userId: IUserId;
  };
};

export type IProjectCommand = ICreateProjectCommand | IDeleteProjectCommand;

export const CreateProjectCommand = ({
  userId,
  projectName,
  projectDescription,
}: {
  userId: string;
  projectName: string;
  projectDescription: string;
}): ICreateProjectCommand => {
  return {
    type: ProjectCommandType.CreateProject,
    payload: {
      userId: UserId(userId),
      projectName: ProjectName(projectName),
      projectDescription: ProjectDescription(projectDescription),
    },
  };
};

export const DeleteProjectCommand = ({
  userId,
  projectId,
}: {
  userId: string;
  projectId: IProjectId;
}): IDeleteProjectCommand => {
  return {
    type: ProjectCommandType.DeleteProject,
    aggergateId: ProjectId(projectId),
    payload: {
      userId: UserId(userId),
      projectId: ProjectId(projectId),
    },
  };
};

export const ProjectCommand = (command: IProjectCommand): IProjectCommand => {
  switch (command.type) {
    case ProjectCommandType.CreateProject:
      return CreateProjectCommand(command.payload);

    case ProjectCommandType.DeleteProject:
      return DeleteProjectCommand(command.payload);

    default:
      throw new Error("Invalid project command");
  }
};
