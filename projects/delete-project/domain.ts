import { UserId } from "../../users/contracts";
import { ProjectId } from "../domain";
import { IDeleteProjectCommand } from "./contracts";

export * from "./contracts";

export const DeleteProjectCommand = ({
  projectId,
  userId,
}: {
  projectId: string;
  userId: string;
}): IDeleteProjectCommand => {
  return {
    type: "[COMMAND][PROJECT][DELETE]",
    payload: {
      userId: UserId(userId),
      projectId: ProjectId(projectId),
    },
  };
};
