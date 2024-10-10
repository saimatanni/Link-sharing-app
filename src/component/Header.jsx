// Header.jsx

import { FaRegUserCircle } from "react-icons/fa";
import { FiLink, FiEye } from "react-icons/fi";
import logo from "../assets/devs_logo.png";
import { useDetails } from "../context/detailsProvider";
import { Link } from "react-router-dom";

function Header() {
  const { activeTab, setActiveTab } = useDetails();

  return (
    <header className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between p-4 mx-4 mt-4 bg-white border border-gray-200 rounded-lg shadow-sm md:px-8">
      {/* Logo Section */}
      <div className="flex items-center space-x-2">
        <img alt="logo" src={logo} className="w-6 h-6 md:h-8 md:w-8" />
        <span className="hidden text-lg font-bold text-gray-800 md:inline">
          devlinks
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex space-x-4">
        <button
          onClick={() => setActiveTab("links")}
          className={`flex items-center space-x-1 md:space-x-2 px-2 md:px-3 py-1 md:py-2 rounded-md font-medium ${
            activeTab === "links"
              ? "bg-[#efecff] text-[#633bfe]"
              : "text-[#818181] hover:text-gray-800"
          }`}
        >
          <FiLink className="text-base md:text-lg" />
          <span className="hidden text-sm md:inline md:text-base">Links</span>
        </button>
        <button
          onClick={() => setActiveTab("profile")}
          className={`flex items-center space-x-1 md:space-x-2 px-2 md:px-3 py-1 md:py-2 rounded-md font-medium ${
            activeTab === "profile"
              ? "bg-[#efecff] text-[#633bfe]"
              : "text-[#818181] hover:text-gray-800"
          }`}
        >
          <FaRegUserCircle className="text-base md:text-lg" />
          <span className="hidden text-sm md:inline md:text-base">
            Profile Details
          </span>
        </button>
      </nav>

      {/* Preview Button */}
      <Link to="/preview">
        <button className="flex items-center px-3 py-1 text-[#633bfe] transition border border-[#633bfe] rounded-md md:px-4 md:py-2 hover:bg-[#efecff]">
          <FiEye className="block text-base md:hidden" />
          <span className="hidden text-sm md:inline md:text-base">Preview</span>
        </button>
      </Link>
    </header>
  );
}

export default Header;
