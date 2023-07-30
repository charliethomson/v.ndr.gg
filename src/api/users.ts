import { useUser } from "@clerk/clerk-react";
import { supabase } from "./supabase";

type User = NonNullable<ReturnType<typeof useUser>["user"]>;
export const createUser = (user: User) => {
  supabase
    .from("users")
    .upsert({
      uid: user.id,
      fullName: user.fullName,
    })
    .then((r) => console.log(r));
};
