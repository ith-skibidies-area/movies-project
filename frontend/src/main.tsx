import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { Bounce, ToastContainer } from "react-toastify";
import NavBar from "./components/NavBar.tsx";
import Page404 from "./components/Page404.tsx";
import Profile from "./components/user/Profile.tsx";
import Register from "./components/user/Register.tsx";
import Login from "./components/user/Login.tsx";
import CreateGenre from "./components/genre/CreateGenre.tsx";
import CreateMovie from "./components/movie/CreateMovie.tsx";
import ShowMovies from "./components/movie/ShowMovies.tsx";
import InitialPage from "./components/InitialPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      <div className="flex flex-col h-screen">
        <div>
          <NavBar />
        </div>
        <div className="grow p-8">
          <Routes>
            <Route path="/" element={<ShowMovies />} />
            <Route path="/genre/:id" element={<CreateGenre />} />
            <Route path="/movie/:id" element={<CreateMovie />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/wip" element={<InitialPage />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  </StrictMode>
);
