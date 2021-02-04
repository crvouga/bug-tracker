import { Uuid } from "../../shared";
import { IProjectId } from "./contracts";

export const ProjectId = (projectId?: string) => {
  return Uuid(projectId) as IProjectId;
};
