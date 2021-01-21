import { signIn } from "next-auth/client";
import { ISignUpPasswordFormProps } from "../components/sign-up-password-form";
import { IForgotPasswordFormProps } from "./forgot-password-form";
import { ISignInPasswordFormProps } from "./sign-in-password-form";

export const signUpPasswordFormProps: ISignUpPasswordFormProps = {
  signInHref: "/sign-in",
  onSubmit: (data) => {
    signIn("credentials", {
      ...data,
      callbackUrl: "/dashboard",
    });
  },
};

export const forgotPasswordFormProps: IForgotPasswordFormProps = {
  signInHref: "/sign-in",
  onSubmit: (data) => {
    console.log({ data });
  },
};

export const signInPasswordFormProps: ISignInPasswordFormProps = {
  forgotPasswordHref: "/forgot-password",
  signUpHref: "/sign-up",
  onSubmit: (data) => {
    signIn("credentials", {
      ...data,
      callbackUrl: "/dashboard",
    });
  },
};
