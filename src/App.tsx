import { Routes, Route, Navigate } from "react-router";
import "./App.css";
import Home from "./components/Home";
import { BrowserRouter } from "react-router";
import SearchResult from "./components/SearchResult";
import Layout from "./components/layouts/layout";
import { createContext, useState } from "react";
import { authComponent, useSession } from "./auth";
import { Session } from "@supabase/supabase-js";
import LocationTracker from "./components/LocationTracker";

export const SessionContext = createContext<Session | null>(null);

function App() {
  const session = useSession();
  const [lastUrl, setLastUrl] = useState("/");

  return (
    <SessionContext value={session}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LocationTracker setLastUrl={setLastUrl} />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route
                path="login"
                element={session ? <Navigate to={lastUrl} /> : authComponent}
              />
              <Route path="search" element={<SearchResult />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </SessionContext>
  );
}

export default App;
