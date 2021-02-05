import {
  EmailAddress,
  IEmailAddress,
  IUrl,
  IUuid,
  Url,
  Uuid,
} from "../../../shared";

export type IUserDisplayName = string & { type: "UserDisplayName" };

const validateUserDisplayName = (displayName: string) => {
  const errors = [];

  if (typeof displayName !== "string") {
    errors.push(new Error("Display name is not a string"));
  }

  if (displayName.trim().length <= 0) {
    errors.push(new Error("Display name is too short"));
  }

  if (displayName.trim().length === 1000) {
    errors.push(new Error("Display name is too long"));
  }

  return errors;
};

const UserDisplayName = (displayName: string) => {
  const errors = validateUserDisplayName(displayName);
  if (errors.length === 0) {
    return displayName as IUserDisplayName;
  }
  throw errors;
};

export type IUserId = IUuid & { UserId: "UserId" };

export const UserId = (userId?: string) => {
  return Uuid(userId) as IUserId;
};

export type IUser = {
  userId: IUserId;
  emailAddress?: IEmailAddress;
  imageUrl?: IUrl;
  displayName?: IUserDisplayName;
};

export const User = ({
  userId,
  emailAddress,
  imageUrl,
  displayName,
}: {
  userId?: string;
  emailAddress?: string;
  imageUrl?: string;
  displayName?: string;
}): IUser => {
  return {
    userId: UserId(userId),
    emailAddress: emailAddress ? EmailAddress(emailAddress) : undefined,
    imageUrl: imageUrl ? Url(imageUrl) : undefined,
    displayName: displayName ? UserDisplayName(displayName) : undefined,
  };
};

export type IUserStore = {
  findOne({ where }: { where: Partial<IUser> }): Promise<IUser | null>;
  add(user: IUser): Promise<void>;
  remove({ where }: { where?: Partial<IUser> }): Promise<void>;
};
