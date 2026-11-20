import React from "react";
import Theme from "./theme";
import { Outlet } from "react-router";

const Header = () => {
  return (
    <div className="h-screen">
      <div className="flex gap-5 w-full h-svh-[10%] bg-base-100">
        <Theme />
      </div>

      <Outlet />
    </div>
  );
};

export default Header;
