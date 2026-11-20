import React, { useRef } from "react";

const Theme = () => {
  const detailsRef = useRef(null);
  const closeDropdown = () => {
    if (detailsRef.current) {
      detailsRef.current.removeAttribute("open");
    }
  };
  return (
    <ul className="menu menu-horizontal">
      <li>
        <details ref={detailsRef}>
          <summary className="bg-primary text-primary-content  ">Theme</summary>
          <ul className="bg-base-100 rounded-t-none p-2 tabIndex={-1} dropdown-content bg-base-300 rounded-box z-1 w-52 p-2 shadow-2xl">
            <li className="">
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start "
                aria-label="Default"
                value="light"
                onClick={closeDropdown}
              />
            </li>
            <li className="">
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start "
                aria-label="Dark"
                value="dark"
                onClick={closeDropdown}
              />
            </li>

            <li className="">
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start "
                aria-label="Cupcake"
                value="cupcake"
                onClick={closeDropdown}
              />
            </li>

            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Cyberpunk"
                value="cyberpunk"
                onClick={closeDropdown}
              />
            </li>
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Valentine"
                data-set-theme
                value="valentine"
                onClick={closeDropdown}
              />
            </li>
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Aqua"
                value="aqua"
                onClick={closeDropdown}
              />
            </li>
          </ul>
        </details>
      </li>
    </ul>
  );
};

export default Theme;
