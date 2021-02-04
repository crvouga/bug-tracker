import { IUserId } from "../../users/contracts";
import { IProjectId } from "../domain";

export type IDeleteProjectCommand = {
  type: "[COMMAND][PROJECT][DELETE]";
  payload: {
    userId: IUserId;
    projectId: IProjectId;
  };
};

export type IProjectDeletedEvent = {
  type: "[EVENT][PROJECT][CREATED]";
  payload: {
    userId: IUserId;
    projectId: IProjectId;
  };
};
