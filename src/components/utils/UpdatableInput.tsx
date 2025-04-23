import { useState } from "react";
import {
  UserInfo,
  useUserObject,
} from "../../context/UserInfoContext/UserInfoContextLayout";
import { localization } from "../../services/localization";

export const UpdatableInput: React.FC<{
  label: string;
  toUpdateProperty: keyof UserInfo;
}> = ({ label, toUpdateProperty }) => {
  const userObject = useUserObject();

  const initialValue =
    userObject === "NoSession" || !userObject.userInfo
      ? undefined
      : userObject.userInfo[toUpdateProperty];

  const [inputValue, setInputValue] = useState<
    UserInfo[keyof UserInfo] | undefined
  >(initialValue);

  const updateProperty = async () => {
    if (userObject === "NoSession") {
      alert("Calling UpdatableInput without Session");
      return;
    }
    console.log(inputValue);
    if (inputValue) {
      const error = await userObject.updateUserInfoProperty(
        toUpdateProperty,
        inputValue
      );
      error && alert(error);
    }
  };

  return (
    <label className="mb-2">
      <h3 className="">{label}</h3>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="mr-2 border"
      ></input>
      {inputValue !== initialValue && (
        <button onClick={updateProperty} className="p-1 shadow-md rounded-md text-white bg-blue-600 hover:bg-blue-700">{localization.update}</button>
      )}
    </label>
  );
};
