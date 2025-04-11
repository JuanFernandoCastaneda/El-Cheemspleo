import { useState } from "react";
import { localization } from "../localization";
import {useNavigate } from "react-router";

type SearchBarProps = {
    defaultValue?: string
} 

export default function SearchBar({defaultValue}: SearchBarProps) {
  const [searchInput, setSearchInput] = useState(defaultValue || "");
  const navigate = useNavigate();

  return (
    <>
      <h3>{localization.searchInstruction}</h3>
      <input value={searchInput} onChange={e => setSearchInput(e.target.value)}></input>
      <button onClick={() => navigate("/search?query="+searchInput)}>Search</button>
    </>
  );
}
