import { Link, useLocation } from "react-router";
import ProfileInfo from "./ProfileInfo";
import SearchBar from "../SearchBar";

export function Top() {
  const location = useLocation();

  return (
    <div id="top" className="flex flex-row h-20 justify-around">
      <h1 className="text-3xl flex flex-col justify-center relative mr-2">
        <Link to="/" className="">
          El Cheemspleo
        </Link>
      </h1>
      <div className="grow mr-2 ml-2 flex flex-row justify-center">
        {location.pathname !== "/" && <SearchBar className="flex flex-row align-center grow pt-5 pb-5"/>}
      </div>

      <ProfileInfo className="ml-2" />
    </div>
  );
}
