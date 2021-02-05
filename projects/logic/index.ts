import {
  ICreateProjectCommand,
  IDeleteProjectCommand,
  IProjectCommand,
  ProjectCommandType,
} from "../commands";
import { ProjectId } from "../domain";
import {
  ProjectCreatedEvent,
  ProjectDeletedEvent,
  projectEventReducer,
} from "../events";
import { IProjectEventStore } from "../store/contracts";

export const HandleCreateProject = ({
  projectEventStore,
}: {
  projectEventStore: IProjectEventStore;
}) => {
  return async (command: ICreateProjectCommand) => {
    const { userId, projectDescription, projectName } = command.payload;

    const projectId = ProjectId();

    const projectCreatedEvent = ProjectCreatedEvent({
      adminId: userId,
      projectId,
      projectDescription,
      projectName,
    });

    await projectEventStore.publish(projectCreatedEvent);
  };
};

export const HandleDeleteProject = ({
  projectEventStore,
}: {
  projectEventStore: IProjectEventStore;
}) => {
  return async (command: IDeleteProjectCommand) => {
    const { userId, projectId } = command.payload;

    const project = await projectEventStore.reduce(
      projectEventReducer,
      null,
      projectId
    );

    if (!project) {
      throw new Error("Project does not exists.");
    }

    if (project.adminId !== userId) {
      throw new Error("User is not allowed to delete project.");
    }

    const projectDeletedEvent = ProjectDeletedEvent({
      userId,
      projectId,
    });

    await projectEventStore.publish(projectDeletedEvent);
  };
};

export const HandleProjectCommand = (dependencies: {
  projectEventStore: IProjectEventStore;
}) => {
  return (command: IProjectCommand) => {
    switch (command.type) {
      case ProjectCommandType.CreateProject:
        return HandleCreateProject(dependencies)(command);

      case ProjectCommandType.DeleteProject:
        return HandleDeleteProject(dependencies)(command);
    }
  };
};
