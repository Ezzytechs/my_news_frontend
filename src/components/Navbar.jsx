import { Link } from "react-router-dom";
import "../index.css";

const Navbar = () => {
  
  const navLinks = [{ name: "News", url: "/" }, {name:"Admin", url:"/admin"}].map((link) => {
    return (
      <li key={link.name}>
        <Link to={link.url} className=" text-l hover:text-gray-400">
          {link.name}
        </Link>
      </li>
    );
  });
  return (
    <>
      {/* Navbar for Large Screens */}
      <nav className="flex justify-between items-center px-6 py-4 bg-gray-900 text-white shadow-md">
        <h1 className="text-2xl font-bold">My News</h1>
        <ul className="flex space-x-6">{navLinks}</ul>
      </nav>
    </>
  );
};

export default Navbar;
