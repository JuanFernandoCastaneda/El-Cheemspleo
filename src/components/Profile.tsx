import { localization } from "./services/localization";

const Profile: React.FC = () => {
  return (
    <>
      <h2>{localization.profile}</h2>
      <label>
        {localization.profileFirstName}
        <input></input>
      </label>
    </>
  );
};

export {Profile }