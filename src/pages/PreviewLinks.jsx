import { FaGithub, FaYoutube, FaLinkedin, FaTwitter } from "react-icons/fa";
import PreviewHeader from "../component/PreviewHeader";
import { useDetails } from "../context/detailsProvider";
import { useMemo } from "react";

// Memoize platform icons and colors
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

  // Memoize link components to avoid re-rendering
  const renderedLinks = useMemo(() => {
    return links?.map((link) => (
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
          {platformIcon[link.platform] || ""}
          {link.platform}
        </span>
        <span className="text-white">→</span>
      </a>
    ));
  }, [links]);

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-gray-100">
      {/* Background Section */}
      <PreviewHeader />

      {/* Profile Card */}
      <div className="absolute flex flex-col items-center w-full max-w-xs p-12 bg-white shadow-2xl rounded-3xl top-44">
        
        {/* Profile Image */}
        {/* {profileDetails?.profileImage && ( */}
          <div className="w-24 h-24 mb-4 overflow-hidden border-4 border-indigo-600 rounded-full">
            <img
              src={profileDetails.profileImage || "https://via.placeholder.com/150"}
              alt="Profile"
              className="object-cover w-full h-full"
            />
          </div>
        {/* )} */}

        {/* Profile Details */}
        <h2 className="text-2xl font-bold text-gray-800">
          {profileDetails?.firstName} {profileDetails?.lastName}
        </h2>
        {profileDetails?.email && <p className="mb-4 text-gray-500">{profileDetails.email}</p>}

        {/* Social Links with Scrollable Container */}
        <div className="flex flex-col w-full max-h-64 gap-4 overflow-hidden group">
          <div className="flex flex-col w-full h-full gap-4 overflow-y-auto scrollbar-hide group-hover:scrollbar-show">
            {renderedLinks}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewLinks;
