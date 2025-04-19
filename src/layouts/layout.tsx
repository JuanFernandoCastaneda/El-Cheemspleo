import { Outlet } from 'react-router';
import Header from '../components/Header/Header';

const Layout = () => {
  return (
    <>
      <Header/>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
