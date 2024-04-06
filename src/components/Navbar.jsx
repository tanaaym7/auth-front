import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/index";
import { Link } from "react-router-dom";
import API from "../api";

export default function Navbar() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const res = await API.post("/logout");
      if (res.status === 200) {
        dispatch(authActions.logout());
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 py-5 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="flex justify-between items-center px-32">
        <Link to="/" className="text-xl text-violet-400 font-bold">
          Uploader
        </Link>
        <div className="hidden  nav-links lg:flex gap-16 text-lg">
          {!isLoggedIn && (
            <>
              <Link to="/register" className="hover:text-violet-400">
                Register
              </Link>
              <Link to="/login" className="hover:text-violet-400">
                Login
              </Link>
            </>
          )}
          {isLoggedIn && (
            <button onClick={handleLogout} className="hover:text-violet-400">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
