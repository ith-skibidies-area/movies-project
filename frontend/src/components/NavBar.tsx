import { NavLink } from "react-router";
import popcorn from "../assets/popcorn.svg";
import { userLogged, userLoggout } from "../services/auth";

const NavBar = () => {
  return (
    <div className="flex p-4 gap-4 bg-sky-300 text-gray-950">
      <div>
        <div className="flex gap-2 cursor-pointer font-bold">
          <img src={popcorn} alt="" style={{ height: "1.5rem" }} />
          <div>Movies Mafia</div>
        </div>
      </div>
      <div>|</div>
      <div>
        <NavLink to={"/"}>Movies</NavLink>
      </div>
      {userLogged() ? (
        <>
          <div>|</div>
          <div>
            <NavLink to={"/genre/new"}>Add Genre</NavLink>
          </div>
          <div>|</div>
          <div>
            <NavLink to={"/movie/new"}>Add Movie</NavLink>
          </div>
          <div>|</div>
          <div>
            <NavLink to={"/profile"}>User Profile</NavLink>
          </div>
        </>
      ) : (
        <>
          <div>|</div>
          <div>
            <NavLink to={"/register"}>Register</NavLink>
          </div>
          <div>|</div>
          <div>
            <NavLink to={"/login"}>Login</NavLink>
          </div>
        </>
      )}
      <div>|</div>
      <div>
        <NavLink to={"/error"}>Error Page</NavLink>
      </div>
      {!userLogged() ? null : (
        <>
          <div>|</div>
          <div>
            <button
              className="cursor-pointer text-sm px-2 py-0.5 text-white bg-red-600 hover:bg-red-700 rounded-lg border-white border font-medium"
              onClick={() => {
                userLoggout();
                window.location.replace("/");
              }}
            >
              Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NavBar;
