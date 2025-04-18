import { Routes, Route, Navigate } from "react-router";
import "./App.css";
import Home from "./components/Home";
import SearchResult from "./components/SearchResult";
import Layout from "./components/layouts/layout";
import Login from "./components/Header/Login";
import Test from "./components/Test";
import { useSession } from "./context/AuthContext";
import { useLastUrl } from "./context/LastUrlContext";
import { UserInfoContextLayout } from "./context/UserInfoContextLayout";
import { Profile } from "./components/Profile";

function App() {
  const session = useSession();
  const lastUrl = useLastUrl();

  return (
    <Routes>
      <Route element={<UserInfoContextLayout />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="login"
            element={session ? <Navigate to={lastUrl} /> : <Login />}
          />
          <Route path="search" element={<SearchResult />} />
          <Route path="profile" element={<Profile />} />
          <Route path="test" element={<Test />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
