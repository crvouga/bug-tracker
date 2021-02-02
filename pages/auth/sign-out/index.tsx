import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { signOut } from "next-auth/client";
import { useRouter } from "next/router";
import React from "react";

export const SignOut = () => {
  const router = useRouter();
  return (
    <Dialog open>
      <DialogTitle>Sign Out?</DialogTitle>
      <DialogActions>
        <Button size="large" onClick={router.back}>
          Cancel
        </Button>
        <Button
          size="large"
          onClick={() => {
            signOut({ callbackUrl: "/auth/sign-in" });
          }}
        >
          Sign Out
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SignOut;
