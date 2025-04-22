import { useState } from "react";
import { useUserObject } from "../context/UserInfoContextLayout";
import { localization } from "../services/localization";


// In theory, this component wont be rendered if there is no session.
const Profile: React.FC = () => {
  const userObject = useUserObject();
  if (userObject === "NoSession") {
    return;
  }
  const [firstName, setFirstName] = useState(
    userObject.userInfo ? userObject.userInfo.firstName : ""
  );
  const [lastName, setLastName] = useState(
    userObject.userInfo ? userObject.userInfo.lastName : ""
  );

  return (
    <>
      <h2 className="text-3xl">{localization.profile}</h2>
      <section id="fields" className="flex flex-col">
        <label>
          {localization.profileFirstName}
          <input value={firstName}></input>
          <button>a</button>
        </label>
        <label>
          {localization.profileLastName}
          <input value={lastName}></input>
        </label>
      </section>
    </>
  );
};

export { Profile };
