import { IForm, IFormDataErrors } from "../../shared";
import { IUserId } from "../../users/contracts";
import { IProjectDescription, IProjectId, IProjectName } from "../domain";

export type ICreateProjectFormData = {
  projectName: string;
  projectDescription: string;
};
export type ICreateProjectForm = IForm<ICreateProjectFormData>;
export type ICreateProjectFormErrors = IFormDataErrors<ICreateProjectFormData>;

export type ICreateProjectCommand = {
  type: "[COMMAND][PROJECT][CREATE]";
  payload: {
    adminId: IUserId;
    projectName: IProjectName;
    projectDescription: IProjectDescription;
  };
};

export type IProjectCreatedEvent = {
  type: "[EVENT][PROJECT][CREATED]";
  payload: {
    projectId: IProjectId;
    projectName: IProjectName;
    projectDescription: IProjectDescription;
  };
};
