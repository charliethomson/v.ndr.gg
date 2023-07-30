import { createSession, createShim, s } from "@charliethomson/better-session";
import moment from "moment";

export const session = createSession({
  lastVoteTime: s.custom(
    "vote-lasttime",
    createShim(moment, (m) => m.toISOString())
  ),
});
