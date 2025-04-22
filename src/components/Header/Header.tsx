import { Navbar } from "./Navbar";
import { Top } from "./Top";

export const Header: React.FC<{className?: string}> = ({className}) => {
  return (
    <header className={className}>
      <Top/>
      {/**<Navbar/> */}
    </header>
  );
}
