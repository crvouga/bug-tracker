import { CreateProjectCommand } from "../projects/create-project/domain";
import { DeleteProjectCommand } from "../projects/delete-project/domain";

enum CommandTypes {
  CreateProject = "CreateProject",
  DeleteProject = "DeleteProject",
}

export const Command = (command: any) => {
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
