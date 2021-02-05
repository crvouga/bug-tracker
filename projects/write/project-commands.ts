import {
  ICreateProjectCommand,
  IDeleteProjectCommand,
  IProjectCommand,
  ProjectCommandType,
} from "./contracts";
import { UserId } from "../../users/contracts";
import {
  IProjectId,
  ProjectAdminId,
  ProjectDescription,
  ProjectId,
  ProjectName,
} from "../domain";
import { IProjectEventStore } from "./project-event-store";
import {
  ProjectCreatedEvent,
  ProjectDeletedEvent,
  projectStateReducer,
} from "./project-events";
import { ILogger } from "../../app/logging/contracts";

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
    payload: {
      userId: UserId(userId),
      projectId: ProjectId(projectId),
    },
  };
};

export const ProjectCommand = (command: any): IProjectCommand => {
  switch (command.type) {
    case ProjectCommandType.CreateProject:
      return CreateProjectCommand(command.payload);

    case ProjectCommandType.DeleteProject:
      return DeleteProjectCommand(command.payload);

    default:
      throw new Error("Invalid project command");
  }
};

export const HandleProjectCommand = ({
  logger,
  projectEventStore,
}: {
  logger: ILogger;
  projectEventStore: IProjectEventStore;
}) => {
  return async (command: IProjectCommand): Promise<Error[]> => {
    logger.debug("[projects][commands]", command);

    switch (command.type) {
      case ProjectCommandType.CreateProject: {
        const { userId, projectDescription, projectName } = command.payload;

        const projectId = ProjectId();

        const projectAdminId = ProjectAdminId(userId);

        const projectCreatedEvent = ProjectCreatedEvent({
          projectAdminId,
          projectId,
          projectDescription,
          projectName,
        });

        await projectEventStore.publish(projectCreatedEvent);

        return [];
      }

      case ProjectCommandType.DeleteProject: {
        const { userId, projectId } = command.payload;

        const projectState = await projectEventStore.reduce(
          projectStateReducer,
          null,
          projectId
        );

        if (projectState === null) {
          return [new Error("Project does not exists.")];
        }

        if (projectState.projectAdminId !== userId) {
          return [new Error("User is not allowed to delete project.")];
        }

        const projectDeletedEvent = ProjectDeletedEvent({
          userId,
          projectId,
        });

        await projectEventStore.publish(projectDeletedEvent);

        return [];
      }
    }
  };
};
