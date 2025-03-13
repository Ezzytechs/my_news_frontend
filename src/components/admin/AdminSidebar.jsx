//import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faArrowCircleDown,
  faDashboard,
  faHome,
  faMoneyBill,
  faSatelliteDish,
} from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
const Sidebar = (props) => {
  const [toggleDropDown, setToggleDropDown] = useState(false);
  const [myIndex, setMyIndex] = useState();

  const handleToggle = (index) => {
    if (index !== myIndex) {
      setToggleDropDown(true);
      setMyIndex(index);
      return;
    }
    if (!index) return;

    setMyIndex(index);
    setToggleDropDown(!toggleDropDown);
  };

  const links = [
    {
      name: "Statistics",
      url: "/admin",
      icon: faSatelliteDish,
    },
    {
      name: "Add News",
      url: "/admin/add-news",
      icon: faAdd,
    },
    {
      name: "Home",
      url: "/",
      icon: faHome,
    },
  ].map((link, index) => (
    <li
      onClick={() => handleToggle(index)}
      key={link.name}
      className=" text-xl bg-gray-700 p-1 w-full"
    >
      <Link to={link.url}>
        <span
        onClick={link.subLinks?null:props.toggleMenu}
          className={
            link.subLinks
              ? "flex gap-6 mb-1"
              : "hover:text-yellow-900 flex gap-6"
          }
        >
          <FontAwesomeIcon icon={link.icon} className="mt-2" />
          {link.name}
          {link.subLinks && (
            <FontAwesomeIcon
              icon={faArrowCircleDown}
              size="sm"
              className="-ml-4 mt-2"
            />
          )}
        </span>
      </Link>
    </li>
  ));

  return (
    <>
      <div className="hidden sm:hidden md:block w-64 h-full bg-gray-800 text-white shadow-lg flex flex-col py-6 px-3 z-10">
        <div className="flex gap-4 pb-3 text-2xl">
          <div className="rounded-full bg-white h-10 w-10"></div>
          <span className="pt-1">Admin</span>
        </div>
        <ul className="flex flex-col space-y-4 w-full">{links}</ul>
      </div>

      {/* Sidebar (Mobile) */}
      {props.menuStatus && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.3 }}
          className="md:hidden w-64 h-full pt-3 bg-gray-800 text-white shadow-lg z-10 sm:z-100 flex flex-col"
        >
           <div className="flex gap-4 pb-3 text-2xl">
          <div className="rounded-full bg-white h-10 w-10"></div>
          <span className="pt-1">Admin</span>
        </div>
          <ul
            className="flex flex-col space-y-4 w-full over-flow-auto"
          >
            {links}
          </ul>
        </motion.div>
      )}
    </>
  );
};

export default Sidebar;
