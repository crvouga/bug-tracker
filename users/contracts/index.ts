import { IEmailAddress } from "../../utility/email-address";
import { IUrl } from "../../utility/url";

export type IUserId = string & { UserId: "UserId" };

export type IName = string & { IName: "IName" };

export type IUserDto = {
  userId: IUserId;
  name: IName;
  emailAddress: IEmailAddress;
  image: IUrl;
};
