import crypto from "crypto";
export type IToken = string & { Token: "Token" };

export const Token = (token: string) => {
  return token as IToken;
};

export const createRandomToken = () => {
  return Token(crypto.randomBytes(32).toString());
};

export const createHashToken = (string: string): IToken => {
  return Token(crypto.createHash("sha256").update(string).digest("hex"));
};
