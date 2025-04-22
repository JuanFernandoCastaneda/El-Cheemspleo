import { Link } from "react-router";
import { localization } from "../../services/localization";
import { signOut } from "../../context/AuthContext";
import { useUserObject } from "../../context/UserInfoContext/UserInfoContextLayout";

const ProfileInfo: React.FC<{className?: string}> = ({className}) => {
  const userObject = useUserObject();

  return (
    <aside aria-label={localization.profileInfo} className={`flex flex-col ${className}`}>
      {userObject == "NoSession" ? (
        <Link to="/login">{localization.logIn}</Link>
      ) : (
        <>
          {userObject.userInfo ? (
            <p>{userObject.userInfo.firstName}</p>
          ) : (
            <p>LLENA LA INFO MEN</p>
          )}
          <Link to="/profile">{localization.profile}</Link>
          <button onClick={signOut}>{localization.signOut}</button>
        </>
      )}
    </aside>
  );
}

export default ProfileInfo;
