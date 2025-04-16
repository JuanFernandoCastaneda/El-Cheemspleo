import { NavLink } from "react-router";
import { localization } from "../services/localization";
import ProfileInfo from "./ProfileInfo";

export default function Header() {
  return <header>
    <h1>El Cheemspleo</h1>
    <nav>
      <NavLink to="/">{localization.home}</NavLink>
    </nav>
    <ProfileInfo/>
  </header>
}
