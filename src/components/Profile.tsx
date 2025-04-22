import { useUserObject } from "../context/UserInfoContextLayout";
import { localization } from "../services/localization";
import { UpdatableInput } from "./utils/UpdatableInput";

// In theory, this component wont be rendered if there is no session.
const Profile: React.FC = () => {
  const userObject = useUserObject();

  return userObject === "NoSession" ? (
    <p>{localization.profileSessionError}</p>
  ) : (
    <>
      <h2 className="text-3xl">{localization.profile}</h2>
      <section id="fields" className="flex flex-col">
        <UpdatableInput
          {...{
            label: localization.profileFirstName,
            toUpdateProperty: "firstName",
          }}
        />
        <UpdatableInput
          {...{
            label: localization.profileLastName,
            toUpdateProperty: "lastName",
          }}
        />
      </section>
    </>
  );
};

export { Profile };
