export type IEmailAddress = string & { EmailAddress: "EmailAddress" };
export const EmailAddress = (emailAddress: string) =>
  emailAddress as IEmailAddress;
