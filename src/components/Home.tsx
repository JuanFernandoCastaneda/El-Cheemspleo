import SearchBar from "./SearchBar";
import { localization } from "../services/localization";

export default function Home() {
  return (
    <>
      <h2>{localization.catchPhrase}</h2>
      <SearchBar></SearchBar>
    </>
  );
}
