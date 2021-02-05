export type ICreateProjectFormData = {
  projectName: string;
  projectDescription: string;
};

export type ICreateProjectFormErrors = {
  projectName: Error[];
  projectDescription: Error[];
};

export type ICreateProjectForm = {
  onSubmit: (formData: React.FormEvent<HTMLFormElement>) => void;
  errors: ICreateProjectFormErrors;
};
