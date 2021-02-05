import React, { useState } from "react";
import { postCommand } from "../../pages/api/command";
import { getFormDataValue } from "../../shared";

import { validateProjectName } from "../../server/projects/domain";
import {
  ICreateProjectForm,
  ICreateProjectFormData,
  ICreateProjectFormErrors,
} from "./contracts";
import { CreateProjectCommand } from "../../server/projects/write/project-commands";
import { getSession } from "../users/user-session";

export const validateCreateProjectForm = ({
  projectName,
  projectDescription,
}: {
  projectName: string;
  projectDescription: string;
}) => {
  return {
    projectName: validateProjectName(projectName),
    projectDescription: validateProjectName(projectDescription),
  };
};

export const getCreateProjectFormData = (
  event: React.FormEvent<HTMLFormElement>
): ICreateProjectFormData => {
  const form = event.currentTarget;
  const formData = new FormData(form);

  return {
    projectName: getFormDataValue(formData, "projectName"),
    projectDescription: getFormDataValue(formData, "projectDescription"),
  };
};

export const useCreateProjectForm = (): ICreateProjectForm => {
  const [errors, setErrors] = useState<ICreateProjectFormErrors>({
    projectName: [],
    projectDescription: [],
  });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = getCreateProjectFormData(event);
    const errors = validateCreateProjectForm(formData);

    if (errors.projectName.length > 0 || errors.projectDescription.length > 0) {
      setErrors(errors);
      return;
    }

    const user = await getSession();

    const userId = user.userId;

    const createProjectCommand = CreateProjectCommand({
      userId,
      projectName: formData.projectName,
      projectDescription: formData.projectDescription,
    });

    await postCommand(createProjectCommand);

    // event.currentTarget.reset();
  };

  const clearError = (key: string) => {
    setErrors((errors) => ({
      ...errors,
      [key]: [],
    }));
  };

  return {
    onSubmit,
    errors,
    clearError,
  };
};
