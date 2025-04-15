import { UserInfo } from "../context/UserInfoContextLayout";
import { supabaseClient } from "./supabase";

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

export { getUserInfo, registerUser };
