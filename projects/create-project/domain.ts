import { UserId } from "../../users/contracts";
import {
  IProjectDescription,
  IProjectId,
  IProjectName,
  ProjectDescription,
  ProjectName,
} from "../domain";
import { ICreateProjectCommand, IProjectCreatedEvent } from "./contracts";

export * from "./contracts";

export const CreateProjectCommand = ({
  adminId,
  projectName,
  projectDescription,
}: {
  adminId: string;
  projectName: string;
  projectDescription: string;
}): ICreateProjectCommand => {
  return {
    type: "[COMMAND][PROJECT][CREATE]",
    payload: {
      adminId: UserId(adminId),
      projectName: ProjectName(projectName),
      projectDescription: ProjectDescription(projectDescription),
    },
  };
};

export const ProjectCreatedEvent = ({
  projectId,
  projectName,
  projectDescription,
}: {
  projectId: IProjectId;
  projectName: IProjectName;
  projectDescription: IProjectDescription;
}): IProjectCreatedEvent => {
  return {
    type: "[EVENT][PROJECT][CREATED]",
    payload: {
      projectId,
      projectName,
      projectDescription,
    },
  };
};
