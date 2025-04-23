import { Outlet } from 'react-router';
import {Header} from '../components/Header/Header';

const Layout = () => {
  return (
    <>
      <Header className="md:w-[735px] lg:w-[955px]"/>
      <main className="md:w-[735px] lg:w-[955px]">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
