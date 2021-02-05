export type IProjectName = string & { ProjectName: "ProjectName" };

export const validateProjectName = (projectName: string) => {
  const errors = [];

  if (typeof projectName !== "string") {
    errors.push(new Error("Project name must be a string"));
  }

  if (projectName.trim().length === 0) {
    errors.push(new Error("Project name is too short"));
  }

  if (projectName.trim().length === 1000) {
    errors.push(new Error("Project name is too long"));
  }

  return errors;
};

export const ProjectName = (projectName: string) => {
  const errors = validateProjectName(projectName);
  if (errors.length === 0) {
    return projectName as IProjectName;
  }
  throw new Error(errors.toString());
};
