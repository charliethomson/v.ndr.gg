import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  useUser,
  useAuth,
} from "@clerk/clerk-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useEffect } from "react";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { useStore } from "./store";

export const SignIn: FC = () => {
  const { getToken } = useAuth();
  const auth = useUser();
  const { auth: storedAuth, setAuth } = useStore();

  useEffect(() => {
    if (!auth?.isSignedIn) return;
    if (storedAuth) return;
    setAuth(auth);
  }, [auth, getToken, setAuth, storedAuth]);

  return (
    <div className="flex justify-end w-screen px-4 py-2 bg-slate-800 text-slate-100">
      <div className="flex items-end gap-4">
        <SignedIn>
          {auth.isSignedIn ? (
            <p className="text-sm text-slate-300">
              Signed in as&nbsp;
              <span>{auth.user.fullName}</span>
            </p>
          ) : (
            <p>This shouldnt happen</p>
          )}
          <SignOutButton>
            <button className="bg-[#da373c] px-4 py-2 rounded">Sign out</button>
          </SignOutButton>
        </SignedIn>
      </div>
      <SignedOut>
        <SignInButton mode="modal">
          <button className="flex gap-2 items-center bg-[#5865f2] px-4 py-2 rounded">
            <FontAwesomeIcon icon={faDiscord} />
            Sign in with Discord
          </button>
        </SignInButton>
      </SignedOut>
    </div>
  );
};
