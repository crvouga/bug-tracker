import { IProjectDescription } from "./contracts";

export const validateProjectDescription = (projectDescription: string) => {
  const errors = [];

  if (typeof projectDescription !== "string") {
    errors.push(new Error("Project description must be a string"));
  }

  if (projectDescription.trim().length === 0) {
    errors.push(new Error("Project description is too short"));
  }

  if (projectDescription.trim().length === 1000) {
    errors.push(new Error("Project description is too long"));
  }

  return errors;
};

export const ProjectDescription = (projectDescription: string) => {
  const errors = validateProjectDescription(projectDescription);

  if (errors.length === 0) {
    return projectDescription as IProjectDescription;
  }

  throw new Error(errors.toString());
};
