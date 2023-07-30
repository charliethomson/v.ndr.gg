import moment from "moment";
import { supabase } from "./supabase";

export const createVote = (uid: string) => {
  const created_at = moment.utc().toISOString();
  const expires_at = moment.utc().add(1, "day").toISOString();
  supabase
    .from("votes")
    .insert({
      created_at,
      expires_at,
      uid,
    })
    .then((res) => console.log(res));
};

export const getMostRecentVote = (uid: string) => {
  return supabase
    .from("votes")
    .select("*")
    .filter("uid", "eq", uid)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
};
