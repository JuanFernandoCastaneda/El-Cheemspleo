import { useEffect, useState } from "react";
import { localization } from "../services/localization";
import { useLocation, useNavigate } from "react-router";

type SearchBarProps = {
  className?: string;
};

export default function SearchBar({ className }: SearchBarProps) {
  const location = useLocation();
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    // Pretty sure this can be optimized.
    setSearchInput(
      (location.pathname === "/search" && params && params.get("query")) || ""
    );
  }, [location]);

  const navigate = useNavigate();
  const searchButtonAction = () => {
    navigate("/search?query=" + searchInput);
  };

  return (
    <div className={`${className} flex flex-row justify-center align-center`} id="searchBar">
      <input
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={(event) => event.key == "Enter" && searchButtonAction()}
        placeholder={localization.searchInstruction}
        className="bg-white border border-gray-400 rounded-xs grow p-2"
      ></input>
      <button onClick={searchButtonAction} className="roudned-xs bg-orange-500 aspect-1/1">
        <img src="/search.svg" className="p-2" />
      </button>
    </div>
  );
}
