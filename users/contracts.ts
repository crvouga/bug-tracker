import { IAccountId } from "../auth/account/contracts";
import { IEmailAddress, IUrl, IUuid } from "../shared";

export type IUserDisplayName = string & { type: "UserDisplayName" };

export type IUserId = IUuid & { UserId: "UserId" };

export type IUser = {
  userId: IUserId;
  emailAddress: IEmailAddress;
  imageUrl: IUrl;
  displayName?: IUserDisplayName;
};

export type IUserReadStore = {
  findOne({
    where,
  }: {
    where: {
      userId?: IUserId;
      emailAddress?: IEmailAddress;
      accountId?: IAccountId;
    };
  }): Promise<IUser | null>;
};

export type IUserWriteStore = {
  add(user: IUser): Promise<void>;
  remove(userId: IUserId): Promise<void>;
};
