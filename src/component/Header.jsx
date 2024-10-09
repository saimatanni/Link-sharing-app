// Header.jsx

import { FaRegUserCircle } from "react-icons/fa";
import { FiLink, FiEye } from "react-icons/fi"; // Import icons
import logo from "../assets/devs_logo.png";
import { useDetails } from "../context/detailsProvider";

function Header() {

const {activeTab , setActiveTab}=useDetails()
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-sm md:px-8">
      {/* Logo Section */}
      <div className="flex items-center space-x-2">
        <div className="">
          <img alt="logo" src={logo} className="h-4 w-4 md:h-6 md:w-6" />
        </div>
        <span className="font-bold text-sm md:text-lg text-gray-800 hidden md:inline">
          devlinks
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex space-x-4">
        <button
          onClick={() => setActiveTab("links")}
          className={`flex items-center space-x-1 md:space-x-2 px-2 md:px-3 py-1 md:py-2 rounded-md font-medium ${
            activeTab === "links"
              ? "bg-purple-100 text-purple-600"
              : "text-[#818181] hover:text-gray-800"
          }`}
        >
          <FiLink className="text-base md:text-lg" /> {/* Links Icon */}
          <span className="hidden md:inline text-sm md:text-base">Links</span>
        </button>
        <button
          onClick={() => setActiveTab("profile")}
          className={`flex items-center space-x-1 md:space-x-2 px-2 md:px-3 py-1 md:py-2 rounded-md font-medium ${
            activeTab === "profile"
              ? "bg-purple-100 text-purple-600"
              : "text-[#818181] hover:text-gray-800"
          }`}
        >
          <FaRegUserCircle className="text-base md:text-lg" />{" "}
          {/* Profile Icon */}
          <span className="hidden md:inline text-sm md:text-base">
            Profile Details
          </span>
        </button>
      </nav>

      {/* Preview Button */}
      <button className="flex items-center px-3 md:px-4 py-1 md:py-2 border border-purple-600 text-purple-600 rounded-md hover:bg-purple-50 transition">
        <FiEye className="text-base block md:hidden" />
        <span className="hidden md:inline text-sm md:text-base">Preview</span>
      </button>
    </header>
  );
}

export default Header;
