import { Routes, Route } from "react-router";
import "./App.css";
import Home from "./components/Home";
import { BrowserRouter } from "react-router";
import Login from "./components/Login";
import SearchResult from "./components/SearchResult";
import Layout from "./components/layouts/layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<Login />} />
          <Route path="search" element={<SearchResult />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
