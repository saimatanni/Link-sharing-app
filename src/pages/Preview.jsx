// MobilePreview.js

import { BsGithub, BsYoutube, BsLinkedin } from "react-icons/bs";
import mobileframe from "../assets/mobile_frame.png";
import { useDetails } from "../context/detailsProvider";

const platformIcons = {
  GitHub: BsGithub,
  YouTube: BsYoutube,
  LinkedIn: BsLinkedin,
};

const MobilePreview = () => {
  const { profileDetails, links } = useDetails();

  // Ensure we have 5 slots, filling with placeholders if links are missing
  // const displayLinks = [...links, ...Array(5 - links.length).fill({})].slice(
  //   0,
  //   5
  // );
  const displayLinks = [
    ...links,
    ...Array(Math.max(5 - links.length, 0)).fill({}),
  ];
  // Check if profile data is complete
  const isProfileLoaded =
    profileDetails.firstName && profileDetails.lastName && profileDetails.email;

  return (
    <div className="flex items-center justify-center p-8">
      {/* Outer Container with Background Image */}
      <div
        className="flex items-center justify-center bg-center bg-no-repeat bg-contain "
        style={{ backgroundImage: `url(${mobileframe})` }}
      >
        <div className="w-[280px] h-[560px] sm:w-[308px] sm:h-[632px] lg:w-[360px] lg:h-[700px] flex items-center justify-center">
          {/* Inner Scrollable Content Container */}
          <div className="w-[240px] h-[480px] sm:w-[270px] sm:h-[540px] lg:w-[310px] lg:max-h-[600px] bg-white rounded-[20px] md:rounded-[30px] overflow-y-auto p-4 sm:p-6">
            {/* Profile Section */}
            <div className="flex flex-col items-center justify-center">
              {profileDetails.profileImage ? (
                <img
                  src={profileDetails.profileImage}
                  alt="Profile"
                  className="w-20 h-20 mb-4 bg-gray-200 rounded-full sm:w-24 sm:h-24"
                />
              ) : (
                <div className="w-20 h-20 mb-4 bg-gray-200 rounded-full sm:w-24 sm:h-24 animate-pulse"></div>
              )}

              {isProfileLoaded ? (
                <>
                  {/* Profile Name */}
                  <h2 className="mb-1 text-lg font-bold sm:text-xl">
                    {profileDetails.firstName} {profileDetails.lastName}
                  </h2>
                  {/* Profile Email */}
                  <p className="mb-6 text-sm text-gray-500 sm:text-base">
                    {profileDetails.email}
                  </p>
                </>
              ) : (
                <>
                  {/* Name Skeleton */}
                  <div className="w-24 h-5 mb-2 bg-gray-200 rounded-md sm:w-32 sm:h-6 animate-pulse"></div>
                  {/* Email Skeleton */}
                  <div className="h-3 mb-6 bg-gray-200 rounded-md w-36 sm:w-48 sm:h-4 animate-pulse"></div>
                </>
              )}
            </div>
            {/* Links Section */}
            <div className="w-full space-y-3 sm:space-y-4">
              {displayLinks.map((link, index) => {
                // Check if platform and url exist
                const hasContent = link.platform && link.url;
                const Icon = platformIcons[link.platform] || null;

                return hasContent ? (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-between w-full px-3 sm:px-4 py-2 sm:py-3 text-white rounded-lg ${
                      link.color === "black"
                        ? "bg-black"
                        : link.color === "red"
                        ? "bg-red-500"
                        : link.color === "blue"
                        ? "bg-blue-500"
                        : "bg-gray-200 text-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {Icon && <Icon className="text-lg sm:text-xl" />}
                      <span className="text-sm sm:text-base">
                        {link.platform}
                      </span>
                    </div>
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                ) : (
                  <div
                    key={index}
                    className="flex items-center justify-between w-full px-3 py-2 bg-gray-200 rounded-lg sm:px-4 sm:py-3 animate-pulse"
                  >
                    <div className="flex items-center gap-2 text-gray-300">
                      <div className="w-5 h-5 bg-gray-300 rounded-full sm:w-6 sm:h-6"></div>
                      <div className="w-16 h-3 bg-gray-300 rounded-md sm:w-20 sm:h-4"></div>
                    </div>
                    <div className="w-3 h-3 bg-gray-300 rounded-full sm:w-4 sm:h-4"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobilePreview;
