import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import NavBar from "./components/NavBar.tsx";
import Page404 from "./components/Page404.tsx";
import Profile from "./components/user/Profile.tsx";
import Register from "./components/user/Register.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <div className="flex flex-col h-screen">
        <div>
          <NavBar />
        </div>
        <div className="grow p-8">
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/genre/new" element={<App />} />
            <Route path="/movie/new" element={<App />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<App />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  </StrictMode>
);
