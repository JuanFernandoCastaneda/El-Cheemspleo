import { UserInfo } from "../context/UserInfoContext/UserInfoContextLayout";
import { supabaseClient } from "./supabase";

const dbEquivalence = {
  id: "id",
  firstName: "first_name",
  lastName: "last_name",
} as const;

const getUserInfo = async (id: string): Promise<UserInfo | null> => {
  const { data } = await supabaseClient.from("User").select().eq("id", id);
  if (!data || data.length == 0) {
    return null;
  } else {
    const user = data[0];
    return {
      id: id,
      firstName: user.first_name,
      lastName: user.last_name,
    };
  }
};

const registerUser = async (
  id: string,
  firstName: string,
  lastName: string
) => {
  const { error } = await supabaseClient
    .from("User")
    .insert({ id: id, first_name: firstName, last_name: lastName });
  return error;
};

/**
 * @param id
 * @param field
 * @param newValue
 * @returns If it returns null, then there was an error
 */
const updateUserField = async <K extends keyof UserInfo>(
  id: string,
  field: K,
  newValue: UserInfo[K]
) => {
  if (!(field in dbEquivalence)) return null;
  const { error } = await supabaseClient
    .from("User")
    .update({ [dbEquivalence[field]]: newValue })
    .eq("id", id)
    .select();
  return error;
};

export { getUserInfo, registerUser, updateUserField };
