import {
  getSession as getNextAuthSession,
  Provider as NextAuthSessionProvider,
  signin as nextAuthSignIn,
  signout as nextAuthSignOut,
  useSession as useNextAuthSession,
  getProviders as getNextAuthProviders,
} from "next-auth/client";

export const useSession = () => {
  return useNextAuthSession();
};

export const signIn = nextAuthSignIn;

export const signOut = nextAuthSignOut;

export const getSession = getNextAuthSession;

export const getProviders = getNextAuthProviders;

export const SessionProvider = NextAuthSessionProvider;
