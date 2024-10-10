// PreviewLinks.js

import { FaGithub, FaYoutube, FaLinkedin, FaTwitter } from "react-icons/fa";
import PreviewHeader from "../component/PreviewHeader";
import { useDetails } from "../context/detailsProvider";

const platformIcon = {
  GitHub: <FaGithub />,
  YouTube: <FaYoutube />,
  LinkedIn: <FaLinkedin />,
  Twitter: <FaTwitter />,
};

const platformColor = {
  GitHub: "bg-black",
  YouTube: "bg-red-600",
  LinkedIn: "bg-blue-600",
  Twitter: "bg-blue-400",
};

const PreviewLinks = () => {
  const { profileDetails, links } = useDetails();

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-gray-100">
      {/* Background Section */}
      <PreviewHeader />

      {/* Profile Card */}
      <div className="absolute flex flex-col items-center w-full  max-w-xs p-12 bg-white shadow-2xl rounded-3xl top-44">
        {/* Profile Image */}
        <div className="w-24 h-24 mb-4 overflow-hidden border-4 border-indigo-600 rounded-full">
          <img
            src={
              profileDetails?.profileImage || "https://via.placeholder.com/150"
            }
            alt="Profile"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Profile Details */}
        <h2 className="text-2xl font-bold text-gray-800">
          {profileDetails?.firstName} {profileDetails?.lastName}
        </h2>
        <p className="mb-12 text-gray-500">{profileDetails?.email}</p>

        {/* Social Links */}
        <div className="flex flex-col w-full gap-4">
          {links?.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-between px-4 py-3 text-white transition rounded-lg hover:opacity-90 ${
                platformColor[link.platform] || "bg-gray-100"
              }`}
            >
              <span className="flex items-center gap-2">
                {platformIcon[link.platform] || ''}
                {link.platform}
              </span>
              <span className="text-white">→</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreviewLinks;
