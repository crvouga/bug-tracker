import { Token, ITimestamp, IToken, Timestamp } from "../../shared";

export type IVerificationRequest = {
  identifier: string;
  hashedToken: IToken;
  expires: ITimestamp;
};

export const VerificationRequest = ({
  identifier,
  hashedToken,
  expires,
}: {
  identifier: string;
  hashedToken: any;
  expires: any;
}): IVerificationRequest => {
  return {
    identifier,
    hashedToken: Token(hashedToken),
    expires: Timestamp(expires),
  };
};

export const isVerifcationRequestExpired = (
  verificationRequest: IVerificationRequest
) => {
  return verificationRequest.expires < Timestamp();
};

export type IVerifcationRequestWriteStore = {
  add(verificationRequest: IVerificationRequest): Promise<void>;
  remove({ where }: { where?: { hashedToken: IToken } }): Promise<void>;
};

export type IVerificationRequestReadStore = {
  findOne({
    where,
  }: {
    where?: { hashedToken: IToken };
  }): Promise<IVerificationRequest | null>;
};
