import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { SessionProvider } from "./context/AuthContext.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import {
  LastUrlProvider,
} from "./context/LastUrlContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SessionProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="*"
            element={
              <LastUrlProvider>
                <App />
              </LastUrlProvider>
            }
          />
        </Routes>
      </BrowserRouter>
    </SessionProvider>
  </StrictMode>
);
