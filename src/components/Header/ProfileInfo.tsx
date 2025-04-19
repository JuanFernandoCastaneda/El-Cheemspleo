import { Link } from "react-router";
import { localization } from "../../services/localization";
import { signOut } from "../../context/AuthContext";
import { useUserInfo } from "../../context/UserInfoContextLayout";

const ProfileInfo: React.FC<{className?: string}> = ({className}) => {
  const userInfo = useUserInfo();

  return (
    <aside aria-label={localization.profileInfo} className={`flex flex-col ${className}`}>
      {userInfo == "NoSession" ? (
        <Link to="/login">{localization.logIn}</Link>
      ) : (
        <>
          {userInfo == "NoInfo" ? (
            <p>LLENA LA INFO MEN</p>
          ) : (
            <p>{userInfo.firstName}</p>
          )}
          <Link to="/profile">{localization.profile}</Link>
          <button onClick={signOut}>{localization.signOut}</button>
        </>
      )}
    </aside>
  );
}

export default ProfileInfo;
