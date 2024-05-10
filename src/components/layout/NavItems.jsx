import React from "react";
import { Link } from "react-router-dom";

const NavItems = () => {
  return (
    <div className="flex flex-row gap-4 text-lg justify-items-center">
      <Link
        to="/signup"
        className="focus:font-bold
       hover:translate-y-1 transition-all"
      >
        Sign Up
      </Link>
      <Link
        to="/signin"
        className="focus:font-bold
       hover:translate-y-1 transition-all"
      >
        Sign In
      </Link>
    </div>
  );
};

export default NavItems;
