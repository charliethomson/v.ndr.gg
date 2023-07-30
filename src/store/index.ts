import moment from "moment";
import { create } from "zustand";
import { useUser } from "@clerk/clerk-react";
import { createVote, getMostRecentVote } from "../api/votes";
import { createUser } from "../api/users";
import { session } from "../session";

type Store = {
  lastVote: moment.Moment | null;
  auth: ReturnType<typeof useUser> | null;

  setLastVote: () => void;
  setLastVoteFromSupabase: () => Promise<void>;
  setAuth: (auth: Store["auth"]) => void;
};

export const useStore = create<Store>((set, get) => ({
  lastVote: (() => {
    const l = session.lastVoteTime.get();
    if (!l) return null;
    return moment(l);
  })(),
  auth: null,
  setLastVote: () => {
    set({ lastVote: moment.utc() });

    const { auth } = get();
    console.log(auth);
    if (auth?.isSignedIn) createVote(auth.user.id);
    else session.lastVoteTime.set(moment.utc());
  },
  setLastVoteFromSupabase: async () => {
    const { auth } = get();
    if (!auth?.isSignedIn) return;

    const lastVote = (await getMostRecentVote(auth.user.id)).data?.created_at;
    if (!lastVote) return;
    set({
      lastVote: moment.utc(lastVote),
    });
  },
  setAuth: (auth: Store["auth"]) => {
    set({ auth });
    console.log(auth);
    if (!auth?.isSignedIn) return;

    createUser(auth.user);
  },
}));
