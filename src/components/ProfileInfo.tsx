import { Link } from "react-router";
import { localization } from "../localization";
import { signOut } from "../context/AuthContext";
import { useUserInfo } from "../context/UserInfoContextLayout";

function ProfileInfo() {
  const userInfo = useUserInfo();

  return (
    <>
      {userInfo == "NoSession" ? (
        <Link to="/login">{localization.logIn}</Link>
      ) : (
        <>
          {userInfo == "NoInfo" ? (
            <p>LLENA LA INFO MEN</p>
          ) : (
            <p>{userInfo.firstName}</p>
          )}
          <button onClick={signOut}>{localization.signOut}</button>
        </>
      )}
    </>
  );
}

export default ProfileInfo;
