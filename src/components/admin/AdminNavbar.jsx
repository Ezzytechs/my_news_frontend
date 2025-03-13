import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faUser,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";

import "../../index.css";
const Navbar = (props) => {
  const navLinks = [
    { name: "Me", url: "profile", icon: faUser },
    { name: "Logout", url: "logout", icon: faSignOut, color: "text-red-500" },
  ].map((link) => {
    return (
      <li key={link.name}>
        <Link to={link.url} className="hover:text-gray-400">
          <FontAwesomeIcon icon={link.icon} className={link.color} size="lg" />
        </Link>
      </li>
    );
  });

  return (
    <>
      <nav className="flex justify-between items-center pl-6 pr-2 py-4 bg-gray-900 text-white shadow-md fixed left-0 top-0 w-full z-40">
        <div className="flex gap-10 -ml-3">
          <button
            className="block md:hidden w-[10px]"
            onClick={props.toggleMenu}
          >
            {!props.menuStatus ? (
              <FontAwesomeIcon icon={faBars} size="2x" />
            ) : (
              <FontAwesomeIcon
                icon={faTimes}
                className="hover:text-red-500"
                size="2x"
              />
            )}
          </button>
          <h1 className="text-l md:text-2xl font-bold">Admin Panel</h1>
        </div>
        <ul className="flex space-x-6">{navLinks}</ul>
      </nav>
    </>
  );
};

export default Navbar;
