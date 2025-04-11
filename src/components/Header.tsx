import { NavLink } from "react-router";
import { localization } from "../localization";

export default function Header() {
  return <header>
    <h1>El Cheemspleo</h1>
    <nav>
      <NavLink to="/">{localization.home}</NavLink>
    </nav>
  </header>
}
