import { ProjectId } from "../domain";
import { ICreateProjectCommand } from "./contracts";
import { ProjectCreatedEvent } from "./domain";

export type IDependencies = {
  projectEventsRepository: any;
};

export const CreateProjectLogic = ({
  projectEventsRepository,
}: IDependencies) => async (command: ICreateProjectCommand) => {
  const { projectDescription, projectName } = command.payload;

  const projectId = ProjectId();

  const projectCreatedEvent = ProjectCreatedEvent({
    projectId,
    projectDescription,
    projectName,
  });

  await projectEventsRepository.append(projectCreatedEvent);
};
