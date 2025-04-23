import { NavLink } from "react-router";
import { localization } from "../../services/localization";

function Navbar() {
  return (
    <nav className="flex flex-row justify-around sm:w-100">
      <NavLink to="/">{localization.home}</NavLink>
    </nav>
  );
}

export {Navbar}
