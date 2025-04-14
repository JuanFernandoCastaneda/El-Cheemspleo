import { useContext } from "react";
import { SessionContext } from "../App";
import { Link } from "react-router";
import { localization } from "../localization";
import { signOut } from "../auth";

function ProfileInfo() {
  const sessionContext = useContext(SessionContext);

  return (
    <>
      {sessionContext ? (
        <button onClick={signOut}>{localization.signOut}</button>
      ) : (
        <Link to="/login">{localization.logIn}</Link>
      )}
    </>
  );
}

export default ProfileInfo;
