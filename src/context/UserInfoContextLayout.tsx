import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Outlet } from "react-router";
import { useSession } from "./AuthContext";
import { getUserInfo } from "../db/user";

type UserInfo = {
  id: string;
  firstName: string;
  lastName: string;
};

type UserInfoStatus = UserInfo | "NoInfo" | "NoSession" | "NoContext"

const UserInfoContext = createContext<UserInfoStatus>("NoContext");

const UserInfoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const session = useSession();
  const [userInfo, setUserInfo] = useState<UserInfoStatus>("NoSession");

  useEffect(() => {
    if (session) {
      getUserInfo(session.user.id).then((response) => {
        setUserInfo(response ? response: "NoInfo")
      });
    } else {
      setUserInfo("NoSession");
    }
  }, [session]);

  return (
    <UserInfoContext.Provider value={userInfo}>
      {children}
    </UserInfoContext.Provider>
  );
};

const UserInfoContextLayout = () => {
  return (
    <UserInfoProvider>
      <Outlet/>
    </UserInfoProvider>
  )
}

const useUserInfo = () => {
  const context = useContext(UserInfoContext);
    if (context === "NoContext") {
      throw new Error("useUserInfo must be used within a UserInfoProvider");
    }
    return context;
}

export { UserInfoContextLayout, useUserInfo, type UserInfo };
