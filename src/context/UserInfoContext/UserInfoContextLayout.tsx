import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Outlet } from "react-router";
import { useSession } from "../AuthContext";
import { getUserInfo, updateUserField } from "../../db/user";
import { PostgrestError } from "@supabase/supabase-js";

type UserInfo = {
  id: string;
  firstName: string;
  lastName: string;
};

type UserObject = {
  userInfo: UserInfo | null;
  updateUserInfoProperty: <K extends keyof UserInfo>(property: K, newValue: UserInfo[K]) => Promise<PostgrestError | null>;
};

type UserObjectStatus = UserObject | "NoSession" | "NoContext";

const UserObjectContext = createContext<UserObjectStatus>("NoContext");

const UserObjectStatusProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const session = useSession();
  const [userObjectStatus, setUserObjectStatus] =
    useState<UserObjectStatus>("NoSession");

  const updateObjectStatus = () => {
    if (session) {
      getUserInfo(session.user.id).then((response) => {
        setUserObjectStatus(
          response
            ? { userInfo: response, updateUserInfoProperty }
            : { userInfo: null, updateUserInfoProperty }
        );
      });
    } else {
      setUserObjectStatus("NoSession");
    }
  } 

  useEffect(() => {
    updateObjectStatus()
  }, [session]);

  // It needs to be called on both conditions. Otherwise on reloads does not work.
  useEffect(() => {
    updateObjectStatus()
  })

  // Seems like session is updated when you send a update petition and thus there is no need to update UserInfo manually.
  const updateUserInfoProperty = async <K extends keyof UserInfo>(
    property: K,
    newValue: UserInfo[K]
  ) => {
    if (userObjectStatus === "NoSession") {
      throw Error("Calling update with no session");
    }
    // Session will always exist if userInfo is not "NoSession"
    return updateUserField(session!.user.id, property, newValue);
  };

  return (
    <UserObjectContext.Provider value={userObjectStatus}>
      {children}
    </UserObjectContext.Provider>
  );
};

const useUserObject = () => {
  const context = useContext(UserObjectContext);
  if (context === "NoContext") {
    throw new Error("useUserInfo must be used within a UserInfoProvider");
  }
  return context;
};

const UserObjectContextLayout = () => {
  return (
    <UserObjectStatusProvider>
      <Outlet />
    </UserObjectStatusProvider>
  );
};

export { UserObjectStatusProvider, UserObjectContextLayout, useUserObject, type UserInfo };
