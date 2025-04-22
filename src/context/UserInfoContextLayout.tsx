import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Outlet } from "react-router";
import { useSession } from "./AuthContext";
import { getUserInfo, updateUserField } from "../db/user";

type UserInfo = {
  id: string;
  firstName: string;
  lastName: string;
};

type UserObject = {
  userInfo: UserInfo | null;
  updateUserInfoProperty: Function;
};

type UserObjectStatus = UserObject | "NoSession" | "NoContext";

const UserObjectContext = createContext<UserObjectStatus>("NoContext");

const UserInfoStatusProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const session = useSession();
  const [userObjectStatus, setUserObjectStatus] =
    useState<UserObjectStatus>("NoSession");

  useEffect(() => {
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
  }, [session]);

  const updateUserInfoProperty = async <K extends keyof UserInfo>(
    property: K,
    newValue: UserInfo[K]
  ) => {
    if (userObjectStatus === "NoSession") {
      throw Error("Calling update on no session mate?");
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

const UserObjectContextLayout = () => {
  return (
    <UserInfoStatusProvider>
      <Outlet />
    </UserInfoStatusProvider>
  );
};

const useUserObject = () => {
  const context = useContext(UserObjectContext);
  if (context === "NoContext") {
    throw new Error("useUserInfo must be used within a UserInfoProvider");
  }
  return context;
};

export { UserObjectContextLayout, useUserObject, type UserInfo };
