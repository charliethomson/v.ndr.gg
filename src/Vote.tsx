import { FC, useEffect, useState } from "react";
import { voteLinks } from "./voteLinks";
import { useStore } from "./store";
import moment from "moment";

export const Vote: FC = () => {
  const { auth, lastVote, setLastVote, setLastVoteFromSupabase } = useStore();

  useEffect(() => {
    if (!auth?.isSignedIn) return;

    setLastVoteFromSupabase();
  }, [auth, setLastVoteFromSupabase]);

  const openVoteTabs = () => {
    setLastVote();
    voteLinks.forEach((link) => window.open(link, "_blank"));
  };
  const [timeUntilNextVote, setTimeUntilNextVote] = useState<null | string>(
    null
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (!lastVote) {
        setTimeUntilNextVote(null);
        return;
      }

      const exp = moment.utc(lastVote).add(1, "day");
      if (exp.isBefore(moment.utc())) {
        setTimeUntilNextVote(null);
        return;
      }

      const dt = exp.diff(moment.utc());
      setTimeUntilNextVote(moment.utc(dt).format("HH:mm:ss"));
    }, 100);

    return () => clearInterval(interval);
  }, [lastVote]);

  return (
    <div className="flex items-center justify-center flex-grow bg-slate-700">
      <div className="flex flex-col items-center gap-4 font-mono">
        {timeUntilNextVote && lastVote ? (
          <p
            className="text-xl text-slate-400"
            title={`Next vote at ${moment(lastVote)
              .add(24, "hours")
              .toString()}`}
          >
            Next vote in {timeUntilNextVote}
          </p>
        ) : null}
        <button
          onClick={openVoteTabs}
          className={
            "text-6xl font-bold uppercase text-slate-200 " +
            (timeUntilNextVote ? " text-slate-400" : "")
          }
        >
          vote
        </button>
      </div>
    </div>
  );
};
