import { ILogger } from "../../app/logging/contracts";
import { UserId } from "../../auth/user/contracts";
import {
  IProjectId,
  ProjectAdminId,
  ProjectDescription,
  ProjectId,
  ProjectName,
} from "../domain";
import {
  ICreateProjectCommand,
  IDeleteProjectCommand,
  IProjectCommand,
  ProjectCommandType,
} from "./contracts";
import { IProjectEventStore } from "./project-event-store";
import {
  ProjectCreatedEvent,
  ProjectDeletedEvent,
  projectStateReducer,
} from "./project-events";

enum ProjectCommandErrors {
  ProjectDoesNotExists = "ProjectDoesNotExists",
  NotAllowedToDelete = "NotAllowedToDelete",
}

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

        await projectEventStore.publish(projectId, projectCreatedEvent);

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
          return [new Error(ProjectCommandErrors.ProjectDoesNotExists)];
        }

        if (projectState.projectAdminId !== userId) {
          return [new Error(ProjectCommandErrors.NotAllowedToDelete)];
        }

        const projectDeletedEvent = ProjectDeletedEvent({
          userId,
          projectId,
        });

        await projectEventStore.publish(projectId, projectDeletedEvent);

        return [];
      }
    }
  };
};
