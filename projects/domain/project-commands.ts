import { CreateProjectCommand } from "../create-project/domain";
import { DeleteProjectCommand } from "../delete-project/domain";

enum CommandTypes {
  CreateProject = "CreateProject",
  DeleteProject = "DeleteProject",
}

export const ProjectCommand = (command: any) => {
  if ("type" in command && "payload" in command) {
    switch (command.type) {
      case CommandTypes.CreateProject:
        return CreateProjectCommand(command.payload);

      case CommandTypes.DeleteProject:
        return DeleteProjectCommand(command.payload);
    }
  }
  throw new Error("failed to cast command");
};
