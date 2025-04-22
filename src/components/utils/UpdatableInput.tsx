import { useEffect, useState } from "react";
import { UserInfo, useUserObject } from "../../context/UserInfoContext/UserInfoContextLayout";
import { localization } from "../../services/localization";

export const UpdatableInput: React.FC<{
  label: string;
  toUpdateProperty: keyof UserInfo;
}> = ({ label, toUpdateProperty }) => {
  const userObject = useUserObject();

  useEffect(() => {
    console.log(userObject)
  }, [])

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
    console.log(inputValue)
    if (inputValue) {
      const error = await userObject.updateUserInfoProperty(
        toUpdateProperty,
        inputValue
      );
      console.log(error);
    }
  };

  return (
    <label>
      {label}
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      ></input>
      <button onClick={updateProperty}>{localization.update}</button>
    </label>
  );
};
