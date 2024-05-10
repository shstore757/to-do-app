import React from "react";
import { Link } from "react-router-dom";
import NavItems from "./NavItems";
import BtnDark from "./BtnDark";

const NavBar = () => {
  return (
    <div className="">
      <nav
        className="grid grid-cols-2 justify-items-center
      bg-primary p-4 text-forth h-[5vh]"
      >
        <div className="flex flex-row gap-6">
          <BtnDark />
          <Link
            to="/"
            className="focus:font-bold hover:translate-y-1 transition-all"
          >
            <h3 className=" text-2xl">TO-DO</h3>
          </Link>
        </div>

        <NavItems />
      </nav>
    </div>
  );
};

export default NavBar;
